import React, { Component } from 'react';
import TheoryComponent from '../../../TheoryComponent/Theory';
import './InnerTheory.css';




class InnerTheory extends Component {

    state = {
        sectionInfo: null
    }

    componentDidMount = () => {
        let requestBody = {
        
            query: `
            query {
                getSection(courseId:${this.props.courseId}, sectionId:${this.props.sectionId}){
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
            
            this.setState({sectionInfo: JSON.parse(resData.data.getSection.information)})
            
            
        })
        .catch(err => {
            console.log(err);
        });

    }

    render (){

        return(
            
            <React.Fragment>
                <div>{
                        this.state.sectionInfo &&
                            (this.state.sectionInfo.id === "text_material" &&
                                
                                <React.Fragment>
                                    <TheoryComponent 
                                        material = {this.state.sectionInfo.paragraph}
                                    />
                                    {/* {this.state.sectionInfo.paragraph} */}
                                    
                                </React.Fragment>
                            )
                        }</div>
            </React.Fragment>
        )
}


}

export default InnerTheory;