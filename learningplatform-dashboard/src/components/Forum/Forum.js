import React, { Component } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import axios from '../../_services/axios';

class Forum extends Component {
    
    state = {
        categories: {}
    }

    componentDidMount = () => {
        let requestBody = {
            query: `
                query{
                    literalsCategoriesForum
                }
            `
        };

        //getting forum literals
        axios.post('/graphql',requestBody)
        .then(res => {
            if(res.status !== 200 && res.status !== 201){
            throw new Error('Failed!');
            }
            
            this.setState({categories: res.data.data.literalsCategoriesForum});
            
        }).catch(err => {
            console.log(err);
        });
    }

    render (){
        return(
            <React.Fragment>
                <div>
                    {this.state.categories.length  &&
                        <h1>gumnos mesthn ellada</h1>
                    }
                </div>
                <ReactBootStrap.Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Categories</th>
                            <th>Topics</th>
                            <th>Posts</th>
                            <th>Latest Post</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                        </tr>
                    </tbody>
                </ReactBootStrap.Table>
            </React.Fragment>
        )
    }
}

export default Forum;