import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NotAuthenticated (){
    
    return (

            <Container>
                <Row>
                    <Col>
                        <p>No tienes acceso</p>
                    </Col>
                </Row>
            </Container>
        
    );
  }
  
  export default NotAuthenticated;