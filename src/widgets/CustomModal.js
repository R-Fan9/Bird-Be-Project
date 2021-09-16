import { Component } from "react";
import { Modal, Button } from 'react-bootstrap';

export class CustomModal extends Component{

    render(){
        const { title, content, show, type } = this.props
        return(
            <Modal show={show} onHide={() => this.props.closeCallBack(type)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                        <Modal.Body className="d-flex justify-content-center">
                            {content}
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.props.closeCallBack(type)}>
                            Close
                        </Button>
                    </Modal.Footer>
            </Modal>
        )
    }
}