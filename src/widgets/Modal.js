import { Component } from "react";
import { Modal, Button } from 'react-bootstrap';

export class CustomModal extends Component{

    render(){
        const { title, content, show, closeCallback} = this.props
        return(
            <Modal show={show} onHide={closeCallback}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                        <Modal.Body className="d-flex justify-content-center">
                            {content}
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeCallback}>
                            Close
                        </Button>
                    </Modal.Footer>
            </Modal>
        )
    }
}