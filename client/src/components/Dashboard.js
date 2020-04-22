import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Card'
import { Typography, CircularProgress } from '@material-ui/core'
import axios from 'axios'
import TopBar from './TopBar'
import TotalConfirmed from './TotalConfirmed'
import Map from './Map'
import Chart from './Chart'
import '../styles/Dashboard.css'
import SecondList from './SecondList'

class Dashboard extends React.Component {
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
        };
    }

    getTodayData = () => {
        axios.post('http://localhost:5000/daily_reports',{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
        .then(res => {
            console.log(res)
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

    componentDidMount = () => {
        this.getTodayData()
        this.getDataByTime()
    }

    render() {
        console.log(this.state.mobile);
        const display = this.state.dispData && this.state.dispDataSecond

        return (
            <div>
                <TopBar label={"Mobile"} setMobile={this.props.setMobile}/>
                { !display &&
                    <CircularProgress className="LoadingClass"/>
                }
                { display &&
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <div className="CasesContainer">
                                <TotalConfirmed mobile={false} totalConfirmed={this.state.totalConfirmed} data={this.state.data}/>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <Map mobile={false}/>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="LastContainer">
                                <SecondList mobile={false} totalDeath={this.state.totalDeath} totalRecovered={this.state.totalRecovered} data={this.state.data}/>
                            </div>
                            <Chart mobile={false} data={this.state.dataOverTime}/>
                        </Grid>
                    </Grid>
                }
            </div>
        )
    }
}

export default Dashboard;
