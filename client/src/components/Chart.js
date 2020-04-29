import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area
} from 'recharts';
import {Card, Checkbox, FormControlLabel, Typography, Switch, IconButton} from '@material-ui/core'
import moment from 'moment'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import '../styles/Chart.css'

class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeFrance: false,
      activeUSA: false,
      activeSweden: false,
      activeKorea: false,
      activeWorld: true,
      activateBar: false,
      activateArea: false,
      activateLog: false,
      chartTypes: ['Confirmed', 'Deaths', 'Recovered'],
      chartNum: 0
    }
  }

  formatXAxis = tickItem => {
    return moment(tickItem).format('MMM Do')
  }

  handleChangeCountry = event => {

    console.log("EVENT", event.target.checked)

    this.setState({
      [event.target]: !event.target.checked
    })
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

  handleChangeChart = () => {
    this.setState({
      activateBar: !this.state.activateBar,
      activateArea: false,
      activateLog: false
    })
  }

  handleChangeArea = () => {
    this.setState({
      activateArea: !this.state.activateArea,
      activateBar: false,
      activateLog: false
    })
  }

  handleChangeLog = () => {
    this.setState({
      activateLog: !this.state.activateLog,
      activateBar: false,
      activateArea: false
    })
  }

  forwardChart = () => {
    if (this.state.chartNum !== 2) {
      this.setState({
        chartNum: this.state.chartNum + 1
      })
    } else {
      this.setState({
        chartNum: 0
      })
    }
  }

  backwardChart = () => {
    if (this.state.chartNum !== 0) {
      this.setState({
        chartNum: this.state.chartNum - 1
      })
    } else {
      this.setState({
        chartNum: 2
      })
    }
  }

  displayLineChart = data => {

    return (
      <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
          top: 5, right: 30, left: 20, bottom: 5,
          }}
      >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={this.formatXAxis}/>
          {
            this.state.activateLog ?
            <YAxis scale='log' domain={['auto', 'auto']} allowDataOverflow/> :
            <YAxis />
          }
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
    );
  }

  displayBarChart = data => {

    return (
      <BarChart
      width={500}
      height={300}
      data={data}
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
            <Bar dataKey="World" fill="#F6B352" />
        }
        {
          this.state.activeFrance &&
            <Bar dataKey="France" fill="#4077D2" />
        }
        {
          this.state.activeUSA &&
            <Bar dataKey="US" fill="#DC1F4E" />
        }
        {
          this.state.activeSweden &&
            <Bar dataKey="Sweden" fill="#43A047" />
        }
        {
          this.state.activeKorea &&
            <Bar dataKey="Korea, South" fill="#ff5722" />
        }
      </BarChart>
    )
  }

  displayAreaChart = data => {

    return (
      <AreaChart
          width={500}
          height={300}
          data={data}
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
              <Area type="monotone" dataKey="World" stroke="#F6B352" fill="#F6B352" activeDot={{ r: 8 }} />
          }                        
          {
            this.state.activeFrance &&
              <Area type="monotone" dataKey="France" stroke='#4077D2' fill="#4077D2" activeDot={{ r: 8 }} />
          }
          {
            this.state.activeUSA &&
            <Area type="monotone" dataKey="US" stroke='#DC1F4E' fill='#DC1F4E' activeDot={{ r: 8 }} />
          }
          {
            this.state.activeSweden &&
            <Area type="monotone" dataKey="Sweden" stroke='#43A047' fill='#43A047' activeDot={{ r: 8 }} />
          }
          {
            this.state.activeKorea &&
            <Area type="monotone" dataKey="Korea, South" stroke='#ff5722' fill='#ff5722' activeDot={{ r: 8 }} />
          }
      </AreaChart>
    );
  }

  checkForGraph = () => {
    const confirmedData = this.props.confirmed
    const deathData = this.props.deaths
    const recoveredData = this.props.recovered
    const activateLineGraph = !this.state.activateArea && !this.state.activateBar
    let data;

    if (this.state.chartNum === 0) {
      data = confirmedData
    } else if (this.state.chartNum === 1) {
      data = deathData
    } else if (this.state.chartNum === 2) {
      data = recoveredData
    }

    if (activateLineGraph) {
      return this.displayLineChart(data)
    } else if (this.state.activateBar) {
      return this.displayBarChart(data)
    } else if (this.state.activateArea) {
      return this.displayAreaChart(data)
    }
    return ;
  }

  render() {

    return (
        <div className="ChartContainer">
            <Card style={{width: "96%", height: "25vh", backgroundColor: "#2A2A28"}}>
                <div className="ChartChoice">
                  <IconButton onClick={this.backwardChart} size='small' style={{marginRight: '6px', color: 'white', positon: 'absolute'}}>
                    <ArrowBackIosIcon fontSize="small"/>
                  </IconButton>
    <Typography variant="h6" style={{fontSize: '15px', color: 'white', fontFamily: 'Product Sans'}}>{this.state.chartTypes[this.state.chartNum]}</Typography>
                  <IconButton onClick={this.forwardChart} size='small' style={{marginLeft: '6px', color: 'white', positon: 'absolute'}}>
                    <ArrowForwardIosIcon fontSize="small"/>
                  </IconButton>
                </div>
                <ResponsiveContainer>
                  {this.checkForGraph()}
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
            <FormControlLabel
            control={
              <Switch
                checked={this.state.activateLog}
                onChange={this.handleChangeLog}
                name="checkedBs"
                color="primary"
              />
            }
            label="Logarithmic"
            />
            <FormControlLabel
            control={
              <Switch
                checked={this.state.activateBar}
                onChange={this.handleChangeChart}
                name="checkedBs"
                color="primary"
              />
            }
            label="Bar chart"
            />
            <FormControlLabel
            control={
              <Switch
                checked={this.state.activateArea}
                onChange={this.handleChangeArea}
                name="checkedBse"
                color="secondary"
              />
            }
            label="Area chart"
            />
        </div>
    );
  }
}

export default Chart;
