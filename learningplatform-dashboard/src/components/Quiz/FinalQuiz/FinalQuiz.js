import React, { Component } from 'react';

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
                var copyQuizzes = this.state.quizzes;
                copyQuizzes.push(resData.data.allQuiz);
                this.setState({quizzes: copyQuizzes});
                console.log(this.state.quizzes);
                
            })
            .catch(err => {
                console.log(err);
            });
          }
            

    }
    render(){
        return(
            <React.Fragment>
                <div>Final Quiz Component</div>

            {this.state.quizzes.length > 0 && 
                <div>TRUE DAT DOUBLE TRUE</div>
            }       
            </React.Fragment>
        
            
        )
    }

}
    

  export default FinalQuiz;