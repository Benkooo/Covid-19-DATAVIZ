import React from 'react'

import logo from '../assets/logo.png'
import { AppBar, Toolbar, Typography, Button} from '@material-ui/core'


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
                        <Button onClick={() => this.props.setMobile()} style={{marginLeft: 'auto'}} variant="contained">{this.props.label}</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default TopBar;
