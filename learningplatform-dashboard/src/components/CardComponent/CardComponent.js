import React, { Component } from 'react';
import './CardComponent.css'
import {Tab, Nav,Row,Col,Accordion, Card, Button  } from 'react-bootstrap';
import ReactModal from 'react-modal';
import Modal from '../Modal/Modal';
import Quiz from '../Quiz/Quiz';
import Statistics from '../Statistics/Statistics';

// const Statistics = import('../Statistics/Statistics')

class CardComponent extends Component {
    state = {
        parsedObject: null,
        showModal: false,
        statisticsRerender: true,
        resetModalStatus: false
    }

    componentDidMount = () => {
        console.log("CARD MOUNT")
        localStorage.setItem("statisticsCalled","0");

        //   this.interval = setInterval(
        //     () => {
        //         if(localStorage.getItem("statisticsCalled") === "1"){
        //             this.setState({statisticsRerender: true})
                   
                    
        //         }
        //         else{
        //             this.setState({statisticsRerender: false})
        //         }
        //     }
        //     ,5000);

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

    toggleResetModal = () => {
        this.setState({resetModalStatus: !this.state.resetModalStatus})
    }

    resetUserCourseData = () => {
        

        let requestBody = {
        
            query: `
            mutation {
                resetData(userId:${localStorage.getItem('userId')})
            }
            `
        };

        //request to the backend
        fetch('http://localhost:8080/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status !== 200 && res.status !== 201){
            throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            
            this.setState({resetModalStatus: !this.state.resetModalStatus})
            localStorage.setItem("statisticsCalled","0");
            localStorage.setItem("answeredQuizzes","{}");
            window.location.reload(true);

            
            
        })
        .catch(err => {
            console.log(err);
        });
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
                        {this.state.statisticsRerender &&
                            <Statistics 
                                sectionsLength = {this.props.sectionsLength}
                            />
                        }
                        
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
        else if(JSON.parse(this.props.section.information).id === 'options'){
            sectionsAnalyzer = 
                    <Row>
                        <Button variant="danger" onClick={this.toggleResetModal}>Reset Progress</Button>


                        <Modal
                            show={this.state.resetModalStatus}
                            closeCallback={this.toggleResetModal}
                            customClass="custom_modal_class"
                        >          

                                <React.Fragment>
                                    <p>Progress will be reset, are you sure?</p>
                                    <Button variant="danger" onClick={this.resetUserCourseData}>Delete Everything</Button>
                                    <Button variant="info" onClick={this.toggleResetModal}>Go Back</Button>

                                </React.Fragment>
                                    
                        </Modal>   
                       
                        
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