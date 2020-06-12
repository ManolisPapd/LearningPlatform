import React, { Component } from 'react';
import './Course.css'
import {Tab, Nav,Row,Col,Accordion, Card, Button } from 'react-bootstrap';
import CardComponent from '../CardComponent/CardComponent';


class Course extends Component {
    state = {
        sections: {}
    }

    componentDidMount = () => {

        //Retrieve sections

        let requestBody = {
        
            query: `
            query {
                courseSections(courseId: ${this.props.course.id}){
                    id
                    name
                    courseId
                    information
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
            console.log(resData.data.courseSections)
            this.setState({sections: resData.data.courseSections });
            
        })
        .catch(err => {
            console.log(err);
        });
    }



    elementClickedHanler = (accElementKey) => {
        if(accElementKey === 1){
            if (typeof localStorage.getItem("statisticsCalled") !== 'undefined' && localStorage.getItem("statisticsCalled") !== null){
                
                if(localStorage.getItem("statisticsCalled") === "1"){
                    localStorage.setItem("statisticsCalled","0");
                    
                }
                else{
                    localStorage.setItem("statisticsCalled","1");
                    
                    
                    
                }

            }
            else{
                localStorage.setItem("statisticsCalled","1");
            }
            
            

        }
    }    

    render (){
        
        return(

            <React.Fragment>
                


                {(this.state.sections.length) && 

                    <Accordion>
                        {/* Iterate through response with sections */}
                        {this.state.sections.map((section,i) => 
                            <div key={i} onClick={() => this.elementClickedHanler(i)}>
                                <CardComponent 
                                    courseId = {this.props.course.id}
                                    eventKey = {i}
                                    section = {section}
                                    sectionsLength = {this.state.sections.length -1} //-1 because we don't want options to be on statistics
                                /> 
                                
                            </div>
                        )}
                        
                        
                    </Accordion>
                }
                
          </React.Fragment>

        )
    
       }
      
    }
      
export default Course;