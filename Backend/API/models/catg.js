const pool = require('./connection.js');
const express = require('express');
const { log } = require("debug");
const app = express();

//GET ALL CATEGORIES(FUNCIONA)
module.exports.getcatg = async function () {
    try {
        let sql = 'SELECT * FROM categories';
        let result = await pool.query(sql);
        let catgs = result;
        console.log("[catgModel.getcags] catgs  = " + JSON.stringify(result));
        return { status: 200, data: catgs };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//GET CATEGORIES BY ID(FUNCIONA)
module.exports.getcatg = async function (id) {
    console.log("[catModel.getcat] id = " + JSON.stringify(id));
    try {
        let sql =
            `SELECT * FROM categories WHERE cat_id = ${id}`
        let result = await pool.query(sql, [id]);
        let catgs = result;
        if (catgs.length > 0) {
            console.log("[catgModel.getcat] cat = " + JSON.stringify(catgs[0]));
            return { status: 200, data: catgs[0] };
        } else {
            return { status: 404, data: { msg: "categorie not found." } };
        }
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}
