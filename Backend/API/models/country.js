const pool = require('./connection.js');
const express = require('express');
const { log } = require("debug");
const app = express();

//GET ALL countries (FUNCIONA)
module.exports.getcountries = async function () {
    try {
        let sql = 'SELECT * FROM div_country';
        let result = await pool.query(sql);
        let country = result;
        console.log("[countryModel.getcountries] countries  = " + JSON.stringify(result));
        return { status: 200, data: country };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//GET COUNTRIES BY ID (FUNCIONA)
module.exports.getcountry = async function (id) {
    console.log("[countryModel.getcountry] id = " + JSON.stringify(id));
    try {
        let sql =
            `SELECT * FROM div_country WHERE country_id = ${id}`
        let result = await pool.query(sql, [id]);
        let countries = result;
        if (countries.length > 0) {
            console.log("[countryModel.getcountry] country = " + JSON.stringify(countries[0]));
            return { status: 200, data: countries[0] };
        } else {
            return { status: 404, data: { msg: "country not found." } };
        }
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//POST COUNTRIES

module.exports.savecountry = async function(country) {
    console.log("[countryModel.savecountry] country = " + JSON.stringify(country));
    // checks all fields needed and ignores other fields
    if (typeof country != "object" || failcountry(country)) {
        if (country.errMsg)
            return { status: 400, data: { msg: country.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }
    try {
        let sql = //QUERIE NAO SEI BEM SE ESTA CERTA
            "INSERT " +
            "INTO div_country " +
            "country_name" +
            "RETURNING country_id";
        let result = await pool.query(sql, [country.country_name]);
        let country = result;
        console.log("[countryModel.savecountry] country = " + JSON.stringify(country));
        return { status: 200, data: country };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "country not found" } };
        else
            return { status: 500, data: err };
    }
}