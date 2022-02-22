import database from '../../framework/database';
import session from '../../framework/session';
import { ObjectId } from 'mongodb';
import path from "path";

var current_path = "/images";
var routes = [
  {
    path: "/fetch",
    method: "get",
    action: async (req, res) => {
      res.sendFile(path.resolve("./images") + "/" + req.query.name);
    }
  },
];

export default {
  path: current_path, routes
};