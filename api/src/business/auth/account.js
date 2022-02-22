import database from '../../framework/database';
import session from '../../framework/session';
import { ObjectId } from 'mongodb';

var path = "/account";
var routes = [
  {
    path: "/logout",
    method: "post",
    action: (req, res) => {
      session.remove(req.headers['authorization']);
      res.success("退出成功！");
    }
  },
  {
    path: "/current",
    method: "get",
    action: (req, res) => {
      res.success(session.get(req.headers['authorization']));
    }
  },
  {
    path: "/info",
    method: "get",
    action: (req, res) => {
      database('account').then(query => {
        Promise.all([
          query.find().count(),
          query.find().skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).toArray()
        ])
          .then((result) => {
            res.success({
              count: result[0],
              items: result[1].map(x => { return { _id: x._id, account: x.account, nick: x.nick }; })
            });
          });
      });
    }
  },
  {
    path: "/all",
    method: "get",
    action: (req, res) => {
      database('account').then(query => {
        query.find().toArray().then(result => {
          res.success(result.map(x => { return { _id: x._id, account: x.account, nick: x.nick }; }));
        })
      });
    }
  },
  {
    path: "/operate",
    method: "post",
    action: async(req, res) => {

      var auth = session.get(req.headers['authorization']);
      if(auth.type != "admin"){
        res.forbidden("无权操作");
        return;
      }

      await(await database('account')).update({ account: req.body.account }, { $set: { type: req.body.account_type } });
      if(req.body.account_type == "denied"){
        await(await database('darkhouse')).insert({
          account: req.body.account,
          action: req.body.action,
          action_time_remain: req.body.action_time_remain,
          datetime: new Date(),
          reason: req.body.reason
        });
      }
      res.success();
    }
  },
];

export default {
  path, routes
};