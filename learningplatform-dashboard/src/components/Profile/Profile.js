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
        const photo = 'https://media-exp1.licdn.com/dms/image/C5603AQGacu22-YNmsg/profile-displayphoto-shrink_200_200/0?e=1597276800&v=beta&t=qLP7x7sj3-NIZ1uxeHpi0Nw07tpvPsrc4pwx80ScDEk';
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