const Blog = require('../models/blog');


// the following are MDN function naming convention 
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = ( req, res ) => {
  Blog.find().sort({createdAt: -1 })
    .then(result => {
      res.render('blog/index', { pageTitle: 'All Blogs', blogs: result })
    })
    .catch(error => {
      console.log(error);
    });
}

const blog_create_post = (req, res) => {
  // we can also simply pass req.body to Blog() -> Blog(req.body)
  const blog = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body
  });

  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(error => {
      console.log(error);
    });
}

const blog_create_get = ( req, res ) => {
  res.render('blog/create', { pageTitle: 'Create a Blog' });
}

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id) 
    .then(result => {
      res.render('blog/details', { pageTitle: 'Blog', blogs: result });
    })
    .catch(error => {
      res.status(404).render('404', { pageTitle: 'Blog not found' });
    })
}

const blog_delete = (req,res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({redirect: '/blogs'})
    })
    .catch(err => {
        console.log(err);
    })
}

// export all the functions
module.exports = {
  blog_index,
  blog_create_post,
  blog_create_get,
  blog_details,
  blog_delete
}