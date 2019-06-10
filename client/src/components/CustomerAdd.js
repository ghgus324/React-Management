import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }

    handleFormSubmit = (e) =>{
        e.preventDefault() //데이터가 서버로 전달함에 있어서 오류가 나지 않도록 하는 함수
        this.addCustomer()
            .then((response)=>{
                console.log(response.data);
            })

            this.setState({
                file: null,
                userName: '',
                birthday: '',
                gender: '',
                job: '',
                fileName: ''
            })
            window.location.reload();
    }

    handleFileChange = (e) => {
        this.setState({
            //e.target 그 이벤트가 발생한 input 그 자체를 의미함
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) =>{
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () =>{
        const url ='/api/customers';
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthdaty);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'    //multipart/form-date는 전달 하는 데이터에 파일이 있을 경우 설정해야 함
            }
        }
        return post(url,formData,config);
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} />
                생년월일: <input type="text" name="birthday" value={this.state.birthdaty} onChange={this.handleValueChange} />
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} />
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;