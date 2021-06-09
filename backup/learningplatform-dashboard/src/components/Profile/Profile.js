import React, { Component } from 'react';
import UserProfile from './UserProfile/UserProfile/index';
import commentLogo from '../../images/commentLogo.png';


class Profile extends Component {
    componentDidMount = () => {
        if(!JSON.parse( localStorage.getItem('comments'))){
            var testObject =[];
            localStorage.setItem('comments', JSON.stringify(testObject));
        }
    }

    render (){
        const photo = 'https://media-exp1.licdn.com/dms/image/C5603AQEuVG75BunLkw/profile-displayphoto-shrink_200_200/0?e=1597276800&v=beta&t=FLOwYVGpiKX3BiPp4IpqU2Hv5wmIAZP2QSZWv2_onZ8';
        const userName = 'Manolis Papadimitriou';
        const location = 'Athens, Greece';
        const email = 'mcse19021@uniwa.gr';
    
        let comments = [];
        if(JSON.parse( localStorage.getItem('comments'))){
            comments = JSON.parse( localStorage.getItem('comments'));
        }        
        
        return(
            <div>

                    <div style={{ margin: '0 auto', width: '60%' }}>
                        <UserProfile 
                            photo={photo} 
                            userName={userName} 
                            location={location} 
                            email={email} 
                            initialComments={comments} 
                        />
                    </div>
            </div>

        )
      
  
  
    }
      
  }

export default Profile;