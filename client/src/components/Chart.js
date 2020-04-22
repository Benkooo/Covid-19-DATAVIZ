import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar
} from 'recharts';
import {Card, Checkbox, FormControlLabel, Typography} from '@material-ui/core'
import moment from 'moment'

import '../styles/Chart.css'

class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeFrance: false,
      activeUSA: false,
      activeSweden: false,
      activeKorea: false,
      activeWorld: true
    }
  }

  formatXAxis = tickItem => {
    return moment(tickItem).format('MMM Do')
  }

  handleChangeWorld = e => {
    this.setState({
      activeWorld: !this.state.activeWorld
    })
  }

  handleChangeKorea = () => {
    this.setState({
      activeKorea: !this.state.activeKorea
    })
  }

  handleChangeFrance = () => {
    this.setState({
      activeFrance: !this.state.activeFrance
    })
  }

  handleChangeUSA = () => {
    this.setState({
      activeUSA: !this.state.activeUSA
    })
  }

  handleChangeSweden = () => {
    this.setState({
      activeSweden: !this.state.activeSweden
    })
  }

  render() {

    const globalData = this.props.data

    return (
        <div className="ChartContainer" style={{marginRight: this.props.mobile ? "5px" : "20px", marginLeft: this.props.mobile ? "5px" : 0, }}>
            <Card style={{width: "100%", height: "25vh", backgroundColor: "#2A2A28"}}>
                <Typography variant="h6" style={{fontSize: '15px', color: 'white'}}>Confirmed cases</Typography>
                <ResponsiveContainer>
                    <LineChart
                        width={500}
                        height={300}
                        data={globalData}
                        margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={this.formatXAxis}/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {
                          this.state.activeWorld &&
                            <Line type="monotone" dataKey="World" stroke="#F6B352" activeDot={{ r: 8 }} />
                        }
                        {
                          this.state.activeFrance &&
                            <Line type="monotone" dataKey="France" stroke='#4077D2' activeDot={{ r: 8 }} />
                        }
                        {
                          this.state.activeUSA &&
                          <Line type="monotone" dataKey="US" stroke='#DC1F4E' activeDot={{ r: 8 }} />
                        }
                        {
                          this.state.activeSweden &&
                          <Line type="monotone" dataKey="Sweden" stroke='#43A047' activeDot={{ r: 8 }} />
                        }
                        {
                          this.state.activeKorea &&
                          <Line type="monotone" dataKey="Korea, South" stroke='#ff5722' activeDot={{ r: 8 }} />
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
            <FormControlLabel
            control={
            <Checkbox
              checked={this.state.activeUSA}
              onChange={this.handleChangeUSA}
              name="checkedB"
              color="primary"
              style={{color: '#DC1F4E'}}
            />
            }
            label="USA"
            />
            <FormControlLabel
            control={
            <Checkbox
              checked={this.state.activeSweden}
              onChange={this.handleChangeSweden}
              name="checkedB"
              color="primary"
              style={{color: '#43A047'}}
            />
            }
            label="Sweden"
            />
            <FormControlLabel
            control={
            <Checkbox
              checked={this.state.activeKorea}
              onChange={this.handleChangeKorea}
              name="checkedB"
              color="primary"
              style={{color: '#ff5722'}}
            />
            }
            label='South Korea'
            />
        </div>
    );
  }
}

export default Chart;
