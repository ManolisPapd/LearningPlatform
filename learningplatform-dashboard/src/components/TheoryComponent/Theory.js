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
                            {item.title && 
                                <React.Fragment><hr/><div className="title">{item.title}</div> <br/></React.Fragment>
                            
                            }
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
                                    <img src={item.image} className="materialImage" alt="Cinque Terre"  /><br/>
                                </React.Fragment>
                                
                            }
                            {item.paragraph && <React.Fragment><div className="paragraph">{item.paragraph}</div> <br/></React.Fragment>}
                            
                        </React.Fragment>
                            

                    )}
                </div>
            </React.Fragment>
            
        )
      
  
  
    }
      
  }

export default TheoryComponent;