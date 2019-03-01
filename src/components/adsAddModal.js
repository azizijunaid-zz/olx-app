import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
export default class adsAddModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            backdrop: false,
            title: '',
            desc: '',
            price: 0,
        }
        this.addTitle = this.addTitle.bind(this);
        this.addDesc = this.addDesc.bind(this);
        this.addPrice = this.addPrice.bind(this);
        this.toggleAdsAdd = this.toggleAdsAdd.bind(this);
    }

    addTitle(e) {
        this.setState({ title: e.target.value });
    }

    addDesc(e) {
        this.setState({ desc: e.target.value });
    }

    addPrice(e) {
        this.setState({ price: e.target.value });
    }

    addCategory(e) {
        this.setState({ category: e.target.value });
    }

    toggleAdsAdd() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    render() {
        return (
            <div>
                <Modal backdrop={this.state.backdrop} isOpen={this.state.modal} toggle={this.toggleAdsAdd} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} charCode="Y">Add Ad</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label for="title" sm={2}>Title</Label>
                                <Col sm={10}>
                                    <Input type="text" name="title" id="title" placeholder="Title" onChange={this.addTitle} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="desc" sm={2}>Description</Label>
                                <Col sm={10}>
                                    <Input type="text" name="desc" id="desc" placeholder="Description" onChange={this.addDesc} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="price" sm={2}>Price</Label>
                                <Col sm={10}>
                                    <Input type="number" name="price" id="password" placeholder="Price" onChange={this.addPrice} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="category" sm={2}>Category</Label>
                                <Col sm={10}>
                                    <Input type="text" name="category" id="category" placeholder="Category" onChange={this.addCategory} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="exampleFile" sm={2}>File</Label>
                                <Col sm={10}>
                                    <Input type="file" name="file" id="exampleFile" />
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
