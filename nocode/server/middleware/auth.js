// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const config = require('../config');

// 验证token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(403).send({ message: '未提供token' });
  }
  
  jwt.verify(token.replace('Bearer ', ''), config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: '无效的token' });
    }
    
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
}

// 检查用户角色
function checkRole(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).send({ message: '权限不足' });
    }
    
    next();
  };
}

// 记录操作日志
function logOperation(req, res, next) {
  const log = {
    userId: req.userId,
    username: req.username,
    ip: req.ip,
    method: req.method,
    path: req.path,
    timestamp: new Date()
  };
  
  // 保存日志到数据库
  // LogModel.create(log);
  
  next();
}

module.exports = {
  verifyToken,
  checkRole,
  logOperation
};
