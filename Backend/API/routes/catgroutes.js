var express = require('express');
var router = express.Router();
var catgModel = require('../models/catg');


//gets

//GET ALL CATEGORIES (FUNCIONA)
router.get('/', async function (req, res, next) {
  
    console.log("[catgRoutes] Retrieving all categories");
    let result = await catgModel.getcatg();
    res.status(result.status).send(result.data);
  
  });

  //GET CATEGORIE BY ID (FUNCIONA)
router.get('/:id(\\d+)', async function(req , res, next) {
    let id = req.params.id;
    console.log("[catgsRoutes] Retrieving categorie with id " + id);
    let result = await catgModel.getcatg(id);
    res.status(result.status).send(result.data);
  });

  //POST(ADD) A CATEGORIE(AINDA NAO ESTA ACABADO, NEM TESTADO)
  //CONFIRMAR 

router.post('/new', async function(req, res, next) {
    let newcat = req.body;
    console.log("[catRoutes] Saving cat " + JSON.stringify(newcat));
    let result = await catgModel.savecatg(newcat);
    res.status(result.status).send(result.data);
  });

  //---------------
//DELETE CATEGORIE
/*router.delete('/:id(\\d+)'async function(req, res, next) {
  let newcat = req.params.id;
  console.log("[catRoutes] DELETING cat with id " + id);
  let result = await catgModel.deletecatg(newcat);
  res.status(result.status).send(result.data);

}*/

module.exports = router;