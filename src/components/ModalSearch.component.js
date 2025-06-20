import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';

function SearchItemsList (props){
  const submitFormDataWrapped = (values, formikBag) => {
    props.submitFormData (values, formikBag);
  }
  let components = [];
  for(let i = 0; i < props.data.length; i++){
      components.push(
          <SearchItem
              key={`SearchItem_${i+1}`}
              id={i+1}
              text = {props.data[i].registration_number + " " +props.data[i].names + " " + props.data[i].last_names}
              customer = {props.data[i].registration_number}
              submitFormData = {submitFormDataWrapped}
              purpose = {props.data[i].purpose}
          />
      );
  }
  return components;
}

function SearchItem (props){
  let text = props.text;
  const basePrefilledValues = {
    parameter: props.customer,
    search: "registration_number",
    purpose: props.purpose,
};

const submitFormDataWrapped = (values, formikBag) => {
  props.submitFormData (values, formikBag);
}

  return (
          <Formik
                onSubmit={submitFormDataWrapped}
                initialValues={basePrefilledValues}
              >
                {(props) => (
              <Form noValidate onSubmit={props.handleSubmit}>
                <ListGroup.Item action type="submit" name="submit" >
              {text}
              </ListGroup.Item>
              </Form>
            )}
          </Formik>
  );
}

function ModalSearch (props) { 
    const handleClose = () => {
        props.handleClose();
    };
    const submitFormDataWrapped = (values, formikBag) => {
      props.submitFormData (values, formikBag);
      handleClose();
    }

    return (
        <Modal
        show={props.modalSearch.isVisible}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Selecciona</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ListGroup>
          <SearchItemsList data={props.modalSearch.data} submitFormData = {submitFormDataWrapped} />
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ModalSearch;