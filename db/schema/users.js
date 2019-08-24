const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SALT_WORK_FACTORY = 10;
// 设计最大的密码输入出错次数
const MAX_LOGIN_ATTEMPTS = 5;
// 锁定时间为2h
const LOCK_TIME = 2 * 60 * 60 * 1000;

const userSchema = new Schema({
  // 用户名
  username: {
    unique: true,
    required: true,
    type: String,
  },
  password: {
    unique: true,
    required: true,
    type: String,
  },
  email: {
    unique: true,
    required: true,
    type: String
  },
  role: {
    type: String,
    default: 'user'
  },
  lockUntil: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

// 存之前对时间更新一下
userSchema.pre('save', (next) => {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
});

userSchema.pre('save', (next) => {

})