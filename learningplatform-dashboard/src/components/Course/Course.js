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
            console.log(resData.data.courseSections)
            this.setState({sections: resData.data.courseSections });
            
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    

    render (){
        
        return(

            <React.Fragment>

                {(this.state.sections.length) && 

                    <Accordion>
                        {/* Iterate through response with sections */}
                        {this.state.sections.map((section,i) => 
                        <div key={i}>
                            {/* TODO give me tabs for this section and pass it as props */}
                            <CardComponent 
                                eventKey = {i}
                                section = {section}
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