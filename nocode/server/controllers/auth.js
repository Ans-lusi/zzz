// server/controllers/auth.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const smsService = require('../services/sms');

// 微信登录
async function wxLogin(req, res) {
  try {
    const { code, userInfo } = req.body;
    
    // 通过code换取openid和session_key
    const wxSession = await wxService.code2Session(code);
    
    // 查找或创建用户
    let user = await User.findOne({ openid: wxSession.openid });
    
    if (!user) {
      user = new User({
        openid: wxSession.openid,
        nickname: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        role: 'user'
      });
      
      await user.save();
    } else {
      // 更新用户信息
      user.nickname = userInfo.nickName;
      user.avatarUrl = userInfo.avatarUrl;
      await user.save();
    }
    
    // 生成token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );
    
    res.send({
      code: 0,
      data: {
        token,
        user: {
          id: user._id,
          nickname: user.nickname,
          avatarUrl: user.avatarUrl,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('微信登录错误:', error);
    res.status(500).send({ code: 1, message: '登录失败' });
  }
}

// 手机号登录
async function phoneLogin(req, res) {
  try {
    const { phone, code } = req.body;
    
    // 验证验证码
    const isValid = await smsService.verifyCode(phone, code);
    
    if (!isValid) {
      return res.send({ code: 1, message: '验证码错误' });
    }
    
    // 查找或创建用户
    let user = await User.findOne({ phone });
    
    if (!user) {
      user = new User({
        phone,
        role: 'user'
      });
      
      await user.save();
    }
    
    // 生成token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );
    
    res.send({
      code: 0,
      data: {
        token,
        user: {
          id: user._id,
          phone: user.phone,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('手机号登录错误:', error);
    res.status(500).send({ code: 1, message: '登录失败' });
  }
}

// 管理员登录
async function adminLogin(req, res) {
  try {
    const { username, password } = req.body;
    
    // 查找管理员用户
    const user = await User.findOne({ username });
    
    if (!user || user.role === 'user') {
      return res.send({ code: 1, message: '用户名或密码错误' });
    }
    
    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.send({ code: 1, message: '用户名或密码错误' });
    }
    
    // 生成token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: '24h' }
    );
    
    res.send({
      code: 0,
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('管理员登录错误:', error);
    res.status(500).send({ code: 1, message: '登录失败' });
  }
}

// 发送验证码
async function sendVerificationCode(req, res) {
  try {
    const { phone } = req.body;
    
    // 生成验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 发送验证码
    await smsService.sendCode(phone, code);
    
    // 保存验证码（实际项目中应使用Redis等缓存服务）
    await smsService.saveCode(phone, code);
    
    res.send({ code: 0, message: '验证码已发送' });
  } catch (error) {
    console.error('发送验证码错误:', error);
    res.status(500).send({ code: 1, message: '发送验证码失败' });
  }
}

module.exports = {
  wxLogin,
  phoneLogin,
  adminLogin,
  sendVerificationCode
};
