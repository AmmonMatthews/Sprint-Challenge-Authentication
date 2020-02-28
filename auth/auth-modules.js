const db = require('../database/dbConfig.js');

module.exports={
    add,
    findBy
}

function add(user){
    db('users')
    .insert(user, "id")
}

function findBy(id){
    db('users')
    .where({id})
    .first();
}