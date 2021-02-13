import React, { Component } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import axios from '../../../_services/axios';


class ForumContent extends Component {
    state = {
        topics: {},
        posts: {},
        currentCategory: false,
        topicSelected: null
    }

    componentDidMount = () => {
        this.callData();
        this.setState({currentCategory: this.props.category});
    }

    componentDidUpdate  = () => {
        if(this.state.currentCategory != this.props.category){
            this.callData();
            this.setState({currentCategory: this.props.category});
        }
        
    }

    callData = () => {
        let requestBody = {
        
            query: `
            query {
                getForumData(name : "${this.props.category}"){
                    topics{
                      id
                      name
                      posts{
                        id
                        title
                        body
                        user{
                          id
                          name
                          surname
                          email
                        }
                        dateCreated
                        dateNewPost
                        comments{
                          id
                          body
                          user{
                          id
                          name
                          surname
                          email
                        }
                          dateCreated
                        }
                      }
                    }
                    posts{
                        id
                        title
                        body
                        user{
                          id
                          name
                          surname
                          email
                        }
                        dateCreated
                        dateNewPost
                        comments{
                          id
                          body
                          user{
                          id
                          name
                          surname
                          email
                        }
                          dateCreated
                        }
                      }
                  }
            }
            `
        };

        //axios
        axios.post('/graphql',requestBody)
        .then(res => {
            if(res.status !== 200 && res.status !== 201){
            throw new Error('Failed!');
            }
            
            console.log("RCS: called", res.data.data.getForumData);
            this.setState({topics: res.data.data.getForumData.topics, posts: res.data.data.getForumData.posts});
            
            
        }).catch(err => {
            console.log(err);
        });
    }

    loadTopic = (topic) => {
        this.setState({topicSelected: topic});
    }

    render (){
        return(
            <React.Fragment>
                
                {this.state.topics.length > 0  &&
                        <div>
                            <h3 id="forumHeader">Home>Forum>{this.props.category}>Topics</h3>
                            <ReactBootStrap.Table striped bordered hover bordered={ false }>
                                <thead>
                                    <tr>
                                        <th id="forumTitle">Title</th>
                                        <th id="forumTitle"><div style={{ textAlign: "center" }}>Posts</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.topics.map((topic, key) =>
                                        <tr>
                                            <td id="categoryTableItem" onClick={() => this.loadTopic(topic.name)}>{topic.name}</td>
                                            <td><div style={{ textAlign: "center" }}>{topic.posts.length}</div></td>
                                            
                                        </tr>
                                    )}
                                    
                                </tbody>
                            </ReactBootStrap.Table>
                        </div>
                }
                
                {this.state.posts.length > 0  &&
                        <div>
                            <h3 id="postsHeader">Home>Forum>{this.props.category}>Posts</h3>
                            <ReactBootStrap.Table striped bordered hover bordered={ false }>
                                <thead>
                                    <tr>
                                        <th id="forumTitle">Title</th>
                                        <th id="forumTitle"><div style={{ textAlign: "center" }}>Comments</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.posts.map((post, key) =>
                                        <tr>
                                            <td id="categoryTableItem" >{post.title}</td>
                                            <td><div style={{ textAlign: "center" }}>{post.comments.length}</div></td>
                                            
                                        </tr>
                                    )}
                                    
                                </tbody>
                            </ReactBootStrap.Table>
                        </div>
                }

                {this.state.topicSelected &&
                    <div>
                        <ForumContent 
                                category = {this.state.topicSelected}
                        />
                    </div>

                }


            </React.Fragment>
        )
    }
}

export default ForumContent;