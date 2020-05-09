import React, { Component } from 'react';
import {Form,Button} from 'react-bootstrap';
import ReactAce from 'react-ace-editor';
import Spinner from '../../Spinner/Spinner';
import globalDB from '../../../context/db.js';
import './QuizComponent.css';




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
        correctQuery: null

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
        console.log("Current quiz: " + this.state.currentQuiz)
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
            console.log(resData.data.allQuiz);
            this.setState({quizzes: resData.data.allQuiz });
            
        })
        .catch(err => {
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
        
        try{

        
            var correctQueryFromAPI = JSON.stringify(globalDB.database.exec(JSON.parse(quiz.details).correctQuery))
            var queryFromUser  = JSON.stringify(globalDB.database.exec(this.state.selectedQuery));
            let status = 0;
            if(queryFromUser === correctQueryFromAPI){
                console.log(queryFromUser)
                status = 1;
                //Save that quiz has been answered in order to not present it again
                var tempMap = JSON.parse(localStorage.getItem('answeredQuizzes'));
                tempMap[quiz.id] = 1;
                localStorage.setItem('answeredQuizzes', JSON.stringify(tempMap))
            }
            else{
                //Save that quiz has been answered in order to not present it again
                var tempMap = JSON.parse(localStorage.getItem('answeredQuizzes'));
                tempMap[quiz.id] = 0;
                localStorage.setItem('answeredQuizzes', JSON.stringify(tempMap))
            }

            let requestBody = {
                
                query: `
                mutation {
                    saveMultipleChoiceQuiz(userId: ${localStorage.getItem('userId')}, quizId: ${quiz.id}, status: ${status})
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
                console.log(resData.data);
                this.setState({quizzes: resData.data.allQuiz });
                
            })
            .catch(err => {
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
                console.log(resData.data);
                this.setState({quizzes: resData.data.allQuiz });
                
            })
            .catch(err => {
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


    render (){

        return(
            <React.Fragment>
            {(this.props.quizzes.map((quiz,i) => 
                    <div key={i}>
                        {console.log("SOKOLATA\t" + JSON.parse(localStorage.getItem('answeredQuizzes'))[quiz.id])}
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
                                                    
                                                        && (<option value="b" className="optionClassWrong">b - {JSON.parse(quiz.details).b}</option>)
                                                        
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
                                <img src={JSON.parse(quiz.details).sql} className="sqlImage" alt="Cinque Terre"/> 

                                {(!this.state.codeQuizSubmitted && !JSON.parse(localStorage.getItem('answeredQuizzes')).hasOwnProperty(quiz.id)) &&
                                    <React.Fragment>
                                        <p className="pLabel">Write your SQL query below and submit the answer!</p>
                                    
                                        <ReactAce
                                            mode="mysql"
                                            theme="eclipse"
                                            setReadOnly={false}
                                            onChange={this.handleTypedCode}
                                            style={{ height: '200px' }}
                                            ref={instance => { this.ace = instance; }} 
                                        />
                                        <Button className="quizSubmit" variant="primary" onClick={e=>this.handleCodeSubmition(quiz)}>Submit Answer!</Button>
                                    </React.Fragment>
                                    
                                } 

                                {(this.state.codeQuizSubmitted || JSON.parse(localStorage.getItem('answeredQuizzes')).hasOwnProperty(quiz.id)) &&
                                    <React.Fragment>
                                        {JSON.parse(localStorage.getItem('answeredQuizzes'))[quiz.id] === 0 ?
                                            <React.Fragment>
                                                <div>Your query wasn't accepted, try to understand the suggested query below</div>
                                                <div className="xIcon"><i class="fa fa-times"></i></div>
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <div>Query accepted!</div>
                                                <div className="checkIcon"><i class="fa fa-check"></i></div>
                                            </React.Fragment>
                                        }
                                        <div className="suggestedQueryLabel">Suggested query: <br /> <div className="suggestedQuery">{JSON.parse(quiz.details).correctQuery}</div></div>
                                        <br />
                                    </React.Fragment>
                                    
                                }  

                            </React.Fragment>
                            
                            
                        }
                        
                    </div>
                ))}

                <h3>Question: {this.state.currentQuiz + 1} / {this.props.quizzes.length}</h3>
                {this.state.currentQuiz > 0 ? ( <Button variant="success" onClick={this.handleQuizNavigationPrevious}> <i className="fa fa-angle-left"></i> previous</Button>)
                    :<Button variant="secondary" disabled><i className="fa fa-angle-left"></i> previous</Button>
                }
                {this.state.currentQuiz < this.props.quizzes.length - 1 ? (<Button variant="success"onClick={this.handleQuizNavigationNext}>next <i className="fa fa-angle-right"></i></Button>)
                    : <Button variant="secondary" disabled>next <i className="fa fa-angle-right"></i></Button>
                }
                <br /> <br />

                
            </React.Fragment>
        )
    }
    

}

export default QuizComponent;