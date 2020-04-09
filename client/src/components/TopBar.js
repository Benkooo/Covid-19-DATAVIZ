import React from 'react'

import logo from '../assets/logo.png'
import { AppBar, Toolbar, Typography } from '@material-ui/core'


class TopBar extends React.Component {
    render() {
        return (
            <div>
                <AppBar elevation={2} style={{backgroundColor: '#2b2a2a'}} position="fixed">
                    <Toolbar>
                        <img 
                            alt='OMS_logo'
                            src={logo}
                        >
                        </img>
                        <Typography variant="h6">
                            COVID-19 pandemic real time data
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default TopBar;