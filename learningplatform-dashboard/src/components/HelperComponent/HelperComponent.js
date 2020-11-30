import './HelperComponent.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Photo from '../../../src/components/Profile/UserProfile/Photo';
import helperLogo from '../../../src/images/helper.png';


class HelperComponent extends Component {
    render (){

        return(
            <React.Fragment>
                
                <h2 id="title"><Photo src={helperLogo} alt={"Helper"} size="small" />   Interactive Helper</h2>
                <hr></hr>
                {this.props.query !== "" && 
                    <p>Your answer:<p id = "queryInput">{this.props.query}</p></p> 
                }
                
                <p id = "helperInput">{this.props.helperModal}</p>
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