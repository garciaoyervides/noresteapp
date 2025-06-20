import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik } from 'formik';
import * as yup from 'yup';
import moment from "moment";

const baseSchema = {
  from: yup.date().required(),
  to: yup.date().required(),
};
const basePrefilledValues = {
  from: moment(Date.now()).format('YYYY-MM-D'),
  to: moment(Date.now()).format('YYYY-MM-D'),
};

function ReportsFormSearchByDate ({submitFormData, visible}){

  const submitFormDataWrapped = (values, formikBag) => {
      submitFormData (values, formikBag);
  }
  if (visible){
    return (
      <div>
      <h2>Reporte por Fecha</h2>
      <Formik
      validationSchema={yup.object(baseSchema)}
      onSubmit={submitFormDataWrapped}
      initialValues={basePrefilledValues}
    >
      {(props) => (
    <Form noValidate onSubmit={props.handleSubmit} onBlur={props.handleBlur}>
    <Form.Row>
    <InputGroup className="mb-3">
        <Form.Control
        required
        type="date"
        name="from"
        placeholder=""
        value={props.values.from}
        onChange={props.handleChange}
        isInvalid={!!props.errors.from}
        />
        <Form.Control.Feedback type="invalid">
          Fecha inválida
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Row>
    <Form.Row>
    <InputGroup className="mb-3">
        <Form.Control
        required
        type="date"
        name="to"
        placeholder=""
        value={props.values.to}
        onChange={props.handleChange}
        isInvalid={!!props.errors.to}
        />
        <Form.Control.Feedback type="invalid">
          Fecha inválida
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Row>
    <Button variant="outline-secondary" type="submit" name="submit">Buscar</Button>
    <Form.Row>

    </Form.Row>
    </Form>
    )}
    </Formik>
    </div>
    );
  } else{
    return (<div></div>);
  }
  
  }
  
  export default ReportsFormSearchByDate;