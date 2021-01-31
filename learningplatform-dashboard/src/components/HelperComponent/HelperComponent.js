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
                {(this.props.query !== "" && this.props.query !== null) &&
                    <div>
                        <p>Your answer:<p id = "queryInput">{this.props.query}</p></p> 
                        
                        {console.log("RCS: AA ",this.props.helperModal)}
                        <p>Error type: <p id = "queryInput">{this.props.helperModal.data.errorAnalyzer[0].id}</p></p>
                        <p>Reason(s): </p>
                        { (this.props.helperModal.data.errorAnalyzer.map((error, i) => 
                            <div key={i}> 
                                <p><p id = "queryInput"> {error.reason}</p></p> 
                            </div>
                        ))}
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