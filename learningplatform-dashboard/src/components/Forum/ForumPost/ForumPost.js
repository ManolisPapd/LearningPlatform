import React, { Component } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import axios from '../../../_services/axios';
import Post from './Post/Post';
import ReplyComponent from './ReplyComponent/ReplyComponent';

class ForumPost extends Component {

    render (){
        return(
            <React.Fragment>
                <Post 
                    title = {this.props.post.title}
                    body = {this.props.post.body}
                    dateCreated = {this.props.post.dateCreated}
                    user = {this.props.post.user}
                    headerFlag = {true}
                />
                
                <br/>

                {this.props.post.comments.map((comment, key) =>
                    <div>
                        <Post 
                            title = ""
                            body = {comment.body}
                            dateCreated = {comment.dateCreated}
                            user = {comment.user}
                            headerFlag = {false}
                        />
                        <br></br>
                    </div>
                )}
                <ReplyComponent/>
            </React.Fragment>
    )}

}

export default ForumPost;