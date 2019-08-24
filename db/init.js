const mongoose = require('mongoose');
const db = 'mongodb://localhost/blog-be';
const glob = require('glob');
const { resolve } = require('path');

mongoose.Promise = global.Promise;

// 初始化数据库模型
exports.initSchemas = () => {
  // 异步加载schema里面的所有js文件
  glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require);

}

// 链接数据库
exports.connect = () => {
  let maxConnectTimes = 0;
  return new Promise((resolve,reject)=>{
    if(process.env.NODE_ENV !== 'production'){
      // 如果不是生产环境,打印一下debug的日志
      mongoose.set('debug',true);
    }
    // 链接上数据库
    mongoose.connect(db);
    mongoose.connection.on('disconnected',()=>{
      maxConnectTimes ++ ;
      if(maxConnectTimes<5){
        mongoose.connect(db);
      } else {
        throw new Error('数据库挂啦!!');
      }
    });
    mongoose.connection.on('error',()=>{
      maxConnectTimes++;
      if(maxConnectTimes<5){
        mongoose.connect(db);
      } else {
        throw new Error('数据库挂啦!!');
      }
    })
    mongoose.connection.once('open',()=>{
      resolve();
      console.log('数据库连接成功');
    })
  })
}