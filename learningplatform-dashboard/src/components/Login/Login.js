import React, { Component } from 'react';
import AuthContext from '../../context/auth-context';
import '../../context/loader';
import logo from '../../images/logo.png';
import './Login.css'

class Login extends Component {

    state = {
      loading : false,
      emailActiveStatus: "",
      passwordActiveStatus: "",
      credentialsStatus: true
    }

    static contextType = AuthContext;

    constructor(props) {
      super(props);
      this.emailEl = React.createRef();
      this.passwordEl = React.createRef();
    }

    //read email and password and send it to the back
    submitHandler = (event) => {
      
      event.preventDefault(); //prevent requests from being sent
      const email = this.emailEl.current.value;
      const password = this.passwordEl.current.value;

      //TODO better validation
      if(email.trim().length === 0 || password.trim().length === 0){
        return;
      }


      let requestBody = {
          query: `
          query {
            login(email : "${email}", password : "${password}"){
              id
              token
              tokenExpiration
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
        if(resData.data.login){
          this.setState({credentialsStatus: true});
          this.context.login(
            resData.data.login.token, 
            resData.data.login.id, 
            resData.data.login.tokenExpiration
            )
        }
        //User gave bad credentials
        else{
            this.setState({credentialsStatus: false});
        }
      })
      .catch(err => {
        console.log(err);
      });

    };

    handleEmailInputChange = (event) =>  {
      
      //Keeping email and password on top if it contains a value
      if(event.target.value){
        this.setState({activateStatusEmail: "used"});
      }
      else{
        this.setState({activateStatusEmail: ""});
      }

    }

    handlePasswordInputChange = (event) =>  {
      
      //Keeping email and password on top if it contains a value
      if(event.target.value){
        this.setState({passwordActiveStatus: "used"});
      }
      else{
        this.setState({passwordActiveStatus: ""});
      }

    }

    render (){
        
      return(
        <React.Fragment>

       
          <hgroup>
            <h1>Learning Platform</h1>
          </hgroup>

          <form className="auth-form" onSubmit={this.submitHandler}>
            <div className="group">
              {/* Deactivate movement of the inputs */}
        
              <input className={`${this.state.activateStatusEmail}`} 
                          type="email" id="email" ref={this.emailEl} 
                          required
                          onChange={this.handleEmailInputChange}></input>
              <span className="highlight"></span><span className="bar"></span>
              <label htmlFor="email">e-mail</label>

              
            </div>
            <div className="group">
              <input className={`${this.state.passwordActiveStatus}`} 
                          type="password" id="password" 
                          ref={this.passwordEl} 
                          required
                          onChange={this.handlePasswordInputChange}></input>
              <span className="highlight"></span><span className="bar"></span>
              <label htmlFor="password">password</label><br />
              {!this.state.credentialsStatus && 
                    <div className="alert alert-danger">
                      <strong>Wrong Credentials!</strong>
                    </div>}
            </div>
            <button type="submit" className="button buttonBlue">
              Sign In
              <div className="ripples buttonRipples"><span className="ripplesCircle"></span></div>
            </button>
          </form>



          <footer><a href="https://github.com/mpapd/LearningPlatform" target="_blank"><img className="logo" src={logo}/></a>
            <p>MSc of Computer Science and Technology <a href="http://msc-cse.ice.uniwa.gr/" target="_blank">University of West Attica</a></p>
          </footer>

        </React.Fragment>
        
  
      )
      
  
  
    }
      
  }

export default Login;