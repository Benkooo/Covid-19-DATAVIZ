import React from 'react'

import logo from '../assets/logo.png'
import { AppBar, Toolbar, Typography, IconButton, Popover, MenuList, MenuItem} from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreVert'

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleMenu: false
        }
        this.myRef = React.createRef()
    }

    activateMenu = () => {
        this.setState({
            toggleMenu: !this.state.toggleMenu
        })
    }

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
                        <IconButton ref={this.myRef} onClick={this.activateMenu} aria-label="display more actions" edge="end" color="inherit" style={{marginLeft: 'auto'}}>
                            <MoreIcon />
                        </IconButton>
                        <Popover
                            open={this.state.toggleMenu}
                            onClose={this.activateMenu}
                            anchorEl={this.myRef.current}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}>
                            <MenuList>
                                <MenuItem onClick={() => this.props.setMobile()}>{this.props.label}</MenuItem>
                                <MenuItem onClick={() => this.props.displayCode()}>Informations</MenuItem>
                                <MenuItem onClick={() => this.props.displayCode()}>Dashboard</MenuItem>
                            </MenuList>
                        </Popover>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default TopBar;
