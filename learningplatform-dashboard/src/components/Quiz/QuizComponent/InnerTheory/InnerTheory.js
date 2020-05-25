import React, { Component } from 'react';
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
            console.log(resData.data.getSection.information);
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
                            (this.state.sectionInfo.id === "video_material" ?
                                <React.Fragment>
                                    {this.state.sectionInfo.paragraph}
                                    <div>EDO VIDEO</div>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    {this.state.sectionInfo.paragraph}
                                    <div>EDO TEXT</div>
                                </React.Fragment>
                            )
                        }</div>
            </React.Fragment>
        )
}


}

export default InnerTheory;