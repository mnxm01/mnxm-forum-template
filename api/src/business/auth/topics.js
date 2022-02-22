import database from '../../framework/database';
import session from '../../framework/session';
import { ObjectId } from 'mongodb';
import { saveFile } from "../../utils/image"

var path = "/topics";
var routes = [
  {
    path: "/publish",
    method: "post",
    action: async (req, res) => {

      req.body.datetime = new Date();
      var detail = req.body.detail;
      delete req.body.detail;

      await (await database('topics')).insert(req.body);

      if (detail && detail[0]) {
        detail.forEach(item => {
          item._topic_id = req.body._id;
          item.datetime = req.body.datetime;
        });
      }
      await (await database('topic-replys')).insert(detail);
      res.success();
    }
  },
  {
    path: "/reply",
    method: "post",
    action: async (req, res) => {
      req.body.datetime = new Date();
      req.body._topic_id = ObjectId(req.body._topic_id);
      await (await database('topic-replys')).insert(req.body);
      var result = await (await database('topics')).findOne({ _id: req.body._topic_id });
      if (result && req.body.author != result.author) {
        await (await database('messages')).insert({
          _topic_id: req.body._topic_id,
          from_account: req.body.author,
          to_account: result.author,
          title: result.title,
          datetime: new Date(),
          content: req.body.content
        });
      }
      await (await database('topics')).update({ _id: req.body._topic_id }, { $set :{  reply_cnt: result.reply_cnt ? result.reply_cnt+1 : 1 }});
      res.success();
    }
  },
  {
    path: "/top",
    method: "post",
    action: async (req, res) => {

      var auth = session.get(req.headers['authorization']);
      if (auth.type != "admin") {
        res.forbidden("无权操作");
        return;
      }

      await (await database('topics')).update({ '_id': ObjectId(req.body._topic_id) }, { $set: { top: true, top_date: new Date() } });
      var result = await (await database('topics')).find({ module: req.body.module, top: true }).sort({ top_date: -1 }).toArray();
      result = result.slice(5).map(x => {
        return {
          _id: x._id
        }
      });
      if (result.length > 0) {
        result = await (await database('topics')).update({ $or: result }, { $set: { top: null, top_date: null } }, { multi: true });
      }
      res.success();
    }
  },
  {
    path: "/unread_messages",
    method: "get",
    action: async (req, res) => {
      var ctx = await database('messages');
      ctx = ctx.find({ to_account: req.query.account, read: null });
      var result = await Promise.all([
        ctx.count(),
        ctx.sort({ datetime: -1 }).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).toArray()]);
      res.success({
        count: result[0],
        items: result[1]
      });
    }
  },
  {
    path: "/save_read",
    method: "post",
    action: async (req, res) => {

      var target = await (await database('messages')).findOne({ _id: ObjectId(req.query._id) });
      var auth = session.get(req.headers['authorization']);
      if (target && auth.account != target.to_account) {
        res.forbidden("无权操作");
        return;
      }

      var ctx = await database('messages');
      ctx = await ctx.update({ '_id': ObjectId(req.query._id) }, { $set: { read: true, read_date: new Date() } });
      res.success();
    }
  },
  {
    path: "/read_messages",
    method: "get",
    action: async (req, res) => {
      var ctx = await database('messages');
      ctx = ctx.find({ to_account: req.query.account, read: true });
      var result = await Promise.all([
        ctx.count(),
        ctx.sort({ read_date: -1 }).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).toArray()]);
      res.success({
        count: result[0],
        items: result[1]
      });
    }
  },
  {
    path: "/recommend",
    method: "post",
    action: async (req, res) => {

      var auth = session.get(req.headers['authorization']);
      if (auth.type != "admin") {
        res.forbidden("无权操作");
        return;
      }

      var current_module = req.body.module;
      req.body.rec_date = new Date();
      req.body._id = ObjectId(req.body._id);
      var result = await (await database('rec-topics')).findOne({ _id: req.body._id });
      if (result) {
        res.error("已被推荐");
        return;
      }
      await (await database('rec-topics')).insert(req.body);
      result = await (await database('rec-topics')).find({ module: current_module }).sort({ rec_date: -1 }).toArray();
      result = result.slice(10).map(x => {
        return {
          _id: x._id
        };
      });
      if (result.length > 0) {
        await (await database('rec-topics')).remove({ $or: result });
      }
      res.success();
    }
  },
  {
    path: "/recommend_img",
    method: "post",
    action: async (req, res) => {

      var obj = await saveFile(req);
      await (await database('rec-topics')).update({ '_id': ObjectId(obj.fields._id[0]) }, { $set: { img: obj.fileName } });
      res.success(obj.fileName);
    },
  },
  {
    path: "/reply_img",
    method: "post",
    action: async (req, res) => {

      var obj = await saveFile(req);
      res.success(obj.fileName);
    },
  },
];

export default {
  path, routes
};