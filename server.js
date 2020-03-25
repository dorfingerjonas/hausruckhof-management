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

app.get('/children', (req, respond) => {  
  respond.set('Access-Control-Allow-Origin', '*');
  respond.set('Access-Control-Allow-Headers', 'Content-Type');
  respond.header("Content-Type",'application/json');
  
  client
    .query('SELECT * FROM child ORDER BY last_name')
    .then((res) => {
      if (res.rowCount > 0) {        
        respond.send(res.rows);
      } else {
        respond.send(false);
      }
    }).catch(e => console.error(e.message));
});

app.post('/updateChild', (req, respond) => {  
  respond.set('Access-Control-Allow-Origin', '*');
  respond.set('Access-Control-Allow-Headers', 'Content-Type')
  respond.header("Content-Type",'application/json');
  const data = req.body;

  console.log(data.birthday);

  const query = {
    name: 'update-child-in-db',
    text: "UPDATE CHILD SET first_name=$1, last_name=$2, birthday=TO_DATE($3, 'YYYY-MM-DD'), svnr=$4, street=$5, housenumber=$6, post_code=$7, place_name=$8, gender=$9, email=$10, phonenumber1=$11, phonenumber1_owner=$12, phonenumber2=$13, phonenumber2_owner=$14, allergens=$15 WHERE svnr=$4",
    values: [data.first_name, data.last_name, data.birthday, data.svnr, data.street, data.housenumber, data.post_code, data.place_name, data.gender, data.email, data.phonenumber1, data.phonenumber1_owner, data.phonenumber2, data.phonenumber2_owner, data.allergens],
  }
  
  client
    .query(query)
    .then((res) => {
      res.rowCount === 1 ? respond.send(true) : respond.send(false);
    }).catch(e => console.error(e.message));
});

app.listen(80, console.log('Listening on port 80'));