import React, { Component } from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})



/* React 라이프 사이클

1)constructor()

2)componentWillMount()

3)render()

4)componentDidMount()
*/



/*

props or state 변경 => shouldComponentUpdate()

*/


class App extends Component {

  state = {
    customers: "",
    completed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  //비동기적으로 작업
  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.customers ? this.state.customers.map(c => {
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
              }) :
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}></CircularProgress>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd />
      </div>
    )
  }
}

export default withStyles(styles)(App);