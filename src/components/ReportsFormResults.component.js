import React from 'react';
import Table from 'react-bootstrap/Table';
import moment from "moment";


function ReceiptList (props){
  //console.log(props);
  //console.log(props.data.length);
  let components = [];
  for(let i = 0; i < props.data.length; i++){
    components.push(
        <Receipt
          data={props.data[i]}
          key ={"receiptRow_"+i}
          />
    );
    //console.log("push");
  }
  //console.log(components);
  return components;

};

function Receipt (props){
  //console.log(props);
  return (
    <tr>
      <th>{props.data.receipt_number}</th>
      <th>{moment(props.data.date).format('D/MM/YYYY')}</th>
      <th>${props.data.amount}</th>
      <th>{props.data.description}</th>
      <th>{props.data.description_code}</th>
      <th>{props.data.customer_name}</th>
      <th>{props.data.customer_registration_number}</th>
      <th>{props.data.issuer}</th>
    </tr>
  );
};


function ReportsFormResults ({reportData, visible}){

  if (visible && reportData.mode === "RECEIPTS"){
    return (
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>No de Recibo</th>
            <th>Fecha</th>
            <th>Cantidad</th>
            <th>Descripción</th>
            <th>Código</th>
            <th>Cliente/Alumno</th>
            <th>Matrícula</th>
            <th>Emisor</th>
          </tr>
        </thead>
        <tbody>
          <ReceiptList data = {reportData.data} />
        </tbody>
      </Table>
    );
  }else if(visible && reportData.mode === "STUDENTS"){
    return (<div></div>);
  }else{
    return (<div></div>);
  }
  
  }
  
  export default ReportsFormResults;