import './Forum.css'
import React, { Component } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import axios from '../../_services/axios';
import ForumContent from './ForumContent/ForumContent';

class Forum extends Component {
    
    state = {
        categories: {},
        categorySelected: null
    }

    componentDidMount = () => {
        let requestBody = {
            query: `
                query{
                    literalsCategoriesForum{
                        categories{
                            category
                            categoryInformation
                            topics
                            posts
                            latestComment{
                                user{
                                    id
                                    name
                                    surname
                                    email
                                }
                                date
                            }
                        } 
                      }
                }
            `
        };

        //getting forum literals
        axios.post('/graphql',requestBody)
        .then(res => {
            if(res.status !== 200 && res.status !== 201){
            throw new Error('Failed!');
            }
            
            this.setState({categories: res.data.data.literalsCategoriesForum.categories});
        }).catch(err => {
            console.log(err);
        });
    }

    loadCategory = (category) => {
        this.setState({categorySelected: category});
        
    }

    render (){
        return(
            <React.Fragment>
                <div>
                    <h3 id="forumHeader">Home>Forum</h3>
                    {this.state.categories.length  &&
                        <div>
                            <ReactBootStrap.Table striped bordered hover bordered={ false }>
                                <thead>
                                    <tr>
                                        <th id="forumTitle">Categories</th>
                                        <th id="forumTitle"><div style={{ textAlign: "center" }}>Posts</div></th>
                                        <th id="forumTitle"><div style={{ textAlign: "center" }}>Topics</div></th>
                                        <th id="forumTitle"><div style={{ textAlign: "center" }}>Latest Comment</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.categories.map((category, key) =>
                                        <tr>
                                            <td id="categoryTableItem" onClick={() => this.loadCategory(category.category)}>{category.category} <p id="categoryInformation">{category.categoryInformation}</p></td>
                                            <td><div style={{ textAlign: "center" }}>{category.posts}</div></td>
                                            <td><div style={{ textAlign: "center" }}>{category.topics}</div></td>
                                            <td><div style={{ textAlign: "center" }}>{category.latestComment.date} {category.latestComment.user.name!=="" && "from"} {category.latestComment.user.name} {category.latestComment.user.surname}</div></td>
                                        </tr>
                                    )}
                                    
                                </tbody>
                            </ReactBootStrap.Table>
                        </div>
                    }

                    {this.state.categorySelected && 
                        <div>
                            <ForumContent 
                                category = {this.state.categorySelected}
                            />
                        </div>
                    }
                </div>
                
            </React.Fragment>
        )
    }
}

export default Forum;