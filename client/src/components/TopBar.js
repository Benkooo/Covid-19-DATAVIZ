import React from 'react'

import logo from '../assets/logo.png'
import { AppBar, Toolbar, Typography, IconButton} from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreVert'

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
                        <Typography variant="h6" style={{fontFamily: 'Product Sans'}}>
                            COVID-19 pandemic real time data
                        </Typography>
                        <IconButton aria-label="display more actions" edge="end" color="inherit" style={{marginLeft: 'auto'}}>
                            <MoreIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default TopBar;