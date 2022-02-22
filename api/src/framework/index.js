import express from 'express';
import routes from '../business';
import bodyParser from 'body-parser';
import CryptoJS from 'crypto-js';
import config from '../config/config';
import database from './database';
import session from './session';
import https from 'https';

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "authorization,content-type,x-requested-with");
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use("/api", function (req, res, next) {
  res.error = function (msg = null) {
    this.send({ success: false, data: null, msg });
  };
  res.forbidden = function (msg = null) {
    this.status(403).send({ success: false, data: null, msg: msg });
  };
  res.success = function (result = null, msg = null) {
    this.send({ success: true, data: result, msg: msg });
  };
  next();
});

app.use("/api/auth", function (req, res, next) {

  if (req.method == "OPTIONS") {
    next();
    return;
  }
  if (!session.get(req.headers['authorization'])) {
    res.status(401).send({ success: false, data: null, msg: "用户未登录" });
    return;
  }

  req.userInfo = session.get(req.headers['authorization']);
  next();
});

routes.forEach(function (item) {

  switch (item.method) {
    case "get":
      app.get("/api" + item.path, item.action);
      break;
    case "post":
      app.post("/api" + item.path, item.action);
      break;
    default:
      break;
  }
});

export default app;