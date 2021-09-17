import { Modal, Button } from 'react-bootstrap';

export const CustomModal = ({ title, content, show, closeCallBack, type, align }) =>{
    return(
        <Modal centered show={show} onHide={() => closeCallBack(type)}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                    <Modal.Body className={align}>
                        {content}
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeCallBack(type)}>
                        Close
                    </Button>
                </Modal.Footer>
        </Modal>
    )
}