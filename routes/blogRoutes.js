const express = require('express');
const route = express.Router();
const blogController = require('../controllers/blogController');

route.get('/', blogController.blog_index );
route.post('/', blogController.blog_create_post);
route.get('/create', blogController.blog_create_get);
// adding route parameters
route.get('/:id', blogController.blog_details);
route.delete('/:id', blogController.blog_delete);

module.exports = route;