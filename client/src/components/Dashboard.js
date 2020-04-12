import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Card'

import TopBar from './TopBar'
import TotalCases from './TotalCases'
import Map from './Map'

class Dashboard extends React.Component {
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
                        <Paper style={{color: 'white', backgroundColor: '#3d3d3d', marginTop: "120px", height: "780px", marginRight: "20px"}}>Je suis un graphique</Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Dashboard;