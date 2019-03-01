import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import React, { Component } from 'react';
import { register } from '../config/firebase';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class RegisterModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            backdrop: false,
            email: '',
            name: '',
            password: '',
        };

        this.toggle = this.toggle.bind(this);
        this.signUp = this.signUp.bind(this);
        this.addEmail = this.addEmail.bind(this);
        this.addName = this.addName.bind(this);
        this.addPassword = this.addPassword.bind(this);

        console.log('this.props', this.props);
    }

    addEmail(e) {
        this.setState({ email: e.target.value });
    }

    addName(e) {
        this.setState({ name: e.target.value });
    }
    addPassword(e) {
        this.setState({ password: e.target.value });
    }


    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    signUp(e) {
        e.preventDefault();
        register(this.state.email, this.state.password, this.state.name)
        .then(data => {
          console.log('account create');
          this.toggle();
        }).catch(err=>{
            console.log('signup error', err);
        })
    }
    render() {
        return (
            <div>
                {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
                <Modal backdrop={this.state.backdrop} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} charCode="Y">Signup</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label for="fullname" sm={2}>Full Name</Label>
                                <Col sm={10}>
                                    <Input type="text" name="fullname" id="fullname" placeholder="Full Name" onChange={this.addName}/>
                                </Col>
                            </FormGroup>
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
                                    <Button onClick={this.signUp}>Submit</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default RegisterModal;
