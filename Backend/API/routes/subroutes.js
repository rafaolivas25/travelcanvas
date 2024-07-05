var express = require('express');
var router = express.Router();
var subModel = require('../models/sub');~

//gets

//GET ALL submissions (FUNCIONA)
router.get('/', async function (req, res, next) {
  
    console.log("[subRoutes] Retrieving all subs");
    let result = await subModel.getsubs();
    res.status(result.status).send(result.data);
  
});

//GET a single submission BY ID (FUNCIONA)
router.get('/:id(\\d+)', async function(req , res, next) {
    let id = req.params.id;
    console.log("[subsRoutes] Retrieving sub with id " + id);
    let result = await subModel.getsub(id);
    res.status(result.status).send(result.data);
  });

  //POST(ADD) NEW SUBMISSION (AINDA NAO ESTA ACABADO, NEM TESTADO)
  router.post('/new', async function(req, res, next) {
    let newsub = req.body;
    console.log("[subRoutes] Saving sub " + JSON.stringify(newsub));
    let result = await subModel.savelabel(newsub);
    res.status(result.status).send(result.data);
  });

  //---------------
//DELETE SUBMISSIONS
/*router.delete('/:id(\\d+)'async function(req, res, next) {
  let newsub = req.params.id;
  console.log("[subRoutes] DELETING submission with id " + id);
  let result = await subModel.deletesub(newsub);
  res.status(result.status).send(result.data);

}*/


module.exports = router;