const Koa = require('koa');
const { resolve } = require('path');

const app = new Koa();

// 自执行函数 
(async()=>{
   app.listen(3000);
})();