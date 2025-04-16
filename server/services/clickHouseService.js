const { ClickHouse } = require('clickhouse');

function createClickHouseClient(config) {
  return new ClickHouse({
    url: config.url,
    port: config.port,
    basicAuth: {
      username: config.user,
      password: config.jwtToken
    },
    isUseGzip: false,
    format: 'json',
    config: { session_timeout: 60 }
  });
}

module.exports = { createClickHouseClient };
