import React, { Component } from 'react';
import FinalQuiz from './FinalQuiz/FinalQuiz';
import QuizComponent from './QuizComponent/QuizComponent';
import './Quiz.css';

class Quiz extends Component {

    state = {
        quizzes: {},
        finalQuizFetched: 0,
        sectionFailStatusMap: new Map()
    }

    componentDidMount = () => {
        if(this.props.quizType === 'section'){
            //Retrieve quizzes for section

            let requestBody = {
            
                query: `
                query {
                    allQuiz(sectionId: ${this.props.sectionId}, sectionQuiz: true, failed: false){
                        id
                        type
                        details
                        sectionId
                    }
                }
                `
            };

            //request to the backend
            fetch('https://learningplatform-backend.herokuapp.com/graphql', {
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
                console.log("Section Quizzes\n");
                console.log(resData.data.allQuiz);
                this.setState({quizzes: resData.data.allQuiz });
                
            })
            .catch(err => {
                console.log(err);
            });
        }
        else{
            //Check which sections the user has failed the final quizzes
            //Loop fetch query checkUserSectionStatus
            //If failed set failedFlag = true to get all final quizzes, else it will only get the simple final quizzes

            for(let i = 2; i < this.props.sectionsLength -1; i++ ){
                //Check if user has failed this section
                //Don't forget add 1 to i because section counting begins from 1
                let requestBody = {
            
                    query: `
                    query {
                        checkUserSectionStatus(userId:${localStorage.getItem('userId')}, sectionId: ${i+1}, sectionQuiz:false){
                            failed
                        }
                    }
                    `
                };
    
                //request to the backend
                fetch('https://learningplatform-backend.herokuapp.com/graphql', {
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
                    let quizAddition = this.state.finalQuizFetched + 1;
                    let sectionFailStatusMapCopy = this.state.sectionFailStatusMap;
                    sectionFailStatusMapCopy.set([i+1], resData.data.checkUserSectionStatus.failed);

                    this.setState({finalQuizFetched: quizAddition, sectionFailStatusMap: sectionFailStatusMapCopy  });
                    
                    
                })
                .catch(err => {
                    console.log(err);
                });

            }


        }
    }

    finalModalCheck = (data) => {
        this.props.finalModalCheck(data);
    }

    render (){

        let quizPresenter = <div></div>;
        //Present section quiz
        if(this.props.quizType === 'section'){
            return(
                //Print this.state.quizzes
                <React.Fragment>
                    {this.state.quizzes.length > 0 && 
                        //Component will handle the presentation of the quizzes on the section
                        <QuizComponent 
                            courseId = {this.props.courseId}
                            quizzes = {this.state.quizzes}
                        />
                    } 
                </React.Fragment>
                  
    
            )
        }
        //Present final quiz
        else{
            return(
                <React.Fragment>
                    {/* final quiz new component when we have all the the quizes */}
                    {this.state.finalQuizFetched === this.props.sectionsLength -3 &&
                        <FinalQuiz
                            
                            courseId = {this.props.courseId}
                            sectionStatusMap = {this.state.sectionFailStatusMap}
                            finalModalCheck = {this.finalModalCheck}
                        />
                    }
                </React.Fragment>
                
                
    
            )
        }
        
    
    }
   
 }
   
export default Quiz;