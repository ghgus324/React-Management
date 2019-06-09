// React Web Server(express server)
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//api/hello 경로로 들어오면 어떤 작업을 해줄 건지
app.get('/api/customers',(req,res)=>{
    res.send([
        {
            'id': 'hong',
            'name': '홍길동',
            'image': 'https://placeimg.com/64/64/1',
            'birthday': 961222,
            'gender': '남자',
            'job': '대학생'
          }, {
            'id': 'lee',
            'name': '이순신',
            'image': 'https://placeimg.com/64/64/2',
            'birthday': 921222,
            'gender': '남자',
            'job': '프로그래머'
          }, {
            'id': 'an',
            'name': '앙드레 김',
            'image': 'https://placeimg.com/64/64/3',
            'birthday': 961222,
            'gender': '남자',
            'job': '디자이너'
          }
    ]);
});

app.listen(port , () => console.log(`Listening on port ${port}`));