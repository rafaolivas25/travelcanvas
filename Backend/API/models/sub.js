const pool = require('./connection.js');
const express = require('express');
const { log } = require("debug");
const app = express();

//GET ALL submissions 
module.exports.getsubs = async function () {
    try {
        let sql = 'SELECT * FROM submission';
        let result = await pool.query(sql);
        let subs = result;
        console.log("[subsModel.getblogs] subs  = " + JSON.stringify(result));
        return { status: 200, data: subs };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//GET submissions BY ID(FUNCIONA)
module.exports.getsub = async function (id) {
    console.log("[subModel.getsub] id = " + JSON.stringify(id));
    try {
        let sql =
            `SELECT * FROM submission WHERE sub_id = ${id}`
        let result = await pool.query(sql, [id]);
        let sub = result;
        if (sub.length > 0) {
            console.log("[subModel.getsub] sub = " + JSON.stringify(sub[0]));
            return { status: 200, data: sub[0] };
        } else {
            return { status: 404, data: { msg: "submission not found." } };
        }
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//POST submissions
module.exports.savesub = async function(subs) {
    console.log("[subModel.saveblog] sub = " + JSON.stringify(subs));
    // checks all fields needed and ignores other fields
    if (typeof subs != "object" || failblog(subs)) {
        if (subs.errMsg)
            return { status: 400, data: { msg: subs.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }
    try {
        let sql = //QUERIE NAO SEI BEM SE ESTA CERTA
            "INSERT " +
            "INTO submission " +
            "(sub_title, sub_content)" +
            "VALUES ($1, $2)"
            "RETURNING sub_id";
        let result = await pool.query(sql, [subs.sub_title,subs.sub_content]);
        let sub = result;
        console.log("[subModel.savesub] sub = " + JSON.stringify(sub));
        return { status: 200, data: sub };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

//DELETING SUBMISSIONS

module.exports.deletesub = async function(id) {
    console.log("[subModel.deletesub] id = " + JSON.stringify(id));
    try {
        let sql = `delete from submission where sub_id=${id}`
        let result = await client.query(sql);
        return {status: 200, data: "Deletion was successful"}
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}