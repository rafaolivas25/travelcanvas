const pool = require('./connection.js');
const express = require('express');
const { log } = require("debug");
const app = express();

//GET ALL postagens do blog
module.exports.getblogs = async function () {
    try {
        let sql = 'SELECT * FROM post';
        let result = await pool.query(sql);
        let blogs = result;
        console.log("[blogsModel.getblogs] blogs  = " + JSON.stringify(result));
        return { status: 200, data: blogs };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//GET postagens BY ID(FUNCIONA)
module.exports.getblog = async function (id) {
    console.log("[blogModel.getblog] id = " + JSON.stringify(id));
    try {
        let sql =
            `SELECT * FROM post WHERE post_id = ${id}`
        let result = await pool.query(sql, [id]);
        let blog = result;
        if (blog.length > 0) {
            console.log("[blogModel.getblog] blog = " + JSON.stringify(blog[0]));
            return { status: 200, data: blog[0] };
        } else {
            return { status: 404, data: { msg: "postagem not found." } };
        }
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//GET categories de postagem BY ID (CONCLUIDO)
module.exports.getcats = async function (id) {
    try {
        let sql = `SELECT * FROM post INNER JOIN categories on post_categories_id = cat_id WHERE cat_id = ${id};`
        let result = await pool.query(sql,[id]);
        let blogcats = result;
        console.log("[blogModel.getcats] cats = " + JSON.stringify(blogcats[0]));
        return { status: 200, data: blogcats };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


//GET tags de postagem BY ID (CONCLUIDO) MAS NAO TEMOS NENHUMA COM O ID = 1
module.exports.gettags = async function (id) {
    try {
        let sql = `SELECT * FROM post INNER JOIN tags on post_tags_id = tag_id WHERE tag_id = ${id};`
        let result = await pool.query(sql,[id]);
        let blogtags = result;
        console.log(result);
        console.log(id);
        console.log("[blogModel.gettags] tags = " + JSON.stringify(blogtags[0]));
        return { status: 200, data: blogtags };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//POST Postagens
module.exports.saveblog = async function(blog) {
    console.log("[blogModel.saveblog] blog = " + JSON.stringify(blog));
    // checks all fields needed and ignores other fields
    if (typeof blog != "object" || failblog(blog)) {
        if (blog.errMsg)
            return { status: 400, data: { msg: blog.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }
    try {
        let sql = //QUERIE NAO SEI BEM SE ESTA CERTA
            "INSERT " +
            "INTO post " +
            "(post_name, post_title,post_content)" +
            "VALUES ($1, $2, $3)"
            "RETURNING post_id";
        let result = await pool.query(sql, [blog.post_name,blog.blog_title,blog.blog_content]);
        let blog = result;
        console.log("[blogModel.saveblog] blog = " + JSON.stringify(blog));
        return { status: 200, data: blog };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

//DELETE POSTAGENS

module.exports.deleteblog = async function(id) {
    console.log("[blogModel.deleteblog] id = " + JSON.stringify(id));
    try {
        let sql = `delete from post where post_id=${id}`
        let result = await client.query(sql);
        return {status: 200, data: "Deletion was successful"}
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

