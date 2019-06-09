import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';

const customers = [{
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
}]

class App extends Component {
  render() {
    return (
      <div>
        {
          customers.map(c => {
            return (
              <Customer
                key={c.id}
                id={c.id}
                name={c.name}
                image={c.image}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job} />
            )
          })
        }
      </div>
    )
  }
}

export default App;
