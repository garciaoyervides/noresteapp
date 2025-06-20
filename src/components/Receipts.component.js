import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import MenuBar from './MenuBar.component.js';
import ReceiptsFormNew from './ReceiptsFormNew.component.js';
import ReceiptsFormPrint from './ReceiptsFormPrint.component.js';
import ReceiptsFormEdit from './ReceiptsFormEdit.component.js';
import ReceiptsFormSearch from './ReceiptsFormSearch.component.js';
import PopupMessage from './PopupMessage.component.js';
import ModalSearch from './ModalSearch.component.js';
import NotAuthenticated from './NotAuthenticated.component.js';
import IsLoading from './IsLoading.component.js';
import axios from 'axios';
import {useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import NumbersToText from '../utils/NumbersToText.js';
import {jsPDF} from 'jspdf';
import logo from '../receipt_logo.png'
import QRCode from 'qrcode';
import Config from '../config/Config.js';
import dotenv from 'dotenv';

function Receipts (){

    dotenv.config();

    const { user, getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

    let [viewState, setViewState] = useState("");
    let [popupMessage, setPopupMessage] = useState({
        isVisible: false,
        title: '',
        body: ''
    });
    let [modalSearch, setModalSearch] = useState({
        isVisible: false,
        data: ''
    });
    let [receiptsFormNewValues, setReceiptsFormNewValues] = useState({
        customer_name: "",
        customer_registration_number:"",
    });
    let [receiptsFormEditInitialValues, setReceiptsFormEditInitialValues] = useState({
        receipt_number: "",
        date: "",
        amount: "",
        customer_name: "",
        description: "",
        description_code: "",
        issuer: "",
        customer_registration_number: "",
    });
    let [receiptsFormPrintInitialValues, setReceiptsFormPrintInitialValues] = useState({
        receipt_number: "",
        date: "",
        amount: "",
        customer_name: "",
        description: "",
        description_code: "",
        issuer: "",
        customer_registration_number: "",
    });

    const isFormVisible = (form) => {
        if(viewState===form)return true;
        return false;
    };
    const getViewState = () => {
        switch(viewState){
            case "ADD_NEW":
                return "Nuevo";
            case "SEARCH_EDIT":
                return "Editar";
            case "SEARCH_PRINT":
                return "Imprimir";
            case "EDIT":
                return "Editar";
            case "PRINT":
                return "Imprimir";
            default:
                return "";
        }
    };
    
    const showPopupMessage = (title, body) => {
        if (!popupMessage.isVisible){
            setPopupMessage({
                isVisible: true,
                title: title,
                body: body
            });
        }
    };
    const hidePopupMessage = () => {
        if (popupMessage.isVisible){
            setPopupMessage({
                isVisible: false,
                title: '',
                body: ''
            });
        }
    };
    const showModalSearch = (res) => {
        if (!modalSearch.isVisible){
            setModalSearch({
                isVisible: true,
                data: res
            });
        }
    };
    const hideModalSearch = () => {
        if (modalSearch.isVisible){
            setModalSearch({
                isVisible: false,
                data:""
            });
        }
    };

    const showOutcome = (message) => {
        showPopupMessage(message.title, message.body);
    };

    const submitReceiptsFormPrintData = async (values, formikBag) => {
        let lineHeight = 1.5;
        let leftMargin = 0.5;
        let upperMargin = 0.5;
        let lineSize = 0.3;
        let paperWidth = 7.21;
        let horizontalCenter = paperWidth/2;
        let logoSize = 3;
        let logoCenter = (paperWidth/2)-(logoSize/2);
        let qrSize = 3;
        let qrCenter = (paperWidth/2)-(qrSize/2);

        let logoImage = new Image();
        logoImage.src = logo;

        const doc = new jsPDF({
            orientation: "vertical",
            unit: "cm",
            format: [paperWidth, 20]
          });
        doc.setFontSize(9);
        
        doc.addImage(logoImage, "PNG", logoCenter, 0.5, logoSize, logoSize,"","NONE",0);
        let yPos = upperMargin + logoSize + (lineSize*2) ;
        let text = [];
        let options = {
            align: "center",
            maxWidth: paperWidth - (leftMargin*2),
            lineHeightFactor: lineHeight,
        };
        text.push("Instituto Internacional");
        text.push("de Estudios Avanzados de Monterrey, A.C");
        text.push("Av. Benito Juárez #107, Col. Las Encinas");
        text.push("Gral. Escobedo, N.L. C.P. 66050");
        text.push("RFC: IIE100213KI8");
        text.push("");
        text.push("RECIBO DE PAGO");
        doc.text(text, horizontalCenter, yPos,options);
        text = [];
        options = {
            align: "left",
            maxWidth: paperWidth - (leftMargin*2),
            lineHeightFactor: lineHeight,
        };
        yPos += 3.5;
        text.push("ID: " + values.receipt_number);
        text.push("Fecha: " + values.date);
        text.push("Recibí de: " + values.customer_name);
        text.push("Concepto: " + values.description);
        text.push("Monto: $" + values.amount + " M.N.");
        text.push("(" + values.amount_text + ")");
        doc.text(text, leftMargin, yPos,options);
        yPos = 12;
    
        QRCode.toCanvas(values.receipt_number+" "+values.date+" $"+values.amount+" "+values.customer_registration_number+
                        "|"+user.sub+" "+moment(Date.now()).format('D/MM/YYYY h:mm:ss a'),
                         { errorCorrectionLevel: 'M' }, function (err, canvas) {
            if (err) throw err
            doc.addImage(canvas, "JPG", qrCenter, yPos, qrSize, qrSize);
        });
        yPos = 18;
        doc.setLineWidth(.1);
        doc.line(leftMargin, yPos, paperWidth-leftMargin, yPos, "S");
        yPos = 18.5;
        text = [];
        options = {
            align: "center",
            maxWidth: 70,
            lineHeightFactor: lineHeight,
        };
        text.push("Nombre y firma de quien recibe");
        doc.text(text, horizontalCenter, yPos,options);
        doc.autoPrint({variant: 'non-conform'});
        doc.save("receipt_" + values.receipt_number + ".pdf");
        
    }

    const submitModalSearchFormData = async (values, formikBag) => {
        //console.log(values);
        if (values.purpose === "FILLOUT_NAME"){
            const accessToken = await getAccessTokenSilently();
            let params = new URLSearchParams(values).toString()
            //console.log(params);
            axios({
                method: "get",
                url: process.env.BACKEND_URL + "/customers?" + params,
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(res => {
                //console.log(res.data[0]);
                setReceiptsFormNewValues({
                    customer_name: res.data[0].names + " " + res.data[0].last_names,
                    customer_registration_number: res.data[0].registration_number,
                });
            })
            .catch(err => {
                //if (err.message)console.log(err.message);
                //if (err.request)console.log(err.request);
                if (err.response){
                    //console.log(err.response.data);
                    showOutcome({
                        title:"Error",
                        body: err.response.data,
                    });
                } else if(err.message){
                    showOutcome({
                        title:"Error",
                        body: err.message,
                    });
                }
            });
        }
        
    }

    const submitReceiptsFormEditData = async (values, formikBag) => {
        //console.log(values);
        const accessToken = await getAccessTokenSilently();
        if (values.mode === "EDIT"){
            axios({
                method: "post",
                url: process.env.BACKEND_URL + "/receipts/edit",
                data: values,
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(res => {
                showOutcome({
                    title:"Resupesta",
                    body: res.data,
                });
            })
            .catch(err => {
                //if (err.message)console.log(err.message);
                //if (err.request)console.log(err.request);
                if (err.response){
                    //console.log(err.response.data);
                    showOutcome({
                        title:"Error",
                        body: err.response.data,
                    });
                } else if(err.message){
                    showOutcome({
                        title:"Error",
                        body: err.message,
                    });
                }
            });
        } else if (values.mode === "DELETE"){
            axios({
                method: "post",
                url: process.env.BACKEND_URL + "/receipts/delete",
                data: values,
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(res => {
                showOutcome({
                    title:"Resupesta",
                    body: res.data,
                });
            })
            .catch(err => {
                //if (err.message)console.log(err.message);
                //if (err.request)console.log(err.request);
                if (err.response){
                    //console.log(err.response.data);
                    showOutcome({
                        title:"Error",
                        body: err.response.data,
                    });
                } else if(err.message){
                    showOutcome({
                        title:"Error",
                        body: err.message,
                    });
                }
            })
            .then(() => {
                setViewState("SEARCH_EDIT")
            });
        }
    };

    const submitreceiptsFormNewData = async (values, formikBag) => {
        values.issuer = user.name;
        //console.log(values);
        const accessToken = await getAccessTokenSilently();
        let receiptId="";
        axios({
            method: "post",
            url: process.env.BACKEND_URL + "/Receipts/add",
            data: values,
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => {
            showOutcome({
                title:"Resupesta",
                body: res.data,
            });
            receiptId = res.data.match(/(\d+)/)[0];
            //console.log(receiptId);
            let query = {
                parameter: receiptId,
                search: "receipt_number",
            }
            submitReceiptsFormSearchData(query);
        })
        .catch(err => {
            //if (err.message)console.log(err.message);
            //if (err.request)console.log(err.request);
            if (err.response){
                //console.log(err.response.data);
                showOutcome({
                    title:"Error",
                    body: err.response.data,
                });
            } else if(err.message){
                showOutcome({
                    title:"Error",
                    body: err.message,
                });
            }
        })
    };

    const submitReceiptsFormSearchData = async (values, formikBag) => {
        //console.log(values);
        const accessToken = await getAccessTokenSilently();
        let params = new URLSearchParams(values).toString()
        //console.log(params);
        axios({
            method: "get",
            url: process.env.BACKEND_URL + "/receipts?" + params,
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => {
            if(res.data[0]){
                //console.log(res.data[0]);
                let receiptData = res.data[0];
                
                receiptData.amount_text = NumbersToText(receiptData.amount);
                for (let [key, value] of Object.entries(receiptData)) {
                    if (!value)receiptData[key]= "";
                }
                if (isFormVisible("SEARCH_PRINT") || isFormVisible("ADD_NEW")){
                    let date = new Date(receiptData.date);
                    date = moment(date).format('D/MM/YYYY');
                    receiptData.date = date;

                    setReceiptsFormPrintInitialValues(receiptData);
                    setViewState("PRINT");
                } else if (isFormVisible("SEARCH_EDIT")){
                    let date = new Date(receiptData.date);
                    date = moment(date).format('YYYY-MM-D');
                    receiptData.date = date;
                    //console.log(receiptData);
                    setReceiptsFormEditInitialValues(receiptData);
                    setViewState("EDIT");
                }
                
            } else{
                showOutcome({
                    title:"Error",
                    body: "Recibo no encontrado.",
                });
            }
            
        })
        .catch(err => {
            if (err.message)console.log(err.message);
            if (err.request)console.log(err.request);
            if (err.response){
                //console.log(err.response.data);
                showOutcome({
                    title:"Error",
                    body: err.response.data,
                });
            } else if(err.message){
                showOutcome({
                    title:"Error",
                    body: err.message,
                });
            }
        });
    };

    const searchCustomers = async (val) => {
        const accessToken = await getAccessTokenSilently();
        const query = {
            search: "name",
            parameter: val,
            //purpose: "FILLOUT_NAME",
        };
        const params = new URLSearchParams(query).toString()
        //console.log(params);
        axios({
            method: "get",
            url: process.env.BACKEND_URL + "/Customers?" + params,
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => {
            let modalSearchData = [];
            res.data.forEach((item)=>{
                item.purpose = "FILLOUT_NAME"
                modalSearchData.push(item);
            });
            showModalSearch(modalSearchData);
        })
        .catch(err => {
            //if (err.message)console.log(err.message);
            //if (err.request)console.log(err.request);
            if (err.response){
                //console.log(err.response.data);
                showOutcome({
                    title:"Error",
                    body: err.response.data,
                });
            } else if(err.message){
                showOutcome({
                    title:"Error",
                    body: err.message,
                });
            }
        });
    }

    if (isAuthenticated){
        return (
            <Container fluid>
                <Row>
                <Col>
                    <MenuBar />
                    <Breadcrumb>
                        <Breadcrumb.Item active>Recibos</Breadcrumb.Item>
                        <Breadcrumb.Item active>{getViewState()}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div id="vertical-padding">
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary" onClick={()=>{setViewState("ADD_NEW")}} >Nuevo</Button>
                        <Button variant="secondary" onClick={()=>{setViewState("SEARCH_PRINT")}} >Buscar/Imprimir</Button>
                        <Button variant="secondary" onClick={()=>{setViewState("SEARCH_EDIT")}} >Buscar/Editar</Button>
                    </ButtonGroup>
                    </div>
                    <ReceiptsFormNew submitFormData = {submitreceiptsFormNewData} searchCustomers={searchCustomers} values = {receiptsFormNewValues} visible = {isFormVisible("ADD_NEW")} />
                    <ReceiptsFormSearch submitFormData = {submitReceiptsFormSearchData} visible = {(isFormVisible("SEARCH_PRINT") || isFormVisible("SEARCH_EDIT"))} />
                    <ReceiptsFormPrint submitFormData = {submitReceiptsFormPrintData} initialData = {receiptsFormPrintInitialValues} visible = {isFormVisible("PRINT")} />
                    <ReceiptsFormEdit submitFormData = {submitReceiptsFormEditData} searchCustomers={searchCustomers} initialData = {receiptsFormEditInitialValues} visible = {isFormVisible("EDIT")} />
                    <ModalSearch handleClose= {hideModalSearch} modalSearch = {modalSearch} submitFormData = {submitModalSearchFormData}/>
                    <PopupMessage handleClose= {hidePopupMessage} popupMessage = {popupMessage} />
                </Col>
                </Row>
                <Row>
                <Col id="footer">
                    <Alert variant='dark'>
                        Ingreso como: {user.name}
                    </Alert>
                </Col>
                </Row>
            </Container>
        );
    }else{
        if (isLoading){
            return (
                <IsLoading/>
            );
        } else{
            return (
                <NotAuthenticated/>
            );
        }
        
    }

  }
  
  export default Receipts;