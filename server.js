// React Web Server(express server)
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//api/hello 경로로 들어오면 어떤 작업을 해줄 건지
app.get('/api/hello',(req,res) =>{
    res.send({message: 'Hello Express!'})
});

app.listen(port , () => console.log(`Listening on port ${port}`));