import './HelperComponent.css';
import { connect } from 'react-redux';

import React, { Component } from 'react';

class HelperComponent extends Component {
    render (){

        return(
            <React.Fragment>
                <h1>HELPER TEST</h1>
                <p>{this.props.helperModal}</p>
            </React.Fragment>
            
        )
    }

}

const mapStateToProps = state => {
    return {
        helperModal: state.helper.helperModal
    }
};
export default connect(mapStateToProps)(HelperComponent);