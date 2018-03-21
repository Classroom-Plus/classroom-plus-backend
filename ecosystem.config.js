module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'messenger-bot',
      script: 'index.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'leon1757tw',
      host: '35.229.133.151',
      ref: 'origin/master',
      repo: 'git@github.com:Classroom-Plus/messenger-bot.git',
      path: '/home/leon1757tw/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    },
  }
};
