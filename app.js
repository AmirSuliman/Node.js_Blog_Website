const exress = require('express');

const app = exress();

// Listen for a request
app.listen(3000);

app.set('view engine', 'ejs');
app.set('views', 'views');

// Different routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/blogs/create', ( req, res ) => {
  res.render('create');
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
  res.status(404).render('404');
});