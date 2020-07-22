const mysql = require('mysql');
//创建数据库连接池，合理的安排链接资源。不是一味的创建链接，容易导致服务器内存泄漏
var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'mr.chen',
    port:3306,
    connectionLimit:100
});
module.exports = pool;