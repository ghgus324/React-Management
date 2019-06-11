const fs = require('fs');
// React Web Server(express server)
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({ dest: './upload' }); //fileName을 겹치지 않도록 해줌

//api/hello 경로로 들어오면 어떤 작업을 해줄 건지
app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

//해당 /image폴더에서 upload 폴더를 접근할 수 있도록
app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (null,?,?,?,?,?,now(),0)';
  let image = '/image' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;

  let params = [image, name, birthday, gender, job];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
      console.log(err);
      console.log(rows);
    }
  );
});

app.delete('/api/customers/:id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.listen(port, () => console.log(`Listening on port ${port}`));