const exress = require('express');

const app = exress();

// Listen for a request
app.listen(3000);

// ejs templating engine 
app.set('view engine', 'ejs');
// views equal to views folder
app.set('views', 'views');

// blogs array to access dynamically in ejs files
const blogs = [
  {title: 'amir find starts', snippet: 'please complete authentication in your browser'},
  {title: 'amir find starts', snippet: 'please complete authentication in your browser'},
  {title: 'amir find starts', snippet: 'please complete authentication in your browser'}
];

// Different routes
app.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Home',  blogs });
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