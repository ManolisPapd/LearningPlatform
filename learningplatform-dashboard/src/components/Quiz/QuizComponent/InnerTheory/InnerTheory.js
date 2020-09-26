import React, { Component } from 'react';
import TheoryComponent from '../../../TheoryComponent/Theory';
import './InnerTheory.css';
import axios from '../../../../_services/axios';



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

        axios.post('/graphql',requestBody)
        .then(res => {
            if(res.status !== 200 && res.status !== 201){
            throw new Error('Failed!');
            }
            
            this.setState({sectionInfo: JSON.parse(res.data.data.getSection.information)})

        }).catch(err => {
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