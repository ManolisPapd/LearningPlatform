import React, { Component } from 'react';
import {Form,Button} from 'react-bootstrap';
import ReactAce from 'react-ace-editor';
import globalDB from '../../../context/db.js';
import QuizResults from './QuizResults/QuizResults';
import './QuizComponent.css';
import Modal from '../../Modal/Modal';
import InnerTheory from './InnerTheory/InnerTheory';
import axios from '../../../_services/axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';

class QuizComponent extends Component {

    state = {
        currentQuiz : 0,
        selectedChoice : null,
        selectedQuiz: null,
        multipleQuizSubmitted: false,
        codeQuizSubmitted: false,
        loadingAnswer: false,
        selectedChoiceWasCorrect: false,
        sqlQuery: null,
        selectedQuery: null,
        correctQuery: null,
        resultsPresentation: false,
        questionWrong: false,
        modalSectionA:false,
        modalSectionB:false,
        modalSectionC:false,
        modalSectionD:false

    }


    handleSelection(e,quiz,correctChoice) {
        if(correctChoice === e.target.value){
            this.setState({selectedChoice:e.target.value, selectedQuiz:quiz.id, multipleQuizSubmitted: true, selectedChoiceWasCorrect: true })
        }
        else{
            this.setState({selectedChoice:e.target.value, selectedQuiz:quiz.id, multipleQuizSubmitted: true, selectedChoiceWasCorrect: false })
        }
        
        console.log(e.target.value + '\t' + quiz.id)

    }

    handleQuizNavigationPrevious= () => {
        this.setState({currentQuiz: this.state.currentQuiz - 1});
        console.log("Current quiz: " + this.state.currentQuiz)
        //Clean state for next quiz
        this.setState({selectedChoice:null, selectedQuiz:null, multipleQuizSubmitted: false, codeQuizSubmitted: false, loadingAnswer: false })
    }
    
    handleQuizNavigationNext = () => {
        this.setState({currentQuiz: this.state.currentQuiz + 1});
        //Clean state for next quiz
        this.setState({selectedChoice:null, selectedQuiz:null, multipleQuizSubmitted: false, codeQuizSubmitted: false, loadingAnswer: false })

    }

    handleQuizSumbition = () => {
        console.log("Quiz Submition")
        console.log(this.state.selectedChoice +'\tfor quiz\t' + this.state.selectedQuiz);

        let status = 0;
        if(this.state.selectedChoiceWasCorrect){
            status = 1;
        }


        let requestBody = {
            
            query: `
            mutation {
                saveMultipleChoiceQuiz(userId: ${localStorage.getItem('userId')}, quizId: ${this.state.selectedQuiz}, status: ${status})
            }
            `
        };

        //axios
        axios.post('/graphql',requestBody)
        .then(res => {
            if(res.status !== 200 && res.status !== 201){
            throw new Error('Failed!');
            }
            
            console.log(res.data.data.allQuiz);
            this.setState({quizzes: res.data.data.allQuiz });

        }).catch(err => {
            console.log(err);
        });


        //Save that quiz has been answered in order to not present it again
        var tempMap = JSON.parse(localStorage.getItem('answeredQuizzes'));
        tempMap[this.state.selectedQuiz] = this.state.selectedChoice;
        localStorage.setItem('answeredQuizzes', JSON.stringify(tempMap))
        //Clean state for next quiz
        this.setState({selectedQuiz:null, multipleQuizSubmitted: false, loadingAnswer: true })

    }

    handleTypedCode = (e) => {
        this.setState({selectedQuery: e})
        
        console.log(e)
    }

    handleCodeSubmition = (quiz) => {
        // console.log(JSON.stringify(globalDB.database.exec("SELECT * FROM person WHERE sex='F' AND income > 60000")));
        console.log("Code Submition")
        this.setState({codeQuizSubmitted: true});
        var queryFromUser = this.state.selectedQuery;
        
        try{

            var correctQueryFromAPI = JSON.parse(quiz.details).correctQuery.toUpperCase().trim().replace(/\s/g, "");
            var isQueryFromUserChanged = false;
            queryFromUser  = this.state.selectedQuery.toUpperCase().trim().replace(/\s/g, "");
            if(true){
                //Theloume mono to query, h logiki xeirizetai sto backend
                // correctQueryFromAPI = JSON.stringify(globalDB.database.exec(JSON.parse(quiz.details).correctQuery))
                correctQueryFromAPI = JSON.parse(quiz.details).correctQuery;
                try{
                    //Theloume mono to query, h logiki xeirizetai sto backend
                    // queryFromUser = JSON.stringify(globalDB.database.exec(this.state.selectedQuery));
                    queryFromUser = this.state.selectedQuery;
                    isQueryFromUserChanged = true;
                }catch (e) { //User entered query not related to db.js or gibberish, it will be tested on 
                    
                }
                

            }
            
            let status = 0;
       
            
                var newQueryFromUser = queryFromUser;
                if(!isQueryFromUserChanged){
                    newQueryFromUser = this.state.selectedQuery;
                }
                let requestBody = {
            
                    query: `
                        query {
                            errorAnalyzer(language : \"sql\", wrongAnswer : \"${newQueryFromUser}\", correctAnswer: \"${JSON.parse(quiz.details).correctQuery}\"){
                                id
                                type
                                reason
                            }
                        }   
                    `
                };
    
                //axios
                axios.post('/graphql',requestBody)
                .then(res => {
                    if(res.status !== 200 && res.status !== 201){
                    throw new Error('Failed!');
                    }
                    
                    //Check if answer is correct
                    if(res.data.data.errorAnalyzer.length == 0){
                        status = 1;
                        //Save that quiz has been answered in order to not present it again
                        var tempMap = JSON.parse(localStorage.getItem('answeredQuizzes'));
                        tempMap[quiz.id] = 1;
                        localStorage.setItem('answeredQuizzes', JSON.stringify(tempMap))
                        console.log("RCS: CORRECT", res.data)
                    }
                    else{
                        this.props.onHelperActivation(res.data, newQueryFromUser);
                        //Save that quiz has been answered in order to not present it again
                        var tempMap = JSON.parse(localStorage.getItem('answeredQuizzes'));
                        tempMap[quiz.id] = 0;
                        localStorage.setItem('answeredQuizzes', JSON.stringify(tempMap))
                        console.log("RCS: WRONG", res.data)
                    }
                    
                    
                }).catch(err => {
                    console.log(err);
                });

                //----end call
                
                
            
            requestBody = {
                
                query: `
                mutation {
                    saveMultipleChoiceQuiz(userId: ${localStorage.getItem('userId')}, quizId: ${quiz.id}, status: ${status})
                }
                `
            };


            //axios
            axios.post('/graphql',requestBody)
            .then(res => {
                if(res.status !== 200 && res.status !== 201){
                throw new Error('Failed!');
                }
                
                console.log(res.data.data);
    
                this.setState({quizzes: res.data.data.allQuiz, selectedQuery: null });

            }).catch(err => {
                console.log(err);
            });

        } catch (e) { //User typed gibberish, so status 0
            let requestBody = {
                
                
                query: `
                mutation {
                    saveMultipleChoiceQuiz(userId: ${localStorage.getItem('userId')}, quizId: ${quiz.id}, status: 0)
                }
                `
            };
            //HELPER
            this.props.onHelperActivation("Provided query doesn't seem to comply to SQL standards.", queryFromUser);
            //TODO call api syntax error


            //axios
            axios.post('/graphql',requestBody)
            .then(res => {
                if(res.status !== 200 && res.status !== 201){
                throw new Error('Failed!');
                }
                
                this.setState({quizzes: res.data.data.allQuiz });
            }).catch(err => {
                console.log(err);
            });

            //Save that quiz has been answered in order to not present it again
            var tempMap = JSON.parse(localStorage.getItem('answeredQuizzes'));
            tempMap[quiz.id] = 0;
            localStorage.setItem('answeredQuizzes', JSON.stringify(tempMap))
        } finally{
            
            //Clean state for next quiz
            this.setState({selectedQuiz:null, multipleQuizSubmitted: false, loadingAnswer: true })
        }
        

    }


    handleEndQuiz = () => {
        //Will present overall results for this quiz
        this.setState({resultsPresentation: true});
    }

    handleViewQuizzesAgain = () => {
        this.setState({resultsPresentation: false});
    }

    resetFinalQuiz = () => {
        //Close modal, notify parent component CardComponent
        localStorage.setItem('finalModal',false);
        this.props.finalModalCheck(false);

        //Remove final quizzes from answered quizzes on local storage
        var finalQuizzesId = JSON.parse(localStorage.getItem('finalQuizzesOrder')).map(Number);
        var answeredQuizzes = JSON.parse(localStorage.getItem('answeredQuizzes'));

        finalQuizzesId.forEach((id) => {
            delete answeredQuizzes[id];

        })
        localStorage.setItem('answeredQuizzes', JSON.stringify(answeredQuizzes));
        window.location.reload(true);


    }

    exitSectionQuiz = () => {
        window.location.reload(true);
    }
   


    toggleModalSectionA = () => {
        this.setState({
            modalSectionA: !this.state.modalSectionA
          });
    }

    toggleModalSectionB = () => {
        this.setState({
            modalSectionB: !this.state.modalSectionB
          });
    }

    toggleModalSectionC = () => {
        this.setState({
            modalSectionC: !this.state.modalSectionC
          });
    }

    toggleModalSectionD = () => {
        this.setState({
            modalSectionD: !this.state.modalSectionD
          });
    }

    render (){

        return(
            <React.Fragment>
                {this.state.resultsPresentation ? 
                    (
                        <React.Fragment>
                            <QuizResults 
                                quizzes = {this.props.quizzes}
                                finalQuiz = {this.props.finalQuiz}
                            />
                            <br />
                            <br />
                            <Button variant="info" onClick={this.handleViewQuizzesAgain}>Go to quizzes!</Button>
                            {!this.props.finalQuiz && <Button variant="danger" 
                                onClick={this.exitSectionQuiz}
                             >End Quiz</Button>}
                            {this.props.finalQuiz && <Button variant="danger" 
                                onClick={this.resetFinalQuiz}
                             >End Final Quiz</Button>}
                        </React.Fragment>
                    ):
                    
                
                    <React.Fragment>
                    {(this.props.quizzes.map((quiz,i) => 
                            <div key={i}>
                                {/* Present multiple choice quiz */}
                                { (this.state.currentQuiz === i && quiz.details && quiz.type === 'multiple') &&
                                    <Form>
                                        <Form.Group controlId="exampleForm.ControlSelect2">
                                            <Form.Label className="parentLabel">Multiple choice question, select only one!<br/><div className="customLabel"></div></Form.Label> 
                                            <div className="customLabel">{JSON.parse(quiz.details).question}</div><br/>
                                            {!this.state.loadingAnswer && ! JSON.parse(localStorage.getItem('answeredQuizzes')).hasOwnProperty(quiz.id) ?
                                                (<Form.Control className="selectOptionsForm"  as="select" multiple onChange={e => this.handleSelection(e,quiz,JSON.parse(quiz.details).correct )}>
                                                    <option value="a" className="optionClass">a - {JSON.parse(quiz.details).a}</option>
                                                    <option value="b" className="optionClass">b - {JSON.parse(quiz.details).b}</option>
                                                    <option value="c" className="optionClass">c - {JSON.parse(quiz.details).c}</option>
                                                    <option value="d" className="optionClass">d - {JSON.parse(quiz.details).d}</option>
                                                </Form.Control>)
                                                :(
                                                    <React.Fragment>
                                                        {/* <Spinner /> */}

                                                        <Form.Control className="selectOptionsForm" disabled  as="select" multiple>
                                                            {JSON.parse(quiz.details).correct ==='a' && (<option value="a" className="optionClassCorrect">a - {JSON.parse(quiz.details).a}</option>)
                        
                                                            }
                                                            {(JSON.parse(quiz.details).correct !=='a' && this.state.selectedChoice !=='a' && JSON.parse(localStorage.getItem('answeredQuizzes'))[quiz.id] !== 'a') && (<option value="a" className="optionClass">a - {JSON.parse(quiz.details).a}</option>)
                        
                                                            }
                                                            {(( (this.state.selectedChoice ==='a') && (!this.state.selectedChoiceWasCorrect)) || 
                                                            ((JSON.parse(localStorage.getItem('answeredQuizzes'))[quiz.id] === 'a' ) && (JSON.parse(quiz.details).correct !== 'a')  ))
                                                            
                                                                && (<option value="a" className="optionClassWrong">a - {JSON.parse(quiz.details).a}</option>)
                                                                
                                                            }
                                                            {/* End of Handling a */}


                                                            {JSON.parse(quiz.details).correct ==='b' && (<option value="a" className="optionClassCorrect">b - {JSON.parse(quiz.details).b}</option>)
                        
                                                            }
                                                            {(JSON.parse(quiz.details).correct !=='b' && this.state.selectedChoice !=='b' && JSON.parse(localStorage.getItem('answeredQuizzes'))[quiz.id] !== 'b') && (<option value="b" className="optionClass">b - {JSON.parse(quiz.details).b}</option>)
                        
                                                            }
                                                            {(( (this.state.selectedChoice ==='b') && (!this.state.selectedChoiceWasCorrect)) || 
                                                            ((JSON.parse(localStorage.getItem('answeredQuizzes'))[quiz.id] === 'b' ) && (JSON.parse(quiz.details).correct !== 'b')  ))
                                                            
                                                                && (
                                                                    <React.Fragment>
                                                                    <option value="b" className="optionClassWrong">b - {JSON.parse(quiz.details).b}</option>
                                                                   
                                                                    </React.Fragment>
                                                                )
                                                                
                                                            }
                                                            {/* End of Handling b */}


                                                            {JSON.parse(quiz.details).correct ==='c' && (<option value="c" className="optionClassCorrect">c - {JSON.parse(quiz.details).c}</option>)
                        
                                                            }
                                                            {(JSON.parse(quiz.details).correct !=='c' && this.state.selectedChoice !=='c' && JSON.parse(localStorage.getItem('answeredQuizzes'))[quiz.id] !== 'c') && (<option value="c" className="optionClass">c - {JSON.parse(quiz.details).c}</option>)
                        
                                                            }
                                                            {(( (this.state.selectedChoice ==='c') && (!this.state.selectedChoiceWasCorrect)) || 
                                                            ((JSON.parse(localStorage.getItem('answeredQuizzes'))[quiz.id] === 'c' ) && (JSON.parse(quiz.details).correct !== 'c')  ))
                                                            
                                                                && (<option value="c" className="optionClassWrong">c - {JSON.parse(quiz.details).c}</option>)
                                                                
                                                            }
                                                            {/* End of Handling c */}


                                                            {JSON.parse(quiz.details).correct ==='d' && (<option value="d" className="optionClassCorrect">d - {JSON.parse(quiz.details).d}</option>)
                        
                                                            }
                                                            {(JSON.parse(quiz.details).correct !=='d' && this.state.selectedChoice !=='d' && JSON.parse(localStorage.getItem('answeredQuizzes'))[quiz.id] !== 'd') && (<option value="d" className="optionClass">d - {JSON.parse(quiz.details).d}</option>)
                        
                                                            }
                                                            {(( (this.state.selectedChoice ==='d') && (!this.state.selectedChoiceWasCorrect)) || 
                                                            ((JSON.parse(localStorage.getItem('answeredQuizzes'))[quiz.id] === 'd' ) && (JSON.parse(quiz.details).correct !== 'd')  ))
                                                            
                                                                && (<option value="d" className="optionClassWrong">d - {JSON.parse(quiz.details).d}</option>)
                                                                
                                                            }
                                                            {/* End of Handling d */}
                                                        </Form.Control>
                                                        {( (this.state.selectedChoice ==='a') && (!this.state.selectedChoiceWasCorrect)
                                                            && this.props.finalQuiz
                                                        ) &&
                                                        <React.Fragment>
                                                        <div className="modal_opener" onClick={this.toggleModalSectionA}>
                                                            Click here to visit the section again!
                                                        </div>
                                                            <Modal
                                                                show={this.state.modalSectionA}
                                                                closeCallback={this.toggleModalSectionA}
                                                            >
                                                                <InnerTheory 
                                                                    courseId = {this.props.courseId}
                                                                    sectionId = {quiz.sectionId}
                                                                />
                                                            </Modal>
                                                        
                                                        <br/></React.Fragment>}
                                                        {( (this.state.selectedChoice ==='b') && (!this.state.selectedChoiceWasCorrect)
                                                            && this.props.finalQuiz
                                                        ) &&
                                                        <React.Fragment>
                                                        <div className="modal_opener" onClick={this.toggleModalSectionB}>
                                                            Click here to visit the section again!
                                                        </div>
                                                            <Modal
                                                                show={this.state.modalSectionB}
                                                                closeCallback={this.toggleModalSectionB}
                                                            >
                                                                <InnerTheory 
                                                                    courseId = {this.props.courseId}
                                                                    sectionId = {quiz.sectionId}
                                                                />
                                                                
                                                            </Modal>
                                                        
                                                        <br/></React.Fragment>}
                                                         {( (this.state.selectedChoice ==='c') && (!this.state.selectedChoiceWasCorrect)
                                                            && this.props.finalQuiz
                                                        ) &&
                                                        <React.Fragment>
                                                        <div className="modal_opener" onClick={this.toggleModalSectionC}>
                                                            Click here to visit the section again!
                                                        </div>
                                                            <Modal
                                                                show={this.state.modalSectionC}
                                                                closeCallback={this.toggleModalSectionC}
                                                            >
                                                                <InnerTheory 
                                                                    courseId = {this.props.courseId}
                                                                    sectionId = {quiz.sectionId}
                                                                />
                                                            </Modal>
                                                        
                                                        <br/></React.Fragment>}
                                                        
                                                         {( (this.state.selectedChoice ==='d') && (!this.state.selectedChoiceWasCorrect)
                                                            && this.props.finalQuiz
                                                        ) &&
                                                        <React.Fragment>
                                                        <div className="modal_opener" onClick={this.toggleModalSectionD}>
                                                            Click here to visit the section again!
                                                        </div>
                                                            <Modal
                                                                show={this.state.modalSectionD}
                                                                closeCallback={this.toggleModalSectionD}
                                                            >
                                                                <InnerTheory 
                                                                    courseId = {this.props.courseId}
                                                                    sectionId = {quiz.sectionId}
                                                                />
                                                            </Modal>
                                                        
                                                        <br/></React.Fragment>}
                                                </React.Fragment>)
                                            }
                                            
                                            
                                        </Form.Group>
                                        {this.state.multipleQuizSubmitted ? (<Button className="quizSubmit" variant="primary" onClick={this.handleQuizSumbition}>Submit Answer!</Button>) 
                                            : <div><Button className="quizSubmit" disabled variant="secondary">Submit Answer!</Button></div>}
                                    </Form>
                                }
                                {/* Present code quiz */}
                                { (this.state.currentQuiz === i && quiz.details && quiz.type === 'code') &&
                                    <React.Fragment>
                                        <p className="codeQuestion">{JSON.parse(quiz.details).question}</p>
                                        {JSON.parse(quiz.details).sql &&
                                            <img src={JSON.parse(quiz.details).sql} className="sqlImage" alt="Cinque Terre"/> 
                                        }   

                                        {(!this.state.codeQuizSubmitted && !JSON.parse(localStorage.getItem('answeredQuizzes')).hasOwnProperty(quiz.id)) &&
                                            <React.Fragment>
                                                <p className="pLabel">Write your SQL query below and submit the answer!</p>

                                                <React.Fragment>
                                                <ReactAce
                                                    mode="mysql"
                                                    theme="textmate"
                                                    setReadOnly={false}
                                                    onChange={this.handleTypedCode}
                                                    style={{ height: '200px' }}
                                                    ref={instance => { this.ace = instance; }} 
                                                />
                                                </React.Fragment>
                                                
                                                <Button className="quizSubmit" variant="primary" onClick={e=>this.handleCodeSubmition(quiz)}>Submit Answer!</Button>
                                            </React.Fragment>
                                            
                                        } 

                                        {(this.state.codeQuizSubmitted || JSON.parse(localStorage.getItem('answeredQuizzes')).hasOwnProperty(quiz.id)) &&
                                            <React.Fragment>
                                                {JSON.parse(localStorage.getItem('answeredQuizzes'))[quiz.id] === 0 ?
                                                    <React.Fragment>
                                                        <div>Your query wasn't accepted, try to understand the suggested query below</div>
                                                        <div className="xIcon"><i className="fa fa-times"></i></div>
                                                    </React.Fragment>
                                                    :
                                                    <React.Fragment>
                                                        <div>Query accepted!</div>
                                                        <div className="checkIcon"><i className="fa fa-check"></i></div>
                                                    </React.Fragment>
                                                }
                                                <div className="suggestedQueryLabel">Suggested query: <br /> <div className="suggestedQuery">{JSON.parse(quiz.details).correctQuery}</div></div>

                                            </React.Fragment>
                                            
                                        }  

                                    </React.Fragment>
                                    
                                    
                                }
                                
                            </div>
                        ))}

                        <h3 className="questionHeader">Question: {this.state.currentQuiz + 1} / {this.props.quizzes.length}</h3>

                        {this.state.currentQuiz > 0 ? ( <Button variant="success" onClick={this.handleQuizNavigationPrevious}> <i className="fa fa-angle-left"></i> previous</Button>)
                            :<Button variant="secondary" disabled><i className="fa fa-angle-left"></i> previous</Button>
                        }
                        {this.state.currentQuiz < this.props.quizzes.length - 1 ? (<Button variant="success" onClick={this.handleQuizNavigationNext}>next <i className="fa fa-angle-right"></i></Button>)
                            : <Button variant="secondary" disabled>next <i className="fa fa-angle-right"></i></Button>
                        }
                        {this.state.currentQuiz === this.props.quizzes.length - 1 &&
                            <Button variant="info" onClick={this.handleEndQuiz}>Continue</Button>
                        }

                        <br /> <br />
                    </React.Fragment>
                    }

                
            </React.Fragment>
            
        )
    }
    

}

const mapDispatchToProps = dispatch => {
    return {
        onHelperActivation: (message, query) => dispatch({type: actionTypes.HELPER_MODAL, payload:{message:message, query:query}})
    }
};
export default connect(null, mapDispatchToProps)(QuizComponent);