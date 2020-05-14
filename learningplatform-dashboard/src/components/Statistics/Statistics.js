import React, { Component } from 'react';
import StatisticsComponent from './StatisticsComponent/StatisticsComponent';
import './Statistics.css';





class Statistics extends Component {

    componentDidMount = () => {


        //Get section quiz status
        for(let i = 2; i < this.props.sectionsLength -1; i++ ){
            //Check if user has failed this section
            //Don't forget add 1 to i because section counting begins from 1
            let requestBody = {
        
                query: `
                query {
                    checkUserSectionStatus(userId:${localStorage.getItem('userId')}, sectionId: ${i+1}, sectionQuiz:true){
                        failed
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
                console.log("SECTION STATS")
                console.log(resData.data)
                
                
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
                console.log("FINAL SECTION STATS")
                console.log(resData.data)
                
                
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
                <StatisticsComponent 
                    title = "Section Quizzes Statistics"
                />
                <hr />
                <StatisticsComponent 
                    title = "Final Quiz Statistics"
                />
            </div>
        )
    
    }
      
}
      
export default Statistics;