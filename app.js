const exress = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = exress();


// ejs templating engine 
app.set('view engine', 'ejs');
// views equal to views folder
app.set('views', 'views');


// connect to the data base
// this is asynchornous so we need to add the .then() & .catch() methods
mongoose.connect(mdbURI)
  .then( data => {
    // Listen for a request when mongodb is connected.
    app.listen(3000);
    // console.log("Connected successfuly.");
  })
  .catch(err => {
    console.log("Faild to connect.");
});

// middleware 
/*
  app.use((req, res, next) => {
    console.log("New request made:");
    console.log("Host:", req.hostname);
    console.log("Path:", req.path);
    console.log("Method:", req.method);
    next();
  });
*/

// another middleware  and static files
app.use(exress.static('public'));

// the below middleware is used to extract data from the post mthod body
// if we don't specify this middleware the post body will be undefined
app.use(exress.urlencoded({ extended: true }));  // {extended:true} is optional

// mongoose and mongo sandbox routes
// add new data to the Blog schema
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'my new blog',
    snippet: 'blog detials',
    body: 'more blog deltials'
  });

  blog.save()
    .then( result => {
      res.send(result);
    }).catch( error => {
      console.log(error);
    });
});

// get all the blogs from the collection
/*
  app.get('/all-blogs', (req, res) => {
    Blog.find()
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        console.log(error);
      });
  });
*/

// get single blog
/*
  app.get('/single-blog', ( req, res ) => {
    Blog.findById('64be9a60b652d05e2f136b89')
      .then( result => {
        res.send(result);
      })
      .catch( error => {
        console.log(error);
      });
  });
*/

// Different routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/blogs', ( req, res ) => {
  Blog.find().sort({createdAt: -1 })
    .then(result => {
      res.render('index', { pageTitle: 'All Blogs', blogs: result })
    })
    .catch(error => {
      console.log(error);
    });
});

app.post('/blogs', (req, res) => {
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
});

// adding route parameters
app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id) 
    .then(result => {
      res.render('details', { pageTitle: 'Blog', blogs: result });
    })
    .catch(error => {
      console.log(error);
    })
});

app.delete('/blogs/:id', (req,res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({redirect: '/blogs'})
    })
    .catch(err => {
        console.log(err);
    })
});

app.get('/about', (req, res) => {
  res.render('about', { pageTitle: 'About' });
});

app.get('/blogs/create', ( req, res ) => {
  res.render('create', { pageTitle: 'Create a Blog' });
});

// redirect
// app.get('/about-us', (req, res) => {
//   res.redirect('/about')
// });

// use method is fired for each request. 
// if the request not matched with the 
// above urls then the response file inside 
// the use method will be send to the browser
// + This use method has to be used in very bottom of the routes 
// because no routes will be fired below it
app.use((req, res) => {
  res.status(404).render('404', { pageTitle: '404' });
});
