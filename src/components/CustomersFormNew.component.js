import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import * as yup from 'yup';

const baseSchema = {
  names: yup.string().max(100).required(),
  last_names: yup.string().max(100).required(),
  registration_number: yup.string().max(50).required(),
  email: yup.string().email().max(100),
  notes: yup.string().max(100),
};
const basePrefilledValues = {
  names: "",
  last_names: "",
  registration_number: "",
  email: "",
  notes: "",
};

function CustomersFormNew ({submitFormData, visible}){

  const submitFormDataWrapped = (values, formikBag) => {
      submitFormData (values, formikBag);
  }
  if (visible){
    return (
      <Formik
        validationSchema={yup.object(baseSchema)}
        onSubmit={submitFormDataWrapped}
        initialValues={basePrefilledValues}
      >
        {(props) => (
      <Form noValidate onSubmit={props.handleSubmit} onBlur={props.handleBlur}>
      <h2>Nuevo Alumno/Cliente</h2>
      <Form.Row>
        <Col>
          <Form.Group controlId="clientsForm.registration_number">
            <Form.Label>Matrícula</Form.Label>
            <Form.Control
            required
            type="text"
            placeholder=""
            name="registration_number"
            value={props.values.registration_number}
            onChange={props.handleChange}
            onBlur={(e) => {
              props.handleBlur(e);
              props.values.registration_number = props.values.registration_number.toUpperCase();
            }}
            isInvalid={!!props.errors.registration_number}
            />
            <Form.Control.Feedback type="invalid">
              Valor inválido
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <Form.Group controlId="clientsForm.names">
            <Form.Label>Nombre(s)</Form.Label>
            <Form.Control
            required
            type="text"
            placeholder=""
            name="names"
            value={props.values.names}
            onChange={props.handleChange}
            isInvalid={!!props.errors.names}
            />
            <Form.Control.Feedback type="invalid">
              Valor inválido
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group controlId="clientsForm.last_names">
            <Form.Label>Apellido(s)</Form.Label>
            <Form.Control
            required
            type="text"
            name="last_names"
            placeholder=""
            value={props.values.last_names}
            onChange={props.handleChange}
            isInvalid={!!props.errors.last_names}
            />
            <Form.Control.Feedback type="invalid">
              Valor inválido
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <Form.Group controlId="clientsForm.email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
            type="email"
            name="email"
            placeholder=""
            value={props.values.email}
            onChange={props.handleChange}
            isInvalid={!!props.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              Valor inválido
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>

          <Form.Group controlId="clientsForm.notes">
            <Form.Label>Notas</Form.Label>
            <Form.Control
            as="textarea"
            rows={2}
            name="notes"
            placeholder=""
            value={props.values.notes}
            onChange={props.handleChange}
            isInvalid={!!props.errors.notes}
            />
            <Form.Control.Feedback type="invalid">
              Valor inválido
            </Form.Control.Feedback>
          </Form.Group>

      <Button variant="primary" type="submit" name="submit">
        Enviar
      </Button>
    </Form>
    )}
    </Formik>
    );
  } else{
    return (<div></div>);
  }
  
  }
  
  export default CustomersFormNew;