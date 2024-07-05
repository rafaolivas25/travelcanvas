var express = require('express');
var router = express.Router();
var labelModel = require('../models/labels');



//GET ALL LABELS(FUNCIONA)
router.get('/', async function (req, res, next) {
  
    console.log("[labelsRoutes] Retrieving all labels");
    let result = await labelModel.getlabels();
    res.status(result.status).send(result.data);
  
});

//GET LABELS BY ID (FUNCIONA)
router.get('/:id(\\d+)', async function(req , res, next) {
    let id = req.params.id;
    console.log("[labelsRoutes] Retrieving label with id " + id);
    let result = await labelModel.getlabel(id);
    res.status(result.status).send(result.data);
  });

  //POST(ADD) LABELS (AINDA NAO ESTA ACABADO, NEM TESTADO)
  router.post('/new', async function(req, res, next) {
    let newlabel = req.body;
    console.log("[labelRoutes] Saving label " + JSON.stringify(newlabel));
    let result = await labelModel.savelabel(newlabel);
    res.status(result.status).send(result.data);
  });

  //---------------
//DELETE label
/*router.delete('/:id(\\d+)'async function(req, res, next) {
  let newlabel = req.params.id;
  console.log("[labelRoutes] DELETING label with id " + id);
  let result = await labelModel.deletelabel(newlabel);
  res.status(result.status).send(result.data);

}*/

module.exports = router;

