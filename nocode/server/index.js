// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const config = require('./config');
const routes = require('./routes');
const WebSocket = require('ws');

// 创建Express应用
const app = express();

// 配置中间件
app.use(helmet()); // 增强安全性
app.use(compression()); // 压缩响应数据
app.use(cors()); // 允许跨域请求
app.use(bodyParser.json()); // 解析JSON请求体
app.use(bodyParser.urlencoded({ extended: true })); // 解析URL编码的请求体

// 配置日志
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev')); // 开发环境使用详细日志
} else {
  app.use(morgan('combined')); // 生产环境使用标准日志
}

// 连接数据库
mongoose.connect(config.database.uri, config.database.options)
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch(err => {
    console.error('数据库连接失败:', err);
    process.exit(1);
  });

// 配置路由
app.use('/api', routes);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).send({ code: 1, message: '服务器内部错误' });
});

// 启动服务器
const server = app.listen(config.server.port, config.server.host, () => {
  console.log(`服务器运行在 http://${config.server.host}:${config.server.port}`);
});

// 初始化WebSocket服务器
const wss = new WebSocket.Server({ server });

// WebSocket连接处理
wss.on('connection', (ws) => {
  console.log('新的WebSocket连接');
  
  // 处理消息
  ws.on('message', (message) => {
    console.log('收到消息:', message);
    
    // 解析消息
    try {
      const data = JSON.parse(message);
      
      // 根据消息类型处理
      switch (data.type) {
        case 'subscribe':
          // 处理订阅请求
          handleSubscribe(ws, data);
          break;
        case 'unsubscribe':
          // 处理取消订阅请求
          handleUnsubscribe(ws, data);
          break;
        default:
          // 未知消息类型
          ws.send(JSON.stringify({ type: 'error', message: '未知消息类型' }));
      }
    } catch (error) {
      ws.send(JSON.stringify({ type: 'error', message: '消息格式错误' }));
    }
  });
  
  // 处理断开连接
  ws.on('close', () => {
    console.log('WebSocket连接关闭');
    // 清理资源
    cleanupConnection(ws);
  });
});

// 初始化系统
async function initSystem() {
  try {
    // 检查是否存在管理员账户，如果不存在则创建
    const User = require('./models/user');
    const admin = await User.findOne({ role: 'superadmin' });
    
    if (!admin) {
      const hashedPassword = await bcrypt.hash(config.admin.password, 10);
      const newAdmin = new User({
        username: config.admin.username,
        password: hashedPassword,
        role: 'superadmin'
      });
      
      await newAdmin.save();
      console.log('已创建默认管理员账户: admin/123456');
    }
    
    console.log('系统初始化完成');
  } catch (error) {
    console.error('系统初始化失败:', error);
    process.exit(1);
  }
}

// 启动系统
initSystem();

// 导出应用实例
module.exports = app;
