import React, { Component } from 'react';
import './App.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { userAuth, logout, isLoggedIn } from './config/firebase';
// import Navbar from './components/Navbar';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';
import Dashboard from './screens/Dashboard';

class App extends Component {
  user;
  isLoggedIn = isLoggedIn;

  constructor() {
    super();


    console.log('userAuth', userAuth());
    this.state = {
      user: null
    }

    this.registerModal = this.registerModal.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }


  login() {
    this.refs.loginChild.toggleLogin();
  }

  logout() {
    logout();
  }

  registerModal() {
    this.refs.registerChild.toggle();
  }

  componentDidMount() {
    userAuth().onAuthStateChanged(user => {
      console.log('outh change', user)
      if (user) {
        console.log('user logged', user);
        this.setState({ user : isLoggedIn() });
      } else {
        this.setState({ user });
        console.log('logedout user')
      }
    });
  }


  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <div>
          <Nav className="navbar-dark">
            <NavItem>
              <NavLink href="" >OLX</NavLink>
            </NavItem>
            {user === null && <NavItem>
              <NavLink href="#" onClick={this.registerModal}>Register</NavLink>
            </NavItem>}
            {user === null && <NavItem>
              <NavLink href="#" onClick={this.login}>Login</NavLink>
            </NavItem>}
            <NavItem>
              <NavLink href="#" onClick={this.logout}>Logout</NavLink>
            </NavItem>

            <RegisterModal ref="registerChild" registerModal={this.SignUpModal} />
            <LoginModal ref="loginChild" logInModal={this.loginModal} />
          </Nav>

          {user !==null && <Dashboard />}
        </div>
      </div>
    );
  }
}

export default App;
