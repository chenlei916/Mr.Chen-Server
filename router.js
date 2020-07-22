var express = require("express");
var router = express.Router();
var pool = require("./dataBase");
var md5 = require("blueimp-md5");
function handleResponse(arg1, res) {
  switch (arg1) {
    case 500:
      res.status(500).json({
        code: 500,
        message: "Server error",
      });
      break;
    case 0:
      res.status(200).json({
        code: 0,
        message: "success",
      });
      break;
    case 1:
      res.status(200).json({
        code: 1,
        message: "fall",
      });
      break;
  }
}
//注册请求，用户名存在状态码为1，注册成功状态码为0
router.post("/register", (req, res) => {
  var body = req.body;
  var name = body.name;
  var pwd = md5(md5(body.password));
  pool.getConnection((err, conn) => {
    if (err) {
      handleResponse(500, res);
    } else {
      conn.query(
        "select count(1) from users where username = '" + name + "'",
        function (err, result) {
          if (err) {
            handleResponse(500, res);
          } else {
            if (result[0]["count(1)"] === 0) {
              conn.query(
                "insert into users(userName,userPwd)  values('" +
                  name +
                  "','" +
                  pwd +
                  "')",
                function (err) {
                  if (err) {
                    handleResponse(500, res);
                  } else {
                      handleResponse(0,res);
                  }
                }
              );
            } else {
              res.status(200).json({
                code: 1,
              });
            }
          }
        }
      );
    }
    conn.release();
  });
});
//通过浏览器回应处理

//登录处理 状态码：1为登陆成功  0为用户名密码错误
router.post("/login", (req, res) => {
  var name = req.body.name;
  var pwd =  md5(md5(req.body.password));
  pool.getConnection((err, conn) => {
    if (err) {
      handleResponse(500, res);
    } else {
      conn.query(
        "SELECT count(*) FROM `users` where userName = '" +
          name +
          "' and userPwd = '" +
          pwd +
          "'",
        function (err2, result) {
          if (err2) {
            handleResponse(500, res);
          }
          if (result[0]["count(*)"] === 1) {
            handleResponse(0, res);
          } else {
            handleResponse(1, res);
          }
          
        }
      );
    }
    conn.release();
  });

});

module.exports = router;
