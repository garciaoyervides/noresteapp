import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik } from 'formik';
import * as yup from 'yup';

const baseSchema = {
  parameter: yup.number().required().positive().integer(),
  search: yup.string(),
};

const basePrefilledValues = {
  parameter: "",
  search: "receipt_number"
};

function ReceiptsFormSearch ({submitFormData, visible}){

  const submitFormDataWrapped = (values, formikBag) => {
      submitFormData (values, formikBag);
  }
  if (visible){
    return (
      <div>
      <h2>Buscar Recibo</h2>
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
            placeholder="No. de Recibo"
            name="parameter"
            value={props.values.parameter}
            onChange={props.handleChange}
            isInvalid={!!props.errors.parameter}
            />
            
            <InputGroup.Append>
            <Button variant="outline-secondary" type="submit" name="submit">Buscar</Button>
            </InputGroup.Append>
            <Form.Control.Feedback type="invalid">
              Valor inválido
            </Form.Control.Feedback>
        </InputGroup>
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
  
  export default ReceiptsFormSearch;