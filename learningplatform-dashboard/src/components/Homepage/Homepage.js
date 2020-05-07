import React, { Component,lazy, Suspense } from 'react';
// import Course from '../Course/Course';
import './Homepage.css';

const Course = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('../Course/Course')), 1200);
  });
});


class Homepage extends Component {
  
  state = {
    courses:  {},
    courseSelected: false,
    selectedCourse: null
  }

  componentWillUpdate = () => {

    //Allow reappearance of courses when you want to go home from a course+
    if(this.state.courseSelected){
      this.setState({courseSelected: false});
    }
    
  }
  
  componentDidMount = () => {
    localStorage.setItem('courseState',0);
    

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
    
  loadCourse = (courseId) =>{
    this.setState({courseSelected: true});
    localStorage.setItem('courseState',1);
    this.setState({selectedCourse: this.state.courses[courseId]});
    
  }
    render (){

      return(
  
        <div>
          
            {/* Present clickable courses */}
            {(this.state.courses.length && !this.state.courseSelected) ? (
              
              <div className="courseParent">

                
                {this.state.courses.map((course,i) => 
                  <div key={i} onClick={() => this.loadCourse(i)}>
                    <h2 className="courseName">{course.name}</h2>
                    <p className="courseDescription">{course.description}</p>
                    <img src={course.image} className="courseImage" alt="Cinque Terre" width="304" height="236"/> 
                    
                  </div>
                )}

                
              </div>
            ) : <div></div>}

            {/* When The course has been clicked it will be rendered */}
            {this.state.courseSelected && localStorage.getItem('courseState') === '1' && (
              <Suspense fallback={<div className="loader">Loading...</div>}>
                  <Course 
                    course = {this.state.selectedCourse}
                  />
              </Suspense>
              
            )}

            
        </div>
        
  
      )
      
  
  
    }
      
  }

export default Homepage;