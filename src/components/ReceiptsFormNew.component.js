import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import * as yup from 'yup';
import NumbersToText from '../utils/NumbersToText.js';
import moment from "moment";

const baseSchema = {
  receipt_number: yup.string(),
  amount: yup.number().test(
    'is-decimal',
    'invalid decimal',
    value => (value + "").match(/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/),
  ),
  amount_text: yup.string(),
  date: yup.date().required(),
  customer_registration_number: yup.string(),
  customer_name: yup.string().required(),
  description: yup.string().required(),
  description_code: yup.string().required(),
};
const basePrefilledValues = {
  receipt_number:"",
  amount: "",
  amount_text: "",
  date: moment(Date.now()).format('YYYY-MM-D'),
  customer_registration_number: "",
  customer_name: "",
  description: "",
  description_code: "Colegiatura"
};

function ReceiptsFormNew ({submitFormData, searchCustomers, values, visible}){

  const submitFormDataWrapped = (values, formikBag) => {
      submitFormData (values, formikBag);
  }
  const searchCustomersWrapped = (val) => {
    searchCustomers (val);
  }

  if (visible){
    return (
        <Formik
          validationSchema={yup.object(baseSchema)}
          onSubmit={submitFormDataWrapped}
          initialValues={basePrefilledValues}
        >
          {(props) => (
        //<Form noValidate onSubmit={props.handleSubmit} onBlur={props.handleBlur}>
        <Form noValidate onSubmit={props.handleSubmit} onBlur={(e) => {
          props.handleBlur(e);
          if (values.customer_name){
            props.values.customer_name = values.customer_name;
            values.customer_name = "";
          }
          if (values.customer_registration_number){
            props.values.customer_registration_number = values.customer_registration_number;
            values.customer_registration_number = "";
          }
        }
        }>
        <h2>Nuevo Recibo</h2>
        <Form.Row>
          <Col>
            <Form.Group controlId="receiptForm.receipt_number">
              <Form.Label>No. de Recibo</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={props.values.receipt_number}
                onChange={props.handleChange}
                name="receipt_number"
                disabled
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="receiptForm.date">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
              required
              disabled
              type="date"
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
              value={props.values.amount}
              onChange={props.handleChange}
              onBlur={(e) => {
                props.handleBlur(e);
                props.values.amount_text = NumbersToText(props.values.amount.toString());
              }
              }
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
              //value={numbersToText(props.values.amount.toString())}
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
                type="text"
                name="customer_name"
                placeholder=""
                value={props.values.customer_name}
                onChange={props.handleChange}
                isInvalid={!!props.errors.customer_name}
              />
              
              <InputGroup.Append>
                <Button variant="outline-secondary" name="searchButton" onClick={()=>{searchCustomersWrapped(props.values.customer_name);}}>Buscar</Button>
              </InputGroup.Append>
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
            required
            as="select"
            name="description_code"
            placeholder=""
            value={props.values.description_code}
            onChange={props.handleChange}
            isInvalid={!!props.errors.description_code}
            >
              <option>Colegiatura</option>
              <option>Inscripción</option>
              <option>Otro</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Valor inválido
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
          <Col xs={8}>
          <Form.Group controlId="titleForm.description">
            <Form.Label>Concepto</Form.Label>
            <Form.Control
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
        <Button variant="primary" type="submit" name="submit">
          Crear
        </Button>
      </Form>
      )}
      </Formik>
      );
    } else{
      return (<div></div>);
    }
  }
  
  export default ReceiptsFormNew;