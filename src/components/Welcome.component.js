import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import LoginButton from './LoginButton.component.js';
import IsLoading from './IsLoading.component.js';
import MenuBar from './MenuBar.component.js';
import { useAuth0 } from "@auth0/auth0-react";

function Welcome (){
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isAuthenticated){
    return (
      <Container fluid>
            <Row>
            <Col>
                <MenuBar />
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
  } else{
    if (isLoading){
      return (
        <IsLoading/>
        );
    }else{
      return (
        <Container fluid>
          <Row>
            <Col>
              <p>¡Bienvenido/a!</p>
              <LoginButton/>
            </Col>
          </Row>
        </Container>
        );
    }
    
  }
    
  }
  
  export default Welcome;