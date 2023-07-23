const exress = require('express');

const app = exress();

// Listen for a request
app.listen(3000);

// Different routes
app.get('/', (req, res) => {
  res.sendFile('./views/index.html',{root: __dirname});
});

app.get('/about', (req, res) => {
  res.sendFile('./views/about.html',{root: __dirname});
});

// redirect
app.get('/about-us', (req, res) => {
  res.redirect('/about')
});

// use method is fired for each request. 
// if the request not matched with the 
// above urls then the response file inside 
// the use method will be send to the browser
// + This use method has to be used in very bottom of the routes 
// because no routes will be fired below it
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html',{root: __dirname});
});