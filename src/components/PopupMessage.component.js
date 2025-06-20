import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function PopupMessage (props) {
    // Grab values and submitForm from context
    const handleClose = () => {
        props.handleClose();
    };
    return (
        <Modal
        show={props.popupMessage.isVisible}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.popupMessage.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {props.popupMessage.body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default PopupMessage;