// deploy/pm2/ecommerce-server.config.js
module.exports = {
  apps: [
    {
      name: "ecommerce-server",
      script: "server/server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
