import React from 'react'
import Grid from '@material-ui/core/Grid'
import { CircularProgress } from '@material-ui/core'
import axios from 'axios'

import TopBar from './TopBar'
import TotalConfirmed from './TotalConfirmed'
import Map from './Map'
import Chart from './Chart'
import SecondList from './SecondList'
import LastUpdate from './LastUpdate'
import '../styles/Dashboard.css'

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
            dataOverTime: []
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

        const display = this.state.dispData && this.state.dispDataSecond

        return (
            <div className="DashboardContainer">
                <TopBar />
                { !display &&
                    <CircularProgress className="LoadingClass"/>
                }
                { display &&
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <TotalConfirmed totalConfirmed={this.state.totalConfirmed} data={this.state.data}/>
                            <LastUpdate data={this.state.dataOverTime}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Map />
                        </Grid>
                        <Grid item xs={4}>
                            <SecondList totalDeath={this.state.totalDeath} totalRecovered={this.state.totalRecovered} data={this.state.data}/>
                            <Chart data={this.state.dataOverTime}/>
                        </Grid>
                    </Grid>
                }
            </div>
        )
    }
}

export default Dashboard;
