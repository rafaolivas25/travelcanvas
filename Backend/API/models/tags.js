const pool = require('./connection.js');
const express = require('express');
const { log } = require("debug");
const app = express();

//GET ALL TAGS(FUNCIONA)
module.exports.gettags  = async function () {
    try {
        let sql = 'SELECT * FROM tags';
        let result = await pool.query(sql);
        let tags = result;
        console.log("[tagModel.gettags] tags  = " + JSON.stringify(result));
        return { status: 200, data: tags };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//GET TAGS BY ID(FUNCIONA)
module.exports.gettag = async function (id) {
    console.log("[tagModel.gettag] id = " + JSON.stringify(id));
    try {
        let sql =
            `SELECT * FROM tags WHERE tag_id = ${id}`
        let result = await pool.query(sql, [id]);
        let tag = result;
        if (tag.length > 0) {
            console.log("[Model.gettag] tag = " + JSON.stringify(tag[0]));
            return { status: 200, data: tag[0] };
        } else {
            return { status: 404, data: { msg: "tag not found." } };
        }
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//POST(ADD) TAGS (NAO ESTA TESTADA, MAS PENSO QUE AINDA NAO ESTEJA A FUNCIONAR)

module.exports.savetag = async function(tag) {
    console.log("[tagModel.savetag] tag = " + JSON.stringify(tag));
    // checks all fields needed and ignores other fields
    if (typeof tag != "object" || failtag(tag)) {
        if (tag.errMsg)
            return { status: 400, data: { msg: tag.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }
    try {
        let sql = //QUERIE NAO SEI BEM SE ESTA CERTA
            "INSERT " +
            "INTO tags" +
            "tag_name " +
            "RETURNING tag_id";
        let result = await pool.query(sql, [tag.tag_name]);
        let tag = result;
        console.log("[tagModel.savetag] tag = " + JSON.stringify(tag));
        return { status: 200, data: tag };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

//FALTA METER O DELETE TAGS

module.exports.deletetag = async function(id) {
    console.log("[tagModel.deletetag] id = " + JSON.stringify(id));
    try {
        let sql = `delete from tags where tag_id=${id}`
        let result = await client.query(sql);
        return {status: 200, data: "Deletion was successful"}
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}