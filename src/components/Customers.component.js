import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import MenuBar from './MenuBar.component.js';
import CustomersFormNew from './CustomersFormNew.component.js';
import CustomersFormSearch from './CustomersFormSearch.component.js';
import CustomersFormEdit from './CustomersFormEdit.component.js';
import PopupMessage from './PopupMessage.component.js';
import ModalSearch from './ModalSearch.component.js';
import NotAuthenticated from './NotAuthenticated.component.js';
import IsLoading from './IsLoading.component.js';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import Config from '../config/Config.js';
import dotenv from 'dotenv';

function Customers (){

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
    let [customersFormEditInitialValues, setCustomersFormEditInitialValues] = useState({
        names: "",
        last_names: "",
        registration_number: "",
        email: "",
        notes: "",
        mode: "",
      });

    const isFormVisible = (form) => {
        if(viewState===form)return true;
        return false;
    };

    const getViewState = () => {
        switch(viewState){
            case "ADD_NEW":
                return "Nuevo";
            case "SEARCH":
                return "Buscar";
            case "EDIT":
                return "Editar";
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

    const submitCustomersFormSearchData = async (values, formikBag) => {
        //console.log(values);
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
            //console.log(res.data);
            let modalSearchData = [];
            res.data.forEach((item)=>{
                item.purpose = "EDIT"
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

    const submitModalSearchFormData = async (values, formikBag) => {
        //console.log(values);
        if (values.purpose === "EDIT"){
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
                    let initialData = res.data[0];
                    initialData.mode = "EDIT";
                    setCustomersFormEditInitialValues(initialData);
                    setViewState("EDIT");
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

    const submitCustomersFormEditData = async (values, formikBag) => {
        //console.log(values);
        const accessToken = await getAccessTokenSilently();
        if (values.mode === "EDIT"){
            axios({
                method: "post",
                url: process.env.BACKEND_URL + "/customers/edit",
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
            //console.log("DELETE");
            axios({
                method: "post",
                url: process.env.BACKEND_URL + "/customers/delete",
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
                setViewState("SEARCH")
            });
        }
    };

    const submitCustomersFormNewData = async (values, formikBag) => {
        //console.log(values);
        const accessToken = await getAccessTokenSilently();
        axios({
            method: "post",
            url: process.env.BACKEND_URL + "/customers/add",
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
            let registrationNumberValues = {
                search: "registration_number",
                parameter: values.registration_number
            }
            //console.log(registrationNumberValues);
            let params = new URLSearchParams(registrationNumberValues).toString()
            axios({
                method: "get",
                url: process.env.BACKEND_URL + "/customers?" + params,
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(res => {
                let initialData = res.data[0];
                initialData.mode = "EDIT";
                setCustomersFormEditInitialValues(initialData);
                setViewState("EDIT");
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
        })
        
    };


    if (isAuthenticated){
        return (
            <Container fluid>
                <Row>
                <Col>
                    <MenuBar />
                    <Breadcrumb>
                        <Breadcrumb.Item active>Clientes</Breadcrumb.Item>
                        <Breadcrumb.Item active>{getViewState()}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div id="vertical-padding">
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary" onClick={()=>{setViewState("ADD_NEW")}} >Nuevo</Button>
                        <Button variant="secondary" onClick={()=>{setViewState("SEARCH")}} >Buscar/Editar</Button>
                    </ButtonGroup>
                    </div>
                    <CustomersFormNew submitFormData = {submitCustomersFormNewData} visible = {isFormVisible("ADD_NEW")} />
                    <CustomersFormSearch submitFormData = {submitCustomersFormSearchData} visible = {isFormVisible("SEARCH")} />
                    <CustomersFormEdit submitFormData = {submitCustomersFormEditData} initialData = {customersFormEditInitialValues} visible = {isFormVisible("EDIT")} />
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
  
  export default Customers;