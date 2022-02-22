import database from '../../framework/database';
import session from '../../framework/session';
import https from 'https';
import uuid from 'node-uuid';

var path = "/account";
var routes = [
  {
    path: "/login",
    method: "post",
    action: async (req, res) => {
      
      var result = await (await database('account')).find({ account: req.query.account }).toArray();

      if(result.length<=0 || result[0].password != req.query.password){
        res.error("用户名或密码错误");
        return;
      }
      
      var current = new Date();
      await (await database('account')).update({account: req.query.account}, { $set: { login_date : current } });
      result[0].login_date = current;

      var authorization = uuid.v1();
      delete result[0].password;
      session.add(authorization, result[0]);
      res.success({
        account: result[0].account,
        authorization: authorization
      });
    }
  },
  {
    path: "/regist",
    method: "post",
    action: async (req, res) => {
      
      var result = await (await database('account')).find({ account: req.body.account }).toArray();

      if(result.length>0){
        res.error("该用户已被注册");
        return;
      }
      
      delete req.body.password_again;
      
      req.body.type = "ordinary",
      req.body.reg_date = new Date();

      await (await database('account')).insert(req.body);
      res.success();
    }
  },
  {
    path: "/target",
    method: "get",
    action: async(req, res) => {
      var result = await (await database('account')).find({ account: req.query.target }).toArray();
      if(result.length<=0){
        res.error("用户不存在！");
        return;
      }
      delete result[0].password;
      res.success(result[0]);
    }
  },
  {
    path: "/darkhouse",
    method: "get",
    action: async(req, res) => {
      var ctx = await database('darkhouse');
      ctx = ctx.find();
      var result = await Promise.all([
        ctx.count(), 
        ctx.sort({datetime: -1}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).toArray()]);
      res.success({
        count: result[0],
        items: result[1]
      });
    }
  },

];

export default {
  path, routes
};