module.exports = {
  apps: [{
    name: 'swapi-rest',
    script: 'dist/apps/swapi/main.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      MONGODB_URI: 'mongodb://swapi-dev-user:swapi-dev1@ds233198.mlab.com:33198/swapi-dev',
      PORT: 3002
    },
    env_production: {
      NODE_ENV: 'production'
    }
  },
  {
    name: 'swapi-graphql',
    script: 'dist/apps/swapi-graphql/main.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3001,
      MONGODB_URI: 'mongodb://swapi-dev-user:swapi-dev1@ds233198.mlab.com:33198/swapi-dev',
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'root',
      host: '167.172.109.84',
      ref: 'origin/development',
      repo: 'git@github.com:arkus7/swapi.git',
      path: '/var/www/production',
      'post-deploy': 'npm install --dev && nest build && nest build swapi-graphql && pm2 reload ecosystem.config.js --env production'
    }
  }
};
