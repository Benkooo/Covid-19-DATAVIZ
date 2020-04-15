import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Card'
import axios from 'axios'

import TopBar from './TopBar'
import TotalCases from './TotalCases'
import Map from './Map'
import { Typography } from '@material-ui/core'

class Dashboard extends React.Component {

    componentDidMount = () => {
        console.log("cozadoazdo")
        console.log("TEST TEST TEST")
        axios.post('http://localhost:5000/daily_reports',{
            headers: {
                //'Access-Control-Allow-Origin': '*',
                //'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log('erororororororor')
            console.error(err)
            console.error(err.response)
        })
    }

    render() {

        return (
            <div>
                <TopBar />
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <TotalCases />
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
            </div>
        )
    }
}

export default Dashboard;
