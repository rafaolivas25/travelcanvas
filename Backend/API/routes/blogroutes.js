var express = require('express');
var router = express.Router();
var blogModel = require('../models/blog');

//gets

//GET ALL postagem (FUNCIONA)
router.get('/', async function (req, res, next) {
  
    console.log("[blogsRoutes] Retrieving all posts");
    let result = await blogModel.getblogs();
    res.status(result.status).send(result.data);
  
});

//GET postagem BY ID (FUNCIONA)
router.get('/:id(\\d+)', async function(req , res, next) {
    let id = req.params.id;
    console.log("[blogsRoutes] Retrieving post with id " + id);
    let result = await blogModel.getblog(id);
    res.status(result.status).send(result.data);
  });

  //GET blog categories BY ID(FUNCIONA) 
router.get('/cat/:id(\\d+)', async function(req, res, next) {
  let id = req.params.id;
  console.log("[blogsRoutes] Retrieving all user cat by id" + id);
  let result = await blogModel.getcats(id);
  res.status(result.status).send(result.data);
});

//GET blog tags BY ID (FUNCIONA)
router.get('/tag/:id(\\d+)', async function(req, res, next) {
  let id = req.params.id;
  console.log("[blogsRoutes] Retrieving all user tags by id" + id);
  let result = await blogModel.gettags(id);
  res.status(result.status).send(result.data);
});


  //POST(ADD) postagens(AINDA NAO ESTA NEM TESTADO)
  router.post('/new', async function(req, res, next) {
    let newblog = req.body;
    console.log("[blogRoutes] Saving blog " + JSON.stringify(newblog));
    let result = await blogModel.saveblog(newblog);
    res.status(result.status).send(result.data);
  });

  //---------------
//DELETE postagem
/*router.delete('/:id(\\d+)'async function(req, res, next) {
  let newblog = req.params.id;
  console.log("[blogRoutes] DELETING blog with id " + id);
  let result = await blogModel.deleteblog(newblog);
  res.status(result.status).send(result.data);

}*/


module.exports = router;