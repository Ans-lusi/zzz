#!/bin/bash

# 小商品售卖微信小程序部署脚本
# 适用于 Ubuntu 24.04

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # 无颜色

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否为root用户
if [ "$(id -u)" != "0" ]; then
    log_error "此脚本需要root权限运行，请使用sudo执行"
    exit 1
fi

# 配置变量
APP_NAME="ecommerce-miniprogram"
APP_DIR="/var/www/$APP_NAME"
NODE_VERSION="18"
MONGO_VERSION="6.0"
PM2_VERSION="latest"

# 安装必要的软件
install_dependencies() {
    log_info "正在更新系统..."
    apt update && apt upgrade -y
    
    log_info "正在安装基础依赖..."
    apt install -y curl wget gnupg2 ca-certificates lsb-release ubuntu-keyring
    
    # 安装Node.js
    log_info "正在安装Node.js $NODE_VERSION..."
    curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash -
    apt install -y nodejs
    
    # 安装MongoDB
    log_info "正在安装MongoDB $MONGO_VERSION..."
    
    # 添加MongoDB GPG密钥
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://pgp.mongodb.com/server-$MONGO_VERSION.asc | 
      gpg --dearmor -o /etc/apt/keyrings/mongodb.gpg
    chmod 644 /etc/apt/keyrings/mongodb.gpg
    
    # 添加MongoDB仓库
    echo "deb [ arch=amd64,arm64 signed-by=/etc/apt/keyrings/mongodb.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/$MONGO_VERSION multiverse" | 
      tee /etc/apt/sources.list.d/mongodb-org-$MONGO_VERSION.list
    
    apt update
    apt install -y mongodb-org
    
    # 安装PM2
    log_info "正在安装PM2..."
    npm install -g pm2@$PM2_VERSION
    
    # 安装Nginx
    log_info "正在安装Nginx..."
    apt install -y nginx
    
    # 安装Certbot
    log_info "正在安装Certbot..."
    apt install -y certbot python3-certbot-nginx
    
    log_info "依赖安装完成"
}

# 配置MongoDB
configure_mongodb() {
    log_info "正在配置MongoDB..."
    
    # 启动MongoDB服务
    systemctl start mongod
    systemctl enable mongod
    
    # 检查MongoDB状态
    if systemctl is-active --quiet mongod; then
        log_info "MongoDB服务已启动"
    else
        log_error "MongoDB服务启动失败"
        exit 1
    fi
    
    log_info "MongoDB配置完成"
}

# 配置Nginx
configure_nginx() {
    log_info "正在配置Nginx..."
    
    # 创建Nginx配置文件
    cat > /etc/nginx/sites-available/$APP_NAME << EOF
server {
    listen 80;
    server_name yourdomain.com;
    
    # 静态文件处理
    location /public/ {
        alias $APP_DIR/server/public/;
        expires 30d;
    }
    
    # API请求转发
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # WebSocket支持
    location /ws/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_read_timeout 86400;
    }
    
    # 访问日志
    access_log /var/log/nginx/$APP_NAME.access.log;
    error_log /var/log/nginx/$APP_NAME.error.log;
}
EOF
    
    # 创建符号链接
    ln -s /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
    
    # 移除默认配置
    rm -f /etc/nginx/sites-enabled/default
    
    # 检查配置
    if nginx -t; then
        # 重启Nginx
        systemctl restart nginx
        systemctl enable nginx
        log_info "Nginx配置完成"
    else
        log_error "Nginx配置错误"
        exit 1
    fi
}

# 配置HTTPS (可选)
configure_https() {
    log_info "正在配置HTTPS..."
    
    read -p "请输入您的域名 (例如: example.com): " domain
    
    # 使用Certbot获取SSL证书
    certbot --nginx -d $domain
    
    # 设置自动续期
    systemctl enable certbot.timer
    
    log_info "HTTPS配置完成"
}

# 部署应用
deploy_application() {
    log_info "正在部署应用..."
    
    # 创建应用目录
    mkdir -p $APP_DIR
    chown -R $SUDO_USER:$SUDO_USER $APP_DIR
    
    # 切换到非root用户执行后续操作
    su - $SUDO_USER -c "cd $APP_DIR && git clone <你的代码仓库URL> ."
    
    # 安装依赖
    su - $SUDO_USER -c "cd $APP_DIR/server && npm install --production"
    
    # 创建环境变量文件
    cat > $APP_DIR/.env << EOF
# 服务器配置
PORT=3000
HOST=0.0.0.0

# 数据库配置
MONGODB_URI=mongodb://localhost:27017/ecommerce

# JWT配置
JWT_SECRET=$(openssl rand -base64 32)

# 微信配置
WECHAT_APPID=your-wechat-appid
WECHAT_SECRET=your-wechat-secret
WECHAT_MCHID=your-wechat-mchid
WECHAT_APIKEY=your-wechat-apikey

# 短信配置
SMS_APIKEY=your-sms-apikey
SMS_TEMPLATEID=your-sms-templateid
SMS_SIGNNAME=your-sms-signname

# 日志配置
LOG_LEVEL=info

# 管理员账户
ADMIN_USERNAME=admin
ADMIN_PASSWORD=$(openssl rand -base64 12)
EOF
    
    log_warn "请编辑 $APP_DIR/.env 文件，填入正确的配置信息"
    
    # 创建上传目录
    su - $SUDO_USER -c "mkdir -p $APP_DIR/server/public/uploads && mkdir -p $APP_DIR/server/logs"
    
    # 配置PM2
    su - $SUDO_USER -c "cd $APP_DIR && pm2 start deploy/pm2/ecommerce-server.config.js --env production"
    
    # 保存PM2进程列表
    su - $SUDO_USER -c "pm2 save"
    
    # 设置PM2开机自启
    su - $SUDO_USER -c "pm2 startup systemd | sudo bash"
    
    log_info "应用部署完成"
}

# 配置防火墙
configure_firewall() {
    log_info "正在配置防火墙..."
    
    # 安装ufw
    apt install -y ufw
    
    # 设置默认规则
    ufw default deny incoming
    ufw default allow outgoing
    
    # 允许SSH、HTTP和HTTPS
    ufw allow ssh
    ufw allow http
    ufw allow https
    
    # 启用防火墙
    ufw --force enable
    
    log_info "防火墙配置完成"
}

# 主函数
main() {
    log_info "开始部署 $APP_NAME..."
    
    install_dependencies
    configure_mongodb
    configure_nginx
    
    read -p "是否配置HTTPS? (y/n): " configure_https_choice
    if [ "$configure_https_choice" = "y" ] || [ "$configure_https_choice" = "Y" ]; then
        configure_https
    fi
    
    deploy_application
    configure_firewall
    
    log_info "部署完成!"
    log_info "请访问 http://yourdomain.com 或 https://yourdomain.com 使用系统"
    log_info "管理员默认用户名: admin"
    log_info "管理员默认密码已自动生成，请查看 $APP_DIR/.env 文件"
}

# 执行主函数
main
