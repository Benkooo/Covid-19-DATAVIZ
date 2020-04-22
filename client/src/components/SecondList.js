import React from 'react'
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { Card, List, ListSubheader, ListItem, Divider, ListItemText, Typography } from '@material-ui/core'

import '../styles/SecondList.css'

const theme = createMuiTheme({})
const coco = responsiveFontSizes(theme)

class SecondList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalDeath: this.props.totalDeath,
            totalRecovered: this.props.totalRecovered,
            data: this.props.data
        }
    }

    render() {

        return (
            <div className="LastContainer">
                <div className="TotalDeathRecovered">
                    <Card className="CasesList" style={{ marginRight: '20px', width:'99%', backgroundColor: "#2A2A28"}}>
                        <div>
                            <ThemeProvider theme={coco}>
                                <Typography style={{color: 'white', fontFamily: 'Product Sans'}}>Total deaths </Typography>
                                <Typography style={{fontSize:'3vw', color: 'white', fontWeight: 'bold', marginTop: '7px'}} variant="h3">{this.state.totalDeath}</Typography>
                            </ThemeProvider>
                        </div>
                    </Card>
                    <Card className="CasesList" style={{marginRight: '20px', width:'99%', backgroundColor: "#2A2A28"}}>
                        <div>
                            <ThemeProvider theme={coco}>
                                <Typography style={{color: 'white', fontFamily: 'Product Sans'}}>Total recovered </Typography>
                                <Typography style={{fontSize:'3vw', color: '#43A047', fontWeight: 'bold', marginTop: '7px'}} variant="h3">{this.state.totalRecovered}</Typography>
                            </ThemeProvider>
                        </div>
                    </Card>
                </div>
                <div className="SecondList">
                    <Card style={{backgroundColor: '#2A2A28', maxHeight: '40vh', overflow: 'auto', overflowX: 'hidden' }}>
                        <List>
                            <ListSubheader disableGutters disableSticky className="ListSubheader" style={{ color: '#747474', lineHeight: '25px', fontFamily: 'Product Sans'}}>Total deaths</ListSubheader>
                            <div>
                                {this.state.data.map((item, key) => (
                                    <div key={key}>
                                        <ListItem button >
                                            <ListItemText primary={item.Deaths} primaryTypographyProps={{style: {color: 'white', fontWeight: 'bold'}}} />
                                            <ListItemText primary={item.Country_Region} primaryTypographyProps={{style: {marginLeft: '10px', color: 'white', fontFamily: 'Product Sans' }}}/>
                                        </ListItem>
                                        <Divider style={{backgroundColor: '#5b5b5b'}}/>
                                    </div>
                                ))}
                            </div>
                        </List>
                    </Card>
                    <Card style={{backgroundColor: '#2A2A28', maxHeight: '40vh', overflow: 'auto', overflowX: 'hidden' }}>
                        <List>
                            <ListSubheader disableGutters disableSticky className="ListSubheader" style={{ color: '#747474', lineHeight: '25px', fontFamily: 'Product Sans'}}>Total recovered</ListSubheader>
                            <div>
                                {this.state.data.map((item, key) => (
                                    <div key={key}>
                                        <ListItem button >
                                            <ListItemText primary={item.Recovered} primaryTypographyProps={{style: {color: '#43A047', fontWeight: 'bold'}}} />
                                            <ListItemText primary={item.Country_Region} primaryTypographyProps={{style: {marginLeft: '10px', color: 'white', fontFamily: 'Product Sans' }}}/>
                                        </ListItem>
                                        <Divider style={{backgroundColor: '#5b5b5b'}}/>
                                    </div>
                                ))}
                            </div>
                        </List>
                    </Card>
                </div>
            </div>
        )
    }
}

export default SecondList;