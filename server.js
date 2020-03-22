const bodyParser = require('body-parser');
const express = require('express');
const bcrypt = require('bcrypt');
const { Client } = require('pg');
const app = express();

app.use(express.static('src/html'));
app.use(express.static('src/css'));
app.use(express.static('src/img'));
app.use(express.static('src/php'));
app.use(express.static('src/js'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const client = new Client();
client.connect();
client.on('connect', () => console.log('Connected to database'));

app.post('/login', (req, respond) => {  
  respond.set('Access-Control-Allow-Origin', '*');
  respond.set('Access-Control-Allow-Headers', 'Content-Type')
  respond.header("Content-Type",'application/json');

  const query = {
    name: 'get-user-from-db',
    text: 'SELECT * FROM account WHERE username = $1',
    values: [req.body.username],
  }
  
  client
    .query(query)
    .then((res) => {
      if (res.rowCount > 0) {        
        bcrypt.compare(req.body.password, res.rows[0].password).then((result) => {
          respond.send(result);
        });
      } else {
        respond.send(false);
      }
    }).catch(e => console.error(e.message));
});

app.get('/children', (respond) => {  
  respond.set('Access-Control-Allow-Origin', '*');
  respond.set('Access-Control-Allow-Headers', 'Content-Type');
  respond.header("Content-Type",'application/json');
  
  client
    .query('SELECT * FROM child')
    .then((res) => {
      if (res.rowCount > 0) {        
        respond.send(res.rows);
      } else {
        respond.send(false);
      }
    }).catch(e => console.error(e.message));
});

app.listen(80, console.log('Listening on port 80'));