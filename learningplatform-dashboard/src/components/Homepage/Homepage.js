import React, { Component } from 'react';



class Homepage extends Component {
  
  state = {
    courses:  {}
  }

  componentDidUpdate = () => {
    console.log("UPDATE")
  }
  componentDidMount = () => {

    if(localStorage.getItem('userId')){
      let requestBody = {
        
        query: `
        query {
          userCourses(userId : ${parseInt(localStorage.getItem('userId'))}){
            id
            name
            image
            description
          }
        }
        `
    };

      //request to the backend
      fetch('http://localhost:8080/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if(res.status !== 200 && res.status !== 201){
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData)
        this.setState({courses: resData.data.userCourses});
        
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
    
    render (){

      return(
  
        <div>
          
            {this.state.courses.length && (
              
              <div className="courseParent">
                {this.state.courses.map((course,i) => 
                  <div key={i}>
                    <h2 className="courseName">{course.name}</h2>
                    <img src={course.image} className="courseImage" alt="Cinque Terre" width="304" height="236"/> 
                    
            
                    
                  </div>
                )}

                
              </div>
            )}

            
        </div>
        
  
      )
      
  
  
    }
      
  }

export default Homepage;