// server/config/index.js
const path = require('path');

module.exports = {
  // 服务器配置
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0'
  },
  
  // 数据库配置
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  },
  
  // JWT配置
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '7d'
  },
  
  // 微信配置
  wechat: {
    appId: process.env.WECHAT_APPID || 'your-wechat-appid',
    appSecret: process.env.WECHAT_SECRET || 'your-wechat-secret',
    mchId: process.env.WECHAT_MCHID || 'your-wechat-mchid',
    apiKey: process.env.WECHAT_APIKEY || 'your-wechat-apikey'
  },
  
  // 短信配置
  sms: {
    apiKey: process.env.SMS_APIKEY || 'your-sms-apikey',
    templateId: process.env.SMS_TEMPLATEID || 'your-sms-templateid',
    signName: process.env.SMS_SIGNNAME || 'your-sms-signname'
  },
  
  // 上传配置
  upload: {
    dir: path.join(__dirname, '../public/uploads'),
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif']
  },
  
  // 日志配置
  log: {
    level: process.env.LOG_LEVEL || 'info',
    dir: path.join(__dirname, '../logs')
  },
  
  // 初始管理员账户
  admin: {
    username: 'admin',
    password: '123456'
  }
};
