import { Sequelize } from 'sequelize-typescript'
console.log([__dirname + '/models/*.ts'])
const sequelize = new Sequelize({
    database: 'notrello',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: __dirname + '/db.sqlite',
    models: [__dirname + '/models/*.model.ts']
}).sync();

export default sequelize
