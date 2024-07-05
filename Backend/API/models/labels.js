const pool = require('./connection.js');
const express = require('express');
const { log } = require("debug");
const app = express();

//GET ALL LABELS (FUNCIONA)
module.exports.getlabels = async function () {
    try {
        let sql = 'SELECT * FROM div_labels';
        let result = await pool.query(sql);
        let labels = result;
        console.log("[labelsModel.getlabels] labels  = " + JSON.stringify(result));
        return { status: 200, data: labels };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//GET LABELS BY ID (FUNCIONA)
module.exports.getlabel = async function (id) {
    console.log("[labelModel.getlabel] id = " + JSON.stringify(id));
    try {
        let sql =
            `SELECT * FROM div_labels WHERE labels_id = ${id}`
        let result = await pool.query(sql, [id]);
        let label = result;
        if (label.length > 0) {
            console.log("[labelModel.getlabel] label = " + JSON.stringify(label[0]));
            return { status: 200, data: label[0] };
        } else {
            return { status: 404, data: { msg: "label not found." } };
        }
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//POST LABEL (AINDA NAO FOI TESTADO)
module.exports.savelabel = async function(label) {
    console.log("[labelModel.savelabel] label = " + JSON.stringify(label));
    // checks all fields needed and ignores other fields
    if (typeof label != "object" || faillabel(label)) {
        if (label.errMsg)
            return { status: 400, data: { msg: label.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }
    try {
        let sql = //QUERIE NAO SEI BEM SE ESTA CERTA
            "INSERT " +
            "INTO div_labels " +
            "labels_name" +
            "RETURNING labels_id";
        let result = await pool.query(sql, [label.labels_name]);
        let label = result;
        console.log("[labelModel.savelabel] label = " + JSON.stringify(label));
        return { status: 200, data: label };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

//FALTA O DELETE LABELS

module.exports.deletelabel = async function(id) {
    console.log("[labelModel.deletelabel] id = " + JSON.stringify(id));
    try {
        let sql = `delete from div_labels where labels_id=${id}`
        let result = await client.query(sql);
        return {status: 200, data: "Deletion was successful"}
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}