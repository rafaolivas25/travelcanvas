var express = require('express');
var router = express.Router();
var countryModel = require('../models/country');

//GET ALL INFORMATIONS ABOUT THE COUNTRIES(FUNCIONA)
router.get('/', async function (req, res, next) {
  
    console.log("[countriesRoutes] Retrieving all countries");
    let result = await countryModel.getcountries();
    res.status(result.status).send(result.data);
  
});

//GET countries BY ID (FUNCIONA)
router.get('/:id(\\d+)', async function(req , res, next) {
    let id = req.params.id;
    console.log("[countryRoutes] Retrieving country with id " + id);
    let result = await countryModel.getcountry(id);
    res.status(result.status).send(result.data);
  });

  //POST(ADD) COUNTRIES (AINDA NAO ESTA ACABADO, NEM TESTADO)
  router.post('/new', async function(req, res, next) {
    let newcountry = req.body;
    console.log("[countryRoutes] Saving country " + JSON.stringify(newcountry));
    let result = await countryModel.savecountry(newcountry);
    res.status(result.status).send(result.data);
  });

  //DELETE COUNTRIES

/*router.delete('/:id(\\d+)'async function(req, res, next) {
  let newcountry = req.params.id;
  console.log("[countryRoutes] DELETING country with id " + id);
  let result = await countryModel.deletecountry(newcountry);
  res.status(result.status).send(result.data);

}*/


module.exports = router;