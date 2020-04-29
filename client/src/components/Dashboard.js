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
import NbCountries from './NbCountries'
import '../styles/Dashboard.css'
import '../styles/TotalConfirmed.css'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dispData: false,
            getCode: false,
            dispDataSecond: 0,
            totalConfirmed: 0,
            totalDeath: 0,
            totalRecovered: 0,
            data: [],
            confirmedOverTime: [],
            deathOverTime: [],
            recoveredOverTime: [],
            displayQRCode: false
        };
    }

    displayCode = () => {
        this.setState({
            displayQRCode: !this.state.displayQRCode
        })
    }

    getQRCode = () => {
        axios.post('http://localhost:5000/', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }).then(res => {
            console.log(res)
            this.setState({
                getCode: true
            })
        })
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
                dispDataSecond: this.state.dispDataSecond + 1,
                confirmedOverTime: res.data.data
            })
        })

        axios.post('http://localhost:5000/time_series_death', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
        .then(res => {
            console.log(res)
            this.setState({
                dispDataSecond: this.state.dispDataSecond + 1,
                deathOverTime: res.data.data
            })
        })

        axios.post('http://localhost:5000/time_series_recovered', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
        .then(res => {
            console.log(res)
            this.setState({
                dispDataSecond: this.state.dispDataSecond + 1,
                recoveredOverTime: res.data.data
            })
        })
    }

    componentDidMount = () => {
        this.getTodayData()
        this.getDataByTime()
    }

    render() {
        console.log(this.state.mobile);
        const display = this.state.dispData && this.state.dispDataSecond === 3
        const displayQRCode = this.state.displayQRCode


        console.log("DISPLAY QR CODE", this.state.displayQRCode)

        return (
            <div className="DashboardContainer">
                <TopBar label={"Mobile"} setMobile={this.props.setMobile} displayCode={this.displayCode}/>
                { !display &&
                    <CircularProgress className="LoadingClass"/>
                }
                { (display && !displayQRCode) &&
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                             <div className="CasesContainer">
                                <TotalConfirmed mobile={false} totalConfirmed={this.state.totalConfirmed} data={this.state.data}/>
                                <LastUpdate data={this.state.confirmedOverTime}/>
                                <NbCountries data={this.state.confirmedOverTime}/>
                             </div>
                        </Grid>
                        <Grid item xs={6}>
                            <Map mobile={false}/>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="LastContainer">
                                <SecondList mobile={false} totalDeath={this.state.totalDeath} totalRecovered={this.state.totalRecovered} data={this.state.data}/>
                            </div>
                            <Chart mobile={false} confirmed={this.state.confirmedOverTime} deaths={this.state.deathOverTime} recovered={this.state.recoveredOverTime}/>
                        </Grid>
                    </Grid>
                }
            </div>
        )
    }
}

export default Dashboard;
