import React, { Component } from 'react';
import {ListGroup} from 'react-bootstrap';
import './QuizResults.css';

class QuizResults extends Component {
    state = {
        sections: null,
        resultsPresent: {},
        resultsEntries: []
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
                var tmpResultsPresent = this.state.resultsPresent;
                if(!tmpResultsPresent[sectionId]){
                    tmpResultsPresent[sectionId] = [];
                    
                }

                tmpResultsPresent[sectionId] = resData.data.getQuizzesStatus;
                this.setState({resultsPresent: tmpResultsPresent });
                console.log(this.state.resultsPresent);

                
            })
            .catch(err => {
                console.log(err);
            });
        })

    }

    render (){
        


        return(
            <React.Fragment>
                {this.state.resultsPresent &&

                    <React.Fragment>
                            <div className="quizResultsHeader">Quiz Results</div> <hr />
                            {
                                (Object.entries(this.state.resultsPresent).map((sectionResults) => 
                                    <React.Fragment key = {sectionResults[0]} >

                                        <ListGroup horizontal>
                                            <ListGroup.Item variant="light">Section {sectionResults[0] - 2}</ListGroup.Item>
                                            {sectionResults[1].map((quizResults) =>
                                                <React.Fragment key={quizResults.id}>
                                                    {quizResults.status ? (<ListGroup.Item className="successLabel" variant="success" key={quizResults.id}>{quizResults.id}</ListGroup.Item>) : 
                                                        (<ListGroup.Item className="dangerLabel" variant="danger" key={quizResults.id}>{quizResults.id}</ListGroup.Item>)
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