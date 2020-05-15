import React, { Component } from 'react';
import './StatisticsComponent.css';
import {Bar} from 'react-chartjs-2';
import {Table, Container, Row,Col } from 'react-bootstrap';



class StatisticsComponent extends Component {

    state = {
        labels: [],
        sectionValues: []
    }

    componentDidMount = () => {


        for (let [key, value] of this.props.statusMap) {
            var tmpLabels = this.state.labels;
            var sectionId = key - 1;
            var sectionLabel = 'Section ' + sectionId;
            tmpLabels.push(sectionLabel);
            var tmpSectionvalues = this.state.sectionValues
            //If it's not completed the value will not boolean
            if(!this.props.completedStatusMap.get(key)){
                tmpSectionvalues.push("notcompleted");
            }
            else{
                
                tmpSectionvalues.push(value);
                
            }

            this.setState({labels: tmpLabels, sectionValues: tmpSectionvalues})
            
        }

        
    }
    
    render (){
        let data = {
            labels: this.state.labels,
            datasets: [
              {
                
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 2,
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [3, 4, 2, 1, 0, 3],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56'
                    ]
                    
              }
              
            ]
        
        };



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
                                <td>{i === "notcompleted" ? <div className="circleIcon"><i className="fa fa-circle"></i></div> :
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
                                    }
                                }],
                                xAxes: [{
                                    scaleLabel: {
                                    display: true,
                                    labelString: 'Sections'
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