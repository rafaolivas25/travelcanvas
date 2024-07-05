const pool = require('./connection.js');
const express = require('express');
const { log } = require("debug");
const app = express();

//GET ALL TAGS(FUNCIONA)
module.exports.getusers = async function () {
    try {
        let sql = 'SELECT * FROM div_user';
        let result = await pool.query(sql);
        let users = result;
        console.log("[userModel.getusers] users  = " + JSON.stringify(result));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//GET TAG BY ID(FUNCIONA)
module.exports.getuser = async function (id) {
    console.log("[userModel.getuser] id = " + JSON.stringify(id));
    try {
        let sql =
            `SELECT * FROM div_user WHERE user_id = ${id}`
        let result = await pool.query(sql, [id]);
        let users = result;
        if (users.length > 0) {
            console.log("[userModel.getuser] user = " + JSON.stringify(users[0]));
            return { status: 200, data: users[0] };
        } else {
            return { status: 404, data: { msg: "user not found." } };
        }
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//GET USER TYPES BY ID (CONCLUIDO)
module.exports.getTypes = async function (id) {
    try {
        let sql = `SELECT * FROM div_user INNER JOIN div_user_type on user_type_id = type_id WHERE type_id = ${id};`
        let result = await pool.query(sql,[id]);
        let usertypes = result;
        console.log("[usersModel.getTypes] types = " + JSON.stringify(usertypes[0]));
        return { status: 200, data: usertypes };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//POST(ADD) USERS (NAO ESTA TESTADA, MAS PENSO QUE AINDA NAO ESTEJA A FUNCIONAR)

module.exports.saveuser = async function(user) {
    if (typeof user != "object") {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }
    try {
        let sql = `Insert into div_user(user_id,user_name,user_email,user_password,user_type_id,user_location_id)
        values('${user_id}','${user_name}', '${user_email}', '${user_password}', '${user_type_id}', '${user_location_id}')`
        let result = await pool.query(sql);
        let user = result;
        console.log("[usersModel.saveuser] user = " + JSON.stringify(user));
        return { status: 200, data: "successfully added a user" };
    } catch (err) {
        console.log(err);
            return { status: 500, data: err };
    }
}

//FALTA METER O DELETE USERS

module.exports.deleteUser = async function(id) {
    console.log("[userModel.deleteUser] id = " + JSON.stringify(id));
    try {
        let sql = `delete from div_user where user_id=${id}`
        let result = await client.query(sql);
        return {status: 200, data: "Deletion was successful"}
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}