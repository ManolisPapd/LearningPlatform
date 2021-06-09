import './HelperComponent.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import Photo from '../../../src/components/Profile/UserProfile/Photo';
import helperLogo from '../../../src/images/helper.png';


class HelperComponent extends Component {
    render (){

        return(
            <React.Fragment>
                
                <h2 id="title"><Photo src={helperLogo} alt={"Helper"} size="small" />   Interactive Helper</h2>
                <hr></hr>
                {(this.props.query !== "" && this.props.query !== null) &&
                    <div>
                        <p>Your answer:<p id = "queryInput">{this.props.query}</p></p> 
                        
                        <p>Error type: <p id = "queryInput">{this.props.helperModal.data.errorAnalyzer[0].type}</p></p>
                        <ReactBootStrap.Table striped bordered hover bordered={ false }>
                            <thead>
                                <tr>
                                    {(this.props.helperModal.data.errorAnalyzer[0].type === 'Syntax')  
                                        ? <th id="forumTitle">Syntax Error Explanation</th>
                                        : <div>
                                            <th id="forumTitle">Given Input</th>
                                            <th id="forumTitle">Correct Input</th>
                                        </div>
                                    }
                                    
                                </tr>
                            </thead>
                        

                            { (this.props.helperModal.data.errorAnalyzer.map((error, i) => 
                                <tr>
                                    <td><div style={{ textAlign: "left" }}>{error.reason.split("#PLACEHOLDER#")[0]}</div></td>
                                    <td><div style={{ textAlign: "left" }}>{error.reason.split("#PLACEHOLDER#")[1]}</div></td>
                                </tr>
                            ))}

                        </ReactBootStrap.Table>
                    </div>
                    
                    
                }
                
                
                {/* <p id = "helperInput">{this.props.helperModal}</p> */}
            </React.Fragment>
            
        )
    }

}

const mapStateToProps = state => {
    return {
        helperModal: state.helper.helperModal,
        query: state.helper.query
    }
};
export default connect(mapStateToProps)(HelperComponent);