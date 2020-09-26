import React, { Component } from 'react';
import QuizComponent from '../QuizComponent/QuizComponent';
import axios from '../../../_services/axios';

class FinalQuiz extends Component {

    state = {
        quizzes: []
    }

    componentDidMount = () =>{
        //Get all final quizes 
        for (var [sectionId, failedFlag] of this.props.sectionStatusMap) {
            let requestBody = {
            
                query: `
                query {
                    allQuiz(sectionId: ${sectionId}, sectionQuiz: false, failed: ${failedFlag}){
                        id
                        type
                        details
                        sectionId
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
                
                var copyQuizzes = this.state.quizzes;
                copyQuizzes = copyQuizzes.concat(res.data.data.allQuiz);
                //Shuffle quizzes
                for (let i = copyQuizzes.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [copyQuizzes[i], copyQuizzes[j]] = [copyQuizzes[j], copyQuizzes[i]];
                }
                this.setState({quizzes: copyQuizzes});
                console.log("ALL QUIZZES:" );
                console.log(this.state.quizzes);

                //Save array of all ids that are shuffled
                var quizOrder = [];

                this.state.quizzes.forEach(quiz => {
                    quizOrder.push(quiz.id)
                })
                
                localStorage.setItem('finalQuizzesOrder', JSON.stringify(quizOrder));

            }).catch(err => {
                console.log(err);
            });

          }            

    }

    finalModalCheck = (data) => {
        this.props.finalModalCheck(data);
        this.setState({});
        
    }

    render(){
        return(
            <React.Fragment>
            {this.state.quizzes.length > 0 && 
                
                <QuizComponent 
                    courseId = {this.props.courseId}
                    quizzes = {this.state.quizzes}
                    finalQuiz = {true}
                    finalModalCheck = {this.finalModalCheck}
                />
            }       
            </React.Fragment>
        
            
        )
    }

}
    

  export default FinalQuiz;