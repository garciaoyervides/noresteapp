import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import MenuBar from './MenuBar.component.js';
import ReportsFormSearchByCustomer from './ReportsFormSearchByCustomer.component.js';
import ReportsFormSearchByDate from './ReportsFormSearchByDate.component.js';
import ReportsFormResults from './ReportsFormResults.component.js';
import PopupMessage from './PopupMessage.component.js';
import ModalSearch from './ModalSearch.component.js';
import NotAuthenticated from './NotAuthenticated.component.js';
import IsLoading from './IsLoading.component.js';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import dotenv from 'dotenv';

function Reports (){
    
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
    let [reportData, setReportData] = useState({});

    const isFormVisible = (form) => {
        if(viewState===form)return true;
        return false;
    };

    const getViewState = () => {
        switch(viewState){
            case "SEARCH_BY_NAME":
                return "Por Nombre";
            case "SEARCH_BY_DATE":
                return "Por Fecha";
            case "REPORT":
                return "Vista de Reporte";
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
    const showModalSearch = (vals) => {
        if (!modalSearch.isVisible){
            setModalSearch({
                isVisible: true,
                data: vals,
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

    const submitReportsFormSearchByCustomerData = async (values, formikBag) => {
        //console.log(values);
        const accessToken = await getAccessTokenSilently();
        let params = new URLSearchParams(values).toString()
        if (values.approximate){
            axios({
                method: "get",
                url: process.env.BACKEND_URL + "/reports/receipts?" + params,
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(res => {
                let thisData = {
                    data: res.data,
                    mode: "RECEIPTS",    
                };
                //console.log(thisData);
                setReportData(thisData);
                setViewState("REPORT");  
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
        } else{
            axios({
                method: "get",
                url: process.env.BACKEND_URL + "/customers?" + params,
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(res => {
                //console.log(res.data);
                let modalSearchData = [];
                res.data.forEach((item)=>{
                    item.purpose = "REPORT"
                    modalSearchData.push(item);
                });
                //console.log(modalSearchData);
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
    }

    const submitReportsFormSearchByDateData = async (values, formikBag) => {
        //console.log(values);
        const accessToken = await getAccessTokenSilently();
        let params = new URLSearchParams(values).toString()
        //console.log(params);
        axios({
            method: "get",
            url: process.env.BACKEND_URL + "/reports/receipts/date?" + params,
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => {
            let thisData = {
                data: res.data,
                mode: "RECEIPTS",    
            };
            //console.log(thisData);
            setReportData(thisData);
            setViewState("REPORT");  
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
    };

    const submitModalSearchFormData = async (values, formikBag) => {
        //console.log(values);
        if (values.purpose === "REPORT"){
            const accessToken = await getAccessTokenSilently();
            let params = new URLSearchParams(values).toString()
            //console.log(params);
            axios({
                method: "get",
                url: process.env.BACKEND_URL + "/reports/receipts?" + params,
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(res => {
                    let thisData = {
                        data: res.data,
                        mode: "RECEIPTS",    
                    };
                    //console.log(thisData);
                    setReportData(thisData);
                    setViewState("REPORT");   
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

    if (isAuthenticated){
        return (
            <Container fluid>
                <Row>
                <Col>
                    <MenuBar />
                    <Breadcrumb>
                        <Breadcrumb.Item active>Reportes</Breadcrumb.Item>
                        <Breadcrumb.Item active>{getViewState()}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div id="vertical-padding">
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary" onClick={()=>{setViewState("SEARCH_BY_NAME")}} >Buscar por Nombre/Matrícula</Button>
                        <Button variant="secondary" onClick={()=>{setViewState("SEARCH_BY_DATE")}} >Buscar por Fecha</Button>
                    </ButtonGroup>
                    </div>
                    <ReportsFormSearchByCustomer submitFormData = {submitReportsFormSearchByCustomerData} visible = {isFormVisible("SEARCH_BY_NAME")} />
                    <ReportsFormSearchByDate submitFormData = {submitReportsFormSearchByDateData} visible = {isFormVisible("SEARCH_BY_DATE")} />
                    <ReportsFormResults reportData ={reportData} visible = {isFormVisible("REPORT")} />
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
  
  export default Reports;