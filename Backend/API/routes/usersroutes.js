var express = require('express');
var router = express.Router();
var userModel = require('../models/users');

//gets

//GET ALL USERS (FUNCIONA)
router.get('/', async function (req, res, next) {
  
  console.log("[usersRoutes] Retrieving all users");
  let result = await userModel.getusers();
  res.status(result.status).send(result.data);

});

//GET USER BY ID (FUNCIONA)
router.get('/:id(\\d+)', async function(req , res, next) {
  let id = req.params.id;
  console.log("[usersRoutes] Retrieving user with id " + id);
  let result = await userModel.getuser(id);
  res.status(result.status).send(result.data);
});

//GET USER TYPES BY ID (FUNCIONA)
router.get('/type/:id(\\d+)', async function(req, res, next) {
  let id = req.params.id;
  console.log("[userRoutes] Retrieving all user types by id" + id);
  let result = await userModel.getTypes(id);
  res.status(result.status).send(result.data);
});

//POST(ADD) A NEW USER(AINDA NAO ESTA ACABADO, NEM TESTADO)
router.post('/new', async function(req, res, next) {
  let newuser = req.body;
  console.log("[userRoutes] Saving user " + JSON.stringify(newuser));
  let result = await userModel.saveuser(newuser);
  res.status(result.status).send(result.data);
});

//---------------
//DELETE USER
/*router.delete('/:id(\\d+)'async function(req, res, next) {
  let newuser = req.params.id;
  console.log("[userRoutes] DELETING user with id " + id);
  let result = await userModel.deleteuser(newuser);
  res.status(result.status).send(result.data);

}*/

module.exports = router;