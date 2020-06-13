import React, { Component } from 'react';
import './StatisticsComponent.css';
import {Bar} from 'react-chartjs-2';
import {Table, Container, Row,Col } from 'react-bootstrap';
import ReactTooltip from "react-tooltip";




class StatisticsComponent extends Component {

    state = {
        labels: [],
        sectionValues: [],
        answers: [],
        backgroundColors: [],
        hoverColors: []

    }

    componentDidMount = () => {


        for (let [key, value] of this.props.statusMap) {
            var tmpLabels = this.state.labels;
            var sectionId = key - 1;
            var sectionLabel = 'Section ' + sectionId;
            tmpLabels.push(sectionLabel);
            var tmpSectionvalues = this.state.sectionValues
            var tmpAnswers = this.state.answers;
            var tmpBackgroundColors = this.state.backgroundColors;
            var tmpHoverColors = this.state.hoverColors;

            //If it's not completed the value will not boolean
            if(!this.props.completedStatusMap.get(key)){
                tmpSectionvalues.push("notcompleted");
            }
            else{
                
                tmpSectionvalues.push(value);
                
                
            }

            tmpAnswers.push(this.props.answersMap.get(key))
            if(value){
                tmpBackgroundColors.push('#ff0000')
                tmpHoverColors.push('#910303')
            }
            else{
                tmpBackgroundColors.push('#48e827')
                tmpHoverColors.push('#1b9103')
            }

            //Sort tmpLabels, tmpSectionvalues and tmpAnswers
            for (var i = 1; i < tmpLabels.length; i++)
                for (var j = 0; j < i; j++)
                    if (tmpLabels[i] < tmpLabels[j]) {
                        var x = tmpLabels[i];
                        tmpLabels[i] = tmpLabels[j];
                        tmpLabels[j] = x;

                        var y = tmpSectionvalues[i];
                        tmpSectionvalues[i] = tmpSectionvalues[j];
                        tmpSectionvalues[j] = y;

                        var z = tmpAnswers[i];
                        tmpAnswers[i] = tmpAnswers[j];
                        tmpAnswers[j] = z;

                        var a = tmpBackgroundColors[i];
                        tmpBackgroundColors[i] = tmpBackgroundColors[j];
                        tmpBackgroundColors[j] = a;
                }

            this.setState({labels: tmpLabels, sectionValues: tmpSectionvalues, answers: tmpAnswers, backgroundColors: tmpBackgroundColors, hoverColors: tmpHoverColors})

            
        }

        
    }
    
    render (){
        let data = {
            labels: this.state.labels,
            datasets: [
              {

                data: this.state.answers,
                backgroundColor: this.state.backgroundColors,
                    hoverBackgroundColor: this.state.hoverColors
                    
              }
              
            ]
        
        };

        let circle = 
        <div className="example-jsx">
                
            <div className="side">
                <a data-tip data-for="global">
                <i className="fa fa-circle"></i>
                </a>
            </div>
            <ReactTooltip id="global" aria-haspopup="true">
                <p>You haven't completed the quiz for this section</p>
            </ReactTooltip>
        </div>


        return(
        <React.Fragment>
            <div className="statisticComponent">
                
                
              
                <h2>{this.props.title}</h2>
                

                <Container>
                        <Row>
                        <Col xs> <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Section</th>
                        <th className="statusHeader">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sectionValues.map((i,j) => 
                            <tr key = {Math.random()}>
                                <td><div className="sectionHeaderTable">Section {j+1}</div></td>
                                <td>{i === "notcompleted" ? <div className="circleIcon">{circle}</div> :
                                    !i ? <div className="checkIcon"><i className="fa fa-check"></i></div> : <div className="xIcon"><i className="fa fa-times"></i></div>
                                }</td>
                            </tr>
                        )}
                        


                    </tbody>
                    </Table></Col>

                    <Col xs={{ order: 12 }}><Bar 
                        data={data} 
                        width={20}
                        height={20}
                        options={{ 
                            maintainAspectRatio: true, 
                            legend: { display: false },
                            scales: {
                                yAxes: [{
                                    scaleLabel: {
                                    display: true,
                                    labelString: 'Correct Answers'
                                    },
                                    ticks: {
                                        beginAtZero:true,
                                        min: 0,
                                        max: 7    
                                    }
                                  
                                }],
                                xAxes: [{
                                    scaleLabel: {
                                    display: true,
                                    labelString: 'Sections'
                                    },
                                    ticks: {
                                        beginAtZero:true,
                                        min: 0,
                                        max: 7  
                                    }
                                }]
                                }
                            }
                        }
                    /></Col>

                    </Row>
                </Container>
            

            </div>
        </React.Fragment>
    )
    
  }
      
}
      
export default StatisticsComponent;