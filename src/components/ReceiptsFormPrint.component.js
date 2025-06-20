import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';

function ReceiptsFormPrint ({submitFormData, initialData, visible}){

  const submitFormDataWrapped = (values, formikBag) => {
      submitFormData (values, formikBag);
  }

  if (visible){
    return (
        <Formik
          onSubmit={submitFormDataWrapped}
          initialValues={initialData}
        >
          {(props) => (
        <Form noValidate onSubmit={props.handleSubmit} onBlur={props.handleBlur}>
        <h2>Imprimir Recibo</h2>
        <Form.Row>
          <Col>
            <Form.Group controlId="receiptForm.receipt_number">
                <Form.Label>No. de Recibo</Form.Label>
                <Form.Control
                required
                disabled
                type="text"
                name="receipt_number"
                placeholder=""
                value={props.values.receipt_number}
                />
                <Form.Control.Feedback type="invalid">
                    Valor inválido
                </Form.Control.Feedback>
            </Form.Group>
        </Col>
          <Col>
            <Form.Group controlId="receiptForm.date">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
              required
              disabled
              type="text"
              name="date"
              placeholder=""
              value={props.values.date}
              onChange={props.handleChange}
              isInvalid={!!props.errors.date}
              />
              <Form.Control.Feedback type="invalid">
                Fecha inválida
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group controlId="titleForm.amount">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
              type="number"
              name="amount"
              placeholder=""
              disabled
              value={props.values.amount}
              onChange={props.handleChange}
              isInvalid={!!props.errors.amount}
              />
              <Form.Control.Feedback type="invalid">
                Valor inválido
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={8}>
            <Form.Group controlId="titleForm.amount_text">
              <Form.Label>(Letra)</Form.Label>
              <Form.Control
              type="text"
              placeholder=""
              name="amount_text"
              value={props.values.amount_text}
              disabled
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group controlId="titleForm.customer_registration_number">
              <Form.Label>Matrícula</Form.Label>
              <Form.Control
              type="text"
              name="customer_registration_number"
              placeholder=""
              value={props.values.customer_registration_number}
              onChange={props.handleChange}
              isInvalid={!!props.errors.customer_registration_number}
              disabled
              />
              <Form.Control.Feedback type="invalid">
                Valor inválido
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={8}>
          <Form.Label>Cliente/Estudiante</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                disabled
                type="text"
                name="customer_name"
                placeholder=""
                value={props.values.customer_name}
                onChange={props.handleChange}
                isInvalid={!!props.errors.customer_name}
              />
              <Form.Control.Feedback type="invalid">
                Valor inválido
              </Form.Control.Feedback>
            </InputGroup>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
          <Form.Group controlId="titleForm.description_code">
            <Form.Label>Código</Form.Label>
            <Form.Control
            disabled
            type="text"
            name="description_code"
            placeholder=""
            value={props.values.description_code}
            onChange={props.handleChange}
            isInvalid={!!props.errors.description_code}
            />
            <Form.Control.Feedback type="invalid">
              Valor inválido
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
          <Col xs={8}>
          <Form.Group controlId="titleForm.description">
            <Form.Label>Concepto</Form.Label>
            <Form.Control
            disabled
            type="text"
            name="description"
            placeholder=""
            value={props.values.description}
            onChange={props.handleChange}
            isInvalid={!!props.errors.description}
            />
            <Form.Control.Feedback type="invalid">
              Valor inválido
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col xs={4}>
            <Form.Group controlId="titleForm.issuer">
              <Form.Label>Emisor</Form.Label>
              <Form.Control
              type="text"
              name="issuer"
              placeholder=""
              value={props.values.issuer}
              onChange={props.handleChange}
              isInvalid={!!props.errors.issuer}
              disabled
              />
              <Form.Control.Feedback type="invalid">
                Valor inválido
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Form.Row>
        <Button variant="primary" type="submit" name="submit">
          Imprimir
        </Button>
      </Form>
      )}
      </Formik>
      );
    } else{
      return (<div></div>);
    }
  }
  
  export default ReceiptsFormPrint;