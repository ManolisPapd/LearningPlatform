import React, { Component } from 'react';
import {Card, Button, Form} from 'react-bootstrap';
import './ReplyComponent.css';

import axios from '../../../../_services/axios';


class ReplyComponent extends Component {

    constructor(props) {
        super(props);
        this.comment = React.createRef();
        this.userId = React.createRef();
      }

    submitHandler = (event) => {
        event.preventDefault();
        console.log("RCS:",this.comment.current.value)
    }


    render (){
        return(
            <React.Fragment>
                <form onSubmit={this.submitHandler}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label id="forumReplyCommentLabel">
                                Post your comment
                        </Form.Label>
                        <input as="textarea" rows={3} ref={this.comment} required/>
                    </Form.Group>
                    
                    <Button variant="outline-dark" type="submit"> Sumbit</Button>
                </form>
            </React.Fragment>
        )
    }


}

export default ReplyComponent;