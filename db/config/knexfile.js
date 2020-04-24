// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      user: 'postgres',
      password:'tsiyon',
      database:'postgres'
    },
    migrations:{
      directory: __dirname + '../../migrations'
    },
    seeds:{
      directory: __dirname + '../../seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: 'postgres://hoiqtthyfbxftz:8a33ab062fce9139ad8d25a50035d3e5138111bdf9abd1a613b40469707e0d1e@ec2-50-17-21-170.compute-1.amazonaws.com:5432/dbeth082tc495f',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: 'postgres://hoiqtthyfbxftz:8a33ab062fce9139ad8d25a50035d3e5138111bdf9abd1a613b40469707e0d1e@ec2-50-17-21-170.compute-1.amazonaws.com:5432/dbeth082tc495f',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
