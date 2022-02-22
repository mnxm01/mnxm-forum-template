import database from '../../framework/database';
import session from '../../framework/session';
import { ObjectId } from 'mongodb';
import path from "path";

var current_path = "/topics";
var routes = [
  {
    path: "/total",
    method: "get",
    action: async (req, res) => {

      var result = session.get("topic_total");
      if(!result){
        var game = await (await database('topics')).find({ module: "game" }).count();
        var anim = await (await database('topics')).find({ module: "anim" }).count();
        var cartoon = await (await database('topics')).find({ module: "cartoon" }).count();
        var novel = await (await database('topics')).find({ module: "novel" }).count();
        var other = await (await database('topics')).find({ module: "other" }).count();
        result = {
          game, anim, cartoon, novel, other
        };
        session.add("topic_total", result);
      }
      res.success(result);
    }
  },
  {
    path: "/detail",
    method: "get",
    action: async (req, res) => {
      var result = await (await database('topics')).findOne({_id: ObjectId(req.query._id)});
      var result1 = await (await database('rec-topics')).findOne({_id: ObjectId(req.query._id)});
      if(result1){
        result.recommend = true;
        result.img = result1.img;
      }
      res.success(result);
    }
  },
  {
    path: "/replys",
    method: "get",
    action: async (req, res) => {
      var ctx = await database('topic-replys');
      ctx = ctx.find({_topic_id: ObjectId(req.query._topic_id)});
      var result = await Promise.all([
        ctx.count(), 
        ctx.skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).toArray()]);
      res.success({
        count: result[0],
        items: result[1]
      });
    }
  },
  {
    path: "/page",
    method: "get",
    action: async (req, res) => {
      var ctx = await database('topics');
      if(req.query.module == "title_like"){
        if(!req.query.custom){
          res.success({
            count: 0,
            items: []
          });
          return;
        }
        ctx = ctx.find({title: new RegExp(req.query.custom)});
      }
      else if(req.query.module == "author"){
        if(!req.query.custom){
          res.success({
            count: 0,
            items: []
          });
          return;
        }
        ctx = ctx.find({author: req.query.custom});
      }
      else{
        ctx = ctx.find({top: null, module: req.query.module});
      }
      var result = await Promise.all([
        ctx.count(), 
        ctx.sort({"datetime":-1}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).toArray()
      ]);
      res.success({
        count: result[0],
        items: result[1]
      });
    }
  },
  {
    path: "/top",
    method: "get",
    action: (req, res) => {
      database('topics').then(ctx => {
        Promise.all([
          ctx.find({top: true, module: req.query.module}).count(),
          ctx.find({top: true, module: req.query.module}).sort({"top_date":-1}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).toArray()
        ])
          .then((result) => {
            res.success({
              count: result[0],
              items: result[1]
            });
          });
      });
    }
  },
  {
    path: "/recommend",
    method: "get",
    action: async (req, res) => {
      var game = await (await database('rec-topics')).find({ module: "game" }).sort({ rec_date: -1 }).toArray();
      var anim = await (await database('rec-topics')).find({ module: "anim" }).sort({ rec_date: -1 }).toArray();
      var cartoon = await (await database('rec-topics')).find({ module: "cartoon" }).sort({ rec_date: -1 }).toArray();
      var novel = await (await database('rec-topics')).find({ module: "novel" }).sort({ rec_date: -1 }).toArray();
      var other = await (await database('rec-topics')).find({ module: "other" }).sort({ rec_date: -1 }).toArray();
      var latest = await (await database('rec-topics')).find().sort({ rec_date: -1 }).limit(9).toArray();
      res.success({
        game, anim, cartoon, novel, other, latest
      });
    }
  },
];

export default {
  path: current_path, routes
};