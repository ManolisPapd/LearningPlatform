import React, { Component } from 'react';
import {ListGroup} from 'react-bootstrap';
import './QuizResults.css';
import axios from '../../../../_services/axios';

class QuizResults extends Component {
    state = {
        sections: null,
        resultsPresent: {},
        resultsEntries: {},
        flagForFinalQuiz: 0
    }

    componentDidMount = () =>{
        //We need to determine if it has more than one sections
        var sectionsArray = []
        this.props.quizzes.map((quiz,i) => 
        sectionsArray.push(quiz.sectionId));
        var sectionsSet = new Set(sectionsArray)

        // this.setState({sections: sectionsSet});

        //Check if set bigger than one, it means it's final, so the post add forSection: false
        var forSection = true;
        if(sectionsSet.size > 1){
            forSection = false;
        }
        //If this flag is 1 then it means we are in final quiz and we need to reorder the results

        sectionsSet.forEach((sectionId) => {
            //Get user quizzes for given sectionId
            let requestBody = {
                
                query: `
                query {
                    getQuizzesStatus(userId: ${localStorage.getItem('userId')}, sectionId: ${sectionId}, sectionQuiz: ${forSection}){
                        id
                        userId
                        quizId
                        status
                    }
                }
                `
            };

            axios.post('/graphql',requestBody)
            .then(res => {
                if(res.status !== 200 && res.status !== 201){
                throw new Error('Failed!');
                }
                
                var tmpResultsPresent = this.state.resultsPresent;
                if(!tmpResultsPresent[sectionId]){
                    tmpResultsPresent[sectionId] = [];
                    
                }


                if(this.props.finalQuiz){
    
                    var intLocalStorageArray = JSON.parse(localStorage.getItem('finalQuizzesOrder')).map(Number);

                    var tmpArray = Object.create(res.data.data.getQuizzesStatus);
                    tmpArray.sort(function(a, b){  
                        return intLocalStorageArray.indexOf(a.quizId) - intLocalStorageArray.indexOf(b.quizId);
                    });


                    for(var i = 0; i < intLocalStorageArray.length; i++){
                        var attribute = intLocalStorageArray[i];
                        tmpArray.forEach((quiz) => {
                            
                            if(quiz.quizId === attribute){
                                console.log(quiz.quizId + "\t Will become \t" + i);
                                var tmpResultsEntries = this.state.resultsEntries;
                                tmpResultsEntries[attribute] = i;
                                this.setState({resultsEntries:tmpResultsEntries});
                                
                                
                            }
                        })
                    }

                   
                    tmpResultsPresent[sectionId] = tmpArray;
                    this.setState({resultsPresent: tmpResultsPresent });
                }
                else{
                    tmpResultsPresent[sectionId] = res.data.data.getQuizzesStatus;
                    this.setState({resultsPresent: tmpResultsPresent });
                }

            }).catch(err => {
                console.log(err);
            });
            
        })


    }

    render (){
        


        return(
            <React.Fragment>
                {this.state.resultsPresent &&

                    <React.Fragment>
                            <div className="quizResultsHeader">Final Quiz Results</div> <hr />
                            {
                                (Object.entries(this.state.resultsPresent).map((sectionResults) => 
                                    <React.Fragment key = {sectionResults[0]} >

                                        <ListGroup horizontal>
                                            <ListGroup.Item variant="light">Section { (sectionResults[0] - (Math.floor(sectionResults[0]/10)*9)) - 2}</ListGroup.Item>
                                            {sectionResults[1].map((quizResults, key) =>
                                                <React.Fragment key={quizResults.id}>
                                                    {( this.props.finalQuiz) ?
                                                        quizResults.status ? (<ListGroup.Item className="successLabel" variant="success" key={quizResults.quizId}>{this.state.resultsEntries[quizResults.quizId] + 1}</ListGroup.Item>) : 
                                                            (<ListGroup.Item className="dangerLabel" variant="danger" key={quizResults.quizId}>{this.state.resultsEntries[quizResults.quizId] + 1}</ListGroup.Item>)
                                                         : quizResults.status ? (<ListGroup.Item className="successLabel" variant="success" key={quizResults.quizId}>{key + 1}</ListGroup.Item>) : 
                                                         (<ListGroup.Item className="dangerLabel" variant="danger" key={quizResults.quizId}>{key + 1}</ListGroup.Item>)

                                                    }
                                                </React.Fragment>
                                                

                                            )}
                                            
                                        </ListGroup> <br />
                                        {/* <div>{sectionResults[1]}</div> */}
                                        
                                    </React.Fragment>
                                    
                                    
                                        
                                ))
                                
                                
                            }

                    </React.Fragment>
                }
                
            </React.Fragment>

        )

    }
}

export default QuizResults;