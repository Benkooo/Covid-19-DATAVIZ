import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Card'
import {Typography, CircularProgress, Button, Toolbar} from '@material-ui/core'
import axios from 'axios'
import TopBar from './TopBar'
import TotalConfirmed from './TotalConfirmed'
import Map from './Map'
import Chart from './Chart'
import '../styles/DashboardMobile.css'
import SecondList from './SecondList'

class DashboardMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dispData: false,
            dispDataSecond: false,
            totalConfirmed: 0,
            totalDeath: 0,
            totalRecovered: 0,
            data: [],
            dataOverTime: [],
            totals: true,
            chart: false,
            map: false
        }
    }

    getTodayData = () => {
        axios.post('http://localhost:5000/daily_reports',{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
        .then(res => {
            console.log(res);
            this.setState({
                dispData: true,
                totalConfirmed: res.data.total_confirmed,
                totalDeath: res.data.total_death,
                totalRecovered: res.data.total_recovered,
                data: res.data.data
            })
        })
        .catch(err => {
            console.error(err)
        })
    }

    getDataByTime = () => {
        axios.post('http://localhost:5000/time_series_confirmed', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
        .then(res => {
            console.log(res)
            this.setState({
                dispDataSecond: true,
                dataOverTime: res.data.data
            })
        })
    }

    setTotals() {
        this.setState({totals: true, chart: false, map: false})
    }

    setMap() {
        this.setState({totals: false, chart: false, map: true})
    }

    setChart() {
        this.setState({totals: false, chart: true, map: false})
    }

    componentDidMount = () => {
        this.getTodayData()
        this.getDataByTime()
    }

    render() {
        console.log(this.state.mobile);
        const display = this.state.dispData && this.state.dispDataSecond

        return (
            <div>
                <TopBar label={"Desktop"} setMobile={this.props.setMobile}/>
                { !display &&
                    <CircularProgress className="LoadingClassMobile"/>
                }
                { display && this.state.totals &&
                    <div style={{marginTop: "15px"}}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <div className="CasesContainerMobile">
                                    <TotalConfirmed mobile={true} totalConfirmed={this.state.totalConfirmed} data={this.state.data}/>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="LastContainerMobile">
                                    <SecondList mobile={true} totalDeath={this.state.totalDeath} totalRecovered={this.state.totalRecovered} data={this.state.data}/>
                                </div>
                            </Grid>
                        </Grid>
                    </div>}
                { display && this.state.chart &&
                    <div style={{marginTop: "15px"}}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <div style={{marginTop: '30px', display: 'flex'}}>
                                    <Chart mobile={true} data={this.state.dataOverTime}/>
                                </div>
                            </Grid>
                        </Grid>
                    </div>}
                { display && this.state.map &&
                    <div style={{marginTop: "15px"}}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <Map mobile={true}/>
                            </Grid>
                        </Grid>
                    </div>}
                { display &&
                    <div style={{marginTop: "30px"}}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <Button onClick={() => this.setTotals()} style={{marginLeft: 'auto', backgroundColor: '#2A2A28', color: 'white'}} variant="contained">Totals</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button onClick={() => this.setMap()} style={{marginLeft: 'auto', backgroundColor: '#2A2A28', color: 'white'}} variant="contained">Map</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button onClick={() => this.setChart()} style={{marginLeft: 'auto', backgroundColor: '#2A2A28', color: 'white'}} variant="contained">Charts</Button>
                            </Grid>
                        </Grid>
                    </div>
                }
            </div>
        )
    }
}

export default DashboardMobile;
