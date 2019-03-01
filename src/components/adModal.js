import React, { Component } from 'react'

export default class adModal extends Component {
    constructor(){
        super(props);
        this.state = {
            modal: false,
            backdrop: false,
            email: '',
            name: '',
            password: '',
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

  render() {
    return (
      <div>
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
    )
  }
}
