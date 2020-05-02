import React, { Component } from 'react';
import './Course.css'
import {Tab, Nav,Row,Col,Accordion, Card, Button } from 'react-bootstrap';

class Course extends Component {

    render (){
        
        return(

            <React.Fragment>

                <Accordion>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Section 1: Intro To SQL World
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            
                            {/* Children Sections */}
                            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                <Row>
                                <Col sm={3}>
                                    <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Learning Material</Nav.Link>
                                        
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Quiz</Nav.Link>
                                    </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={9}>
                                    <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <div>TEST1TEST1TEST1TEST1TEST1TEST1TEST1TEST1TET1TEST1</div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <div>TEST2</div>
                                    </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                                </Row>
                            </Tab.Container>
                            {/* End of children  */}


                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Click me!
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                
          </React.Fragment>

        )
    
       }
      
    }
      
export default Course;