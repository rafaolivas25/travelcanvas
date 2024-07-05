var express = require('express');
var router = express.Router();
var tagModel = require('../models/tags');

//gets

//GET ALL TAGS (FUNCIONA)
router.get('/', async function (req, res, next) {
  
    console.log("[tagsRoutes] Retrieving all tags");
    let result = await tagModel.gettags();
    res.status(result.status).send(result.data);
  
  });
  
  //GET TAG BY ID (FUNCIONA)
  router.get('/:id(\\d+)', async function(req , res, next) {
    let id = req.params.id;
    console.log("[tagsRoutes] Retrieving tag with id " + id);
    let result = await tagModel.gettag(id);
    res.status(result.status).send(result.data);
  });

  //POST(ADD) A NEW TAG(AINDA NAO ESTA ACABADO, NEM TESTADO)
router.post('/new', async function(req, res, next) {
    let newtag = req.body;
    console.log("[tagRoutes] Saving tag " + JSON.stringify(newtag));
    let result = await tagModel.savetag(newtag);
    res.status(result.status).send(result.data);
  });
  
  //---------------
  //DELETE TAG
  /*router.delete('/:id(\\d+)'async function(req, res, next) {
    let newtag = req.params.id;
    console.log("[tagRoutes] DELETING tag with id " + id);
    let result = await tagModel.deletetag(newtag);
    res.status(result.status).send(result.data);
  
  }*/
  








module.exports = router;
