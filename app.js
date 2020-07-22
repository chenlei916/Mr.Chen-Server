var express = require('express');
var bodyParser = require('body-parser');

var cors = require('cors');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

console.log('123');

//配置跨域问题
app.use(
    cors({
      methods: ["GET", "POST"],
      alloweHeaders: [
        "Content-Type",
        "application/json;charset=utf-8;application/x-www-form-urlencoded",
      ],
    })
  );

  var router = require('./router');
  app.use(router);
  
  //404处理
  app.use(function(req,res,next){
    res.json({
      code:404
    });
    
 
   });



app.listen(3000,function(){
    console.log('Server is running...');
    
});