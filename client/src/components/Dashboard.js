import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Card'
import { Typography, CircularProgress } from '@material-ui/core'
import axios from 'axios'

import TopBar from './TopBar'
import TotalConfirmed from './TotalConfirmed'
import Map from './Map'
import '../styles/Dashboard.css'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dispData: false,
            totalConfirmed: 0,
            totalDeath: 0,
            totalRecovered: 0
        }
    }

    componentDidMount = () => {
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
                totalRecovered: res.data.total_recovered
            })
        })
        .catch(err => {
            console.error(err)
        })
    }

    render() {

        return (
            <div>
                <TopBar />
                { !this.state.dispData &&
                    <CircularProgress className="LoadingClass"/>
                }
                { this.state.dispData &&
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <TotalConfirmed totalConfirmed={this.state.totalConfirmed}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Map />
                        </Grid>
                        <Grid item xs={4}>
                            <Paper style={{color: 'white', backgroundColor: '#2A2A28', marginTop: "120px", height: "780px", marginRight: "20px"}}>
                                <Typography variant="h3">
                                    Je suis un graphique
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                }
            </div>
        )
    }
}

export default Dashboard;
