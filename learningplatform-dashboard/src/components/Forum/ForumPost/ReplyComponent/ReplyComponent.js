import React, { Component } from 'react';
import {Card, Button, Form} from 'react-bootstrap';

import axios from '../../../../_services/axios';


class ReplyComponent extends Component {



    render (){
        return(
            <React.Fragment>
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    
                    <Button variant="outline-dark">Sumbit Comment</Button>
                </Form>
            </React.Fragment>
        )
    }


}

export default ReplyComponent;