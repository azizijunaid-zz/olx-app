import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import React, { Component } from 'react';
import { login, facebookLogin } from '../config/firebase';


class LoginModal extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            backdrop: false,
            email: '',
            password: ''
        };

        this.toggleLogin = this.toggleLogin.bind(this);
        this.addEmail = this.addEmail.bind(this);
        this.addPassword = this.addPassword.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.fblogin = this.fblogin.bind(this);
    }

    addEmail(e) {
        this.setState({ email: e.target.value });
    }

    addPassword(e) {
        this.setState({ password: e.target.value });
    }
    
    toggleLogin() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    loginUser(e) {
        e.preventDefault();
        login(this.state.email, this.state.password).then(user=>{
            this.toggleLogin();  
        });
    }

    fblogin(){
        facebookLogin()
        .then((response)=>{
            this.user = response;
            this.toggleLogin();  
        })
        .catch( err => {
            this.toggleLogin();  
            console.log(err)
        });
    }
    render() {
        console.log("state", this.state)
        return (
            <div>
                {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
                <Modal backdrop={this.state.backdrop} isOpen={this.state.modal} toggle={this.toggleLogin}>
                    <ModalHeader toggle={this.toggle} charCode="Y">SignIn</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label for="email" sm={2}>Email</Label>
                                <Col sm={10}>
                                    <Input type="email" name="email" id="email" placeholder="Email" onChange={this.addEmail}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="password" sm={2}>Password</Label>
                                <Col sm={10}>
                                    <Input type="password" name="password" id="password" placeholder="Password" onChange={this.addPassword}/>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col sm={{ size: 10, offset: 5 }}>
                                    <Button onClick={this.loginUser}>Login</Button>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={{ size: 10, offset: 5 }}>
                                    <Button onClick={this.fblogin}>login with facebook</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default LoginModal;
