import React, { Component } from 'react';
import {Card, Button} from 'react-bootstrap';

import axios from '../../../../_services/axios';


class Post extends Component {
    
    postReply = (userIdToReply, contentBody) => {
        //TODO implement reply
        //maybe redux to get it on the replycomponent
    } 

    render (){
        return(
            <React.Fragment>
                <Card>
                {this.props.title !== "" && 
                    <Card.Header as="h5">{this.props.title}</Card.Header>
                }
                    <Card.Body>
                        <Card.Text>
                            {this.props.body}
                        </Card.Text>
                        <Card.Text>
                            <small className="text-muted">{this.props.user.name} {this.props.user.surname}</small>  <br/>
                            <small className="text-muted">Published on {this.props.dateCreated}</small> <br/>
                        </Card.Text>
                        <Button variant="outline-dark" onClick={() => this.postReply(this.props.user.id, this.props.body)}>Reply</Button>
                    </Card.Body>
                </Card>
            </React.Fragment>
    )}

}

export default Post;