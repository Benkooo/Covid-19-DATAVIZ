import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar
} from 'recharts';
import {Card, Checkbox, FormControlLabel, Typography} from '@material-ui/core'

import '../styles/Chart.css'

class Chart extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activeFrance: false,
      activeWorld: true
    }
  }

  handleChangeWorld = e => {
    this.setState({
      activeWorld: !this.state.activeWorld
    })
  }

  handleChangeFrance = () => {
    this.setState({
      activeFrance: !this.state.activeFrance
    })
  }

  render() {

    const dataWorld = this.props.data.World
    const dataFrance = this.props.data.France

    return (
        <div className="ChartContainer">
            <Card style={{width: "100%", height: "31vh", backgroundColor: "#2A2A28"}}>
                <Typography variant="h6" style={{fontSize: '15px', color: 'white'}}>Confirmed cases</Typography>
                <ResponsiveContainer>
                    <LineChart
                        width={500}
                        height={300}
                        data={dataWorld}
                        margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {
                          this.state.activeWorld &&
                            <Line type="monotone" dataKey="total" stroke="#F6B352" activeDot={{ r: 8 }} />
                        }
                    </LineChart>
                </ResponsiveContainer>
            </Card>
            <FormControlLabel
            control={
            <Checkbox
              checked={this.state.activeWorld}
              onChange={this.handleChangeWorld}
              name="checkedB"
              color="primary"
              style={{color: '#F6B352'}}
            />
            }
            label="World"
            />
            <FormControlLabel
            control={
            <Checkbox
              checked={this.state.activeFrance}
              onChange={this.handleChangeFrance}
              name="checkedB"
              color="primary"
            />
            }
            label="France"
            />
        </div>
    );
  }
}

export default Chart;