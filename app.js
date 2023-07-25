const exress = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

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


// Different routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

/*
  blog routes using use() middleware
  there are two ways of adding blog routes

  1). app.use(blogRoutes);
  2). app.use('/blogs', blogRoutes);

  but in case 2 we have to remove "/blogs" from
  all the routes inside the blogRoute.js file.
  For now we use case 2 because if in the future we change the Link ('/blogs')
  to something else then we will not be changing all the links in blogRoute.js file
*/

app.use('/blogs', blogRoutes);

app.get('/about', (req, res) => {
  res.render('about', { pageTitle: 'About' });
});

// use method is fired for each request. 
// if the request not matched with the 
// above urls then the response file inside 
// the use method will be send to the browser
// + This use method has to be used in very bottom of the routes 
// because no routes will be fired below it
app.use((req, res) => {
  res.status(404).render('404', { pageTitle: '404' });
});