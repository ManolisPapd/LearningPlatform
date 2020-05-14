import React, { Component } from 'react';
import './StatisticsComponent.css';
import {Bar} from 'react-chartjs-2';
import {Table, Container, Row,Col } from 'react-bootstrap';



class StatisticsComponent extends Component {
    
    render (){
        let data = {
            labels: ['Section 1', 'Section 2', 'Section 3', 'Section 4', 'Section 5', 'Section 6'],
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
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Section 1</td>
                        <td>CHECK</td>

                        </tr>
                        <tr>
                        <td>Section 2</td>
                        <td>CHECK</td>
                        </tr>
                        <tr>
                        <td>Section 3</td>
                        <td>X</td>
                        </tr>
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