import React, { Component } from 'react';
import './Theory.css'

class TheoryComponent extends Component {

    componentDidMount = () => {
        console.log("POTUSES");
        console.log(this.props.material);
    }

    render (){
        
        return(
            <React.Fragment>
                <div>
                    {Array.from(this.props.material).map((item) =>
                        <React.Fragment>
                            <div>{item.title}</div> <br/>
                            <div>{item.paragraph}</div><br/><br/>
                        </React.Fragment>
                            

                    )}
                </div>
            </React.Fragment>
            
        )
      
  
  
    }
      
  }

export default TheoryComponent;