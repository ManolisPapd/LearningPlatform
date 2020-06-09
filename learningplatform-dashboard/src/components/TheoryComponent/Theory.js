import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './Theory.css'

class TheoryComponent extends Component {

    componentDidMount = () => {
        
    }

    render (){
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
              autoplay: 0,
            },
          };
        
        return(
            <React.Fragment>
                <div>
                    {Array.from(this.props.material).map((item) =>
                        <React.Fragment key={Math.random()}>
                            <div className="title">{item.title}</div> <br/>
                            {item.video &&
                                <React.Fragment>
                                    <div>
                                        <YouTube 
                                            videoId={item.video} 
                                                opts={opts} 
                                                onReady={this._onReady} 
                                        />
                                    </div> <br/>
                                </React.Fragment>
                            }
                            {item.image &&
                                <React.Fragment>
                                    <img src={item.image} className="materialImage" alt="Cinque Terre" width="304" height="236"/><br/>
                                </React.Fragment>
                                
                            }
                            <div className="paragraph">{item.paragraph}</div><br/><br/>
                        </React.Fragment>
                            

                    )}
                </div>
            </React.Fragment>
            
        )
      
  
  
    }
      
  }

export default TheoryComponent;