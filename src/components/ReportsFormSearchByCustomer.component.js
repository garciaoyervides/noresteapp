import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik } from 'formik';
import * as yup from 'yup';

const baseSchemaName = {
  parameter: yup.string().max(100),
  search: yup.string(),
};
const baseSchemaRegistrationNumber = {
  parameter: yup.string().max(50),
  search: yup.string(),
};
const basePrefilledValuesName = {
  parameter: "",
  search: "name",
  approximate: false,
};
const basePrefilledValuesRegistrationNumber = {
  parameter: "",
  search: "registration_number",
  approximate: false,
};

function CustomersFormSearchByCustomer ({submitFormData, visible}){

  const submitFormDataWrapped = (values, formikBag) => {
      submitFormData (values, formikBag);
  }
  if (visible){
    return (
      <div>
      <h2>Reporte por Alumno/Cliente</h2>
      <Formik
        validationSchema={yup.object(baseSchemaName)}
        onSubmit={submitFormDataWrapped}
        initialValues={basePrefilledValuesName}
      >
        {(props) => (
      <Form noValidate onSubmit={props.handleSubmit} onBlur={props.handleBlur}>
      <Form.Row>
      <InputGroup className="mb-3">
            <Form.Control
            placeholder="Nombre"
            name="parameter"
            value={props.values.parameter}
            onChange={props.handleChange}
            isInvalid={!!props.errors.parameter}
            />
            <Form.Control.Feedback type="invalid">
              Valor inválido
            </Form.Control.Feedback>
            <InputGroup.Append>
            <Button variant="outline-secondary" type="submit" name="submit">Buscar</Button>
            </InputGroup.Append>
        </InputGroup>
        <Form.Check
        type="checkbox"
        label="Búsqueda Aproximada"
        name ="approximate"
        id="approximate_name"
        value={props.values.approximate}
        onChange={props.handleChange}
      />
      </Form.Row>
      </Form>
      )}
      </Formik>
      <br></br>
      <Formik
      validationSchema={yup.object(baseSchemaRegistrationNumber)}
      onSubmit={submitFormDataWrapped}
      initialValues={basePrefilledValuesRegistrationNumber}
    >
      {(props) => (
    <Form noValidate onSubmit={props.handleSubmit} onBlur={props.handleBlur}>
    <Form.Row>
    <InputGroup className="mb-3">
          <Form.Control
          placeholder="Matrícula"
          name="parameter"
            value={props.values.parameter}
            onChange={props.handleChange}
            isInvalid={!!props.errors.parameter}
          />
          <Form.Control.Feedback type="invalid">
              Valor inválido
            </Form.Control.Feedback>
          <InputGroup.Append>
          <Button variant="outline-secondary" type="submit" name="submit">Buscar</Button>
          </InputGroup.Append>
      </InputGroup>
      <Form.Check
        type="checkbox"
        label="Búsqueda Aproximada"
        name ="approximate"
        id="approximate_registration_number"
        value={props.values.approximate}
        onChange={props.handleChange}
      />
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
  
  export default CustomersFormSearchByCustomer;