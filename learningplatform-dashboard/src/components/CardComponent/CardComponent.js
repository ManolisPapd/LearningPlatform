import React, { Component } from 'react';
import './CardComponent.css'
import {Tab, Nav,Row,Col,Accordion, Card, Button  } from 'react-bootstrap';
import ReactModal from 'react-modal';
import Modal from '../Modal/Modal';
import Quiz from '../Quiz/Quiz';

class CardComponent extends Component {
    state = {
        parsedObject: null,
        showModal: false
    }

    toggleModal = () => {
        this.setState({
          showModal: !this.state.showModal
        });
    }       

    toggleFinalModal = () => {
        this.setState({});
        localStorage.setItem('finalModal',!JSON.parse(localStorage.getItem('finalModal')));
    }

    finalModalCheck = (data) => {
        localStorage.setItem('finalModal',data);
        this.setState({});
        
    }

    render (){

        let sectionsAnalyzer = <div></div>;
        if(JSON.parse(this.props.section.information).id === 'overview'){
            sectionsAnalyzer = 

                    <Row>
                        {JSON.parse(this.props.section.information).details.map((paragraph) => 
                            <React.Fragment key={Math.random()}>
                                <h1 key={Math.random()} className="paragraphHeader">{paragraph.header}</h1>
                                <h2 key={Math.random()}  className="paragraphContext">{paragraph.context}</h2>
                                
                            </React.Fragment>
                            

                        )}
                    </Row>
            
        }
        else if(JSON.parse(this.props.section.information).id === 'statistics'){
            sectionsAnalyzer = 
                    <Row>
                        <div>Statistics will be calculated and presented</div>
                    </Row>
        }
        else if(JSON.parse(this.props.section.information).id === 'text_material'){
            sectionsAnalyzer = 
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
                        <Col sm={6}>
                            <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <div>{JSON.parse(this.props.section.information).paragraph}</div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <div className="app">
                                    <button className="modal_opener" onClick={this.toggleModal}>
                                        Begin {this.props.section.name} Quiz!
                                    </button>
                                    
                                    <Modal
                                        show={this.state.showModal}
                                        closeCallback={this.toggleModal}
                                        customClass="custom_modal_class"
                                    >
                                    <React.Fragment>
                                        <Quiz
                                            sectionId = {this.props.section.id} 
                                            quizType = "section"
                                        />
                                    </React.Fragment>
                                    </Modal>
                                </div>
                            </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
        }
        else if(JSON.parse(this.props.section.information).id === 'video_material'){
            sectionsAnalyzer = 
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
                        <Col sm={6}>
                            <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <div>{JSON.parse(this.props.section.information).paragraph}</div>
                                <div>{JSON.parse(this.props.section.information).video}</div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <div className="app">
                                    <button className="modal_opener" onClick={this.toggleModal}>
                                        Begin {this.props.section.name} Quiz!
                                    </button>
                                    
                                    <Modal
                                        show={this.state.showModal}
                                        closeCallback={this.toggleModal}
                                        customClass="custom_modal_class"
                                    >
                                    <React.Fragment>
                                        <Quiz
                                            sectionId = {this.props.section.id} 
                                            quizType = "section"
                                        />
                                    </React.Fragment>
                                    </Modal>
                                </div>
                            </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
        }
        else if(JSON.parse(this.props.section.information).id === 'final_quiz'){
            sectionsAnalyzer = 
                    <Row>
                            <div className="app">
                                <button className="modal_opener" onClick={this.toggleFinalModal}>
                                    Begin Final Quiz!
                                </button>
                                
                                
                                <ReactModal
                                    isOpen={JSON.parse(localStorage.getItem('finalModal'))}
                                    ariaHideApp={false}
                                    shouldReturnFocusAfterClose={true}
                                        
                                >            
                                    <React.Fragment>
                                        <div>
                                            <Quiz
                                                //pass all sections to get all final quizzes for all sections
                                                sectionId = {this.props.section.id} 
                                                quizType = "finalQuiz"
                                                sectionsLength = {this.props.sectionsLength}
                                                finalModalCheck = {this.finalModalCheck}
                                            
                                            />
                                        </div>
    
                                    </React.Fragment>
                                </ReactModal>
                                {/* </Modal> */}
                            </div>
                    </Row>
        }
        
        

        
        return(
            <Card>
                        <Card.Header>
                            <Accordion.Toggle id="sectionHeader" className="sectionHeader" as={Button} variant="link" eventKey={this.props.eventKey}>
                                {this.props.section.name}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={this.props.eventKey}>
                        <Card.Body>
                            
                            {/* Children Sections */}
                            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                {/* Present Course Overview */}
                                {sectionsAnalyzer}
                            </Tab.Container>
                            {/* End of children  */}


                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>

            )
    
        }
       
     }
       
 export default CardComponent;