// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

var counter = 3;
/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
  res.json(todos);

});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
  //console.log(todos);
  //res.send(JSON.stringify(todos));
  //res.json().send(todos);
  //JSON.parse(res.send(todos));
  res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
  var create = req.body;
  req.body._id = counter + 1;
  counter++;
 // console.log(create);
  todos.push(create);
  res.send(create);
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
  res.json(todos[req.params.id-1]);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
  // console.log("forloop about to start");
  for (i = 0; i < todos.length; i++) { 
    if (todos[i]._id == req.params.id) {
      todos[i].task = req.body.task;
      todos[i].description = req.body.description;
    }
  }
  res.send(todos[(req.params.id)-1]);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */  

  //let i = Number(req.params.id) - 1;
  for (i = 0; i < todos.length; i++) {
    if (todos[i]._id == req.params.id) {
      console.log(i);
      todos.splice(i,1);
    }
  }
  res.json("Dropped it like its hot");
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
