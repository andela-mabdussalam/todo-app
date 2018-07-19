module.exports = {
  development: {
    use_env_variable: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    operatorsAliases: false // remove deprecation warning
  },
  test: {
    username: 'database_test',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
  }
};
