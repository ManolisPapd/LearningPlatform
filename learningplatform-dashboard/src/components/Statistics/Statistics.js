import React, { Component } from 'react';
import StatisticsComponent from './StatisticsComponent/StatisticsComponent';
import './Statistics.css';





class Statistics extends Component {


    state = {
        sectionStatus: new Map(),
        finalSectionStatus: new Map(),

        completedStatus: new Map(),
        finalCompletedStatus: new Map(),

        answersStatus: new Map(),
        finalAnswersStatus: new Map(),
    }

    componentDidMount = () => {

        console.log("Statistics Mount")

        this.getData();

       
    }



      getData = () => {
           //Get section quiz status
        for(let i = 2; i < this.props.sectionsLength -1; i++ ){
            //Check if user has failed this section
            //Don't forget add 1 to i because section counting begins from 1
            let requestBody = {
        
                query: `
                query {
                    checkUserSectionStatus(userId:${localStorage.getItem('userId')}, sectionId: ${i+1}, sectionQuiz:true){
                        failed
                        completed
                        answers
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
                //Want to save for each section the status
                var tmp = this.state.sectionStatus;
                var tmpCompleted = this.state.completedStatus;
                var tmpAnswers = this.state.answersStatus;

                tmp.set(i, resData.data.checkUserSectionStatus.failed);
                tmpCompleted.set(i, resData.data.checkUserSectionStatus.completed);
                tmpAnswers.set(i, resData.data.checkUserSectionStatus.answers);
                this.setState({sectionStatus:tmp, completedStatus:tmpCompleted, answersStatus: tmpAnswers });
                
                
            })
            .catch(err => {
                console.log(err);
            });

        }

        //Get final Quiz sections status
        for(let i = 2; i < this.props.sectionsLength -1; i++ ){
            //Check if user has failed this section
            //Don't forget add 1 to i because section counting begins from 1
            let requestBody = {
        
                query: `
                query {
                    checkUserSectionStatus(userId:${localStorage.getItem('userId')}, sectionId: ${i+1}, sectionQuiz:false){
                        failed
                        completed
                        answers
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
                //Want to save for each section the status

                var tmpCore = this.state.finalSectionStatus;
                var tmpCompletedCore = this.state.finalCompletedStatus;
                var tmpAnswersCore = this.state.finalAnswersStatus;

                tmpCore.set(i, resData.data.checkUserSectionStatus.failed);
                tmpCompletedCore.set(i, resData.data.checkUserSectionStatus.completed);
                tmpAnswersCore.set(i, resData.data.checkUserSectionStatus.answers);
                this.setState({finalSectionStatus:tmpCore, finalCompletedStatus:tmpCompletedCore, finalAnswersStatus:tmpAnswersCore  });
  
                
            })
            .catch(err => {
                console.log(err);
            });

        }

        //Get answers for each section quiz
        //Get answers for each final section quiz
      }

    render (){
        

        return(
            <div>
                {this.state.sectionStatus.size === this.props.sectionsLength -3 &&
                    <StatisticsComponent 
                        title = "Section Quizzes Statistics"
                        statusMap = {this.state.sectionStatus}
                        completedStatusMap = {this.state.completedStatus}
                        answersMap = {this.state.answersStatus}
                    />
                }
                <hr />
                {this.state.finalSectionStatus.size === this.props.sectionsLength -3 &&
                    <StatisticsComponent 
                        title = "Final Quiz Statistics"
                        statusMap = {this.state.finalSectionStatus}
                        completedStatusMap = {this.state.finalCompletedStatus}
                        answersMap = {this.state.finalAnswersStatus}
                    />
                }
                

                <hr />

            </div>
        )
    
    }
      
}
      
export default Statistics;