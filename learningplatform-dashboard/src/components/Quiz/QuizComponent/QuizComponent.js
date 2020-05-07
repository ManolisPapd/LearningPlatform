import React, { Component } from 'react';
import {Form,Button} from 'react-bootstrap';
import './QuizComponent.css';

class QuizComponent extends Component {
    state = {
        currentQuiz : 0
    }

    handleSelection(e,quiz) {
        console.log(e.target.value + '\t' + quiz.id)
    }

    handleQuizNavigationPrevious= () => {
        this.setState({currentQuiz: this.state.currentQuiz - 1});
        console.log("Current quiz: " + this.state.currentQuiz)
    }
    
    handleQuizNavigationNext = () => {
        this.setState({currentQuiz: this.state.currentQuiz + 1});
        console.log("Current quiz: " + this.state.currentQuiz)

    }

    handleQuizSumbition = () => {

    }

    

    render (){

        return(
            <React.Fragment>
            {(this.props.quizzes.map((quiz,i) => 
                    <div key={i}>
                        {/* Present multiple choice quiz */}
                        { (this.state.currentQuiz === i && quiz.details && quiz.type === 'multiple') &&
                            <Form>
                                <Form.Group controlId="exampleForm.ControlSelect2">
                                    <Form.Label className="parentLabel">Multiple choice question, select only one!<br/><div className="customLabel"></div></Form.Label> 
                                    <div className="customLabel">{JSON.parse(quiz.details).question}</div><br/>
                                    <Form.Control className="selectOptionsForm"  as="select" multiple onChange={e => this.handleSelection(e,quiz)}>
                                        <option value="a" className="optionClass">a - {JSON.parse(quiz.details).a}</option>
                                        <option value="b" className="optionClass">b - {JSON.parse(quiz.details).b}</option>
                                        <option value="c" className="optionClass">c - {JSON.parse(quiz.details).c}</option>
                                        <option value="d" className="optionClass">d - {JSON.parse(quiz.details).d}</option>
                                    </Form.Control>
                                    
                                </Form.Group>
                            </Form>
                        }
                        {/* Present multiple choice quiz */}
                        { (this.state.currentQuiz === i && quiz.details && quiz.type === 'code') &&
                            <h1>HERE CODE</h1>
                        }
                        
                    </div>
                ))}

            {/* //     {this.state.currentQuiz === 0 &&
            //         <Form>
            //             <Form.Group controlId="exampleForm.ControlSelect2">
            //                 <Form.Label className="parentLabel">Multiple choice question, select only one!<br/><div className="customLabel"></div></Form.Label> 
            //                 <div className="customLabel">What is this boogy doogy sceletal * from user? What is this boogy doogy sceletal * from user?</div><br/>
            //                 <Form.Control className="selectOptionsForm"  as="select" multiple onChange={this.handleSelection}>
            //                     <option value="letter-answer-a" className="optionClass">a - Don't know</option>
            //                     <option value="letter-answer-b" className="optionClass">b - It's okey</option>
            //                     <option value="letter-answer-c" className="optionClass">c - Sexy BoooooooooooooyBoooooo</option>
            //                     <option value="letter-answer-d" className="optionClass">d - I am not your boy toy</option>
            //                 </Form.Control>
                            
            //             </Form.Group>
            //         </Form>
            //     }

            // {this.state.currentQuiz === 1 &&
            //         <div>Y SNAO</div>
            // } */}
                <h3>Question: {this.state.currentQuiz + 1} / {this.props.quizzes.length}</h3>
                {this.state.currentQuiz > 0 ? ( <Button variant="success" onClick={this.handleQuizNavigationPrevious}> <i className="fa fa-angle-left"></i> previous</Button>)
                    :<Button variant="secondary" disabled><i className="fa fa-angle-left"></i> previous</Button>
                }
                {this.state.currentQuiz < this.props.quizzes.length - 1 ? (<Button variant="success"onClick={this.handleQuizNavigationNext}>next <i className="fa fa-angle-right"></i></Button>)
                    : <Button variant="secondary" disabled>next <i className="fa fa-angle-right"></i></Button>
                }
                <br /> <br />

                {this.state.currentQuiz === this.props.quizzes.length - 1 && <Button variant="primary" onClick={this.handleQuizSumbition}>End Quiz!</Button>}
            </React.Fragment>
        )
    }
    

}

export default QuizComponent;