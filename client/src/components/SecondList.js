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
            data: this.props.data,
            showListD: false,
            showListR: false,
        }
    }

    render() {

        return (
            <div>
                <div className="TotalDeathRecovered" style={this.props.mobile ? {flexDirection: "column"} : {flexDirection: "row"}}>
                    <Card className="CasesList" onClick={() => this.setState({showListD: !this.state.showListD})} style={{ marginBottom: this.props.mobile ? '3px' : '0', height: this.props.mobile ? '200px' : '100px', marginRight: this.props.mobile ? '5px' : '20px', marginLeft: this.props.mobile ? '5px' : '0', width: this.props.mobile ? '100%' : '99%', backgroundColor: "#2A2A28"}}>
                        <div>
                            <ThemeProvider theme={coco}>
                                <Typography style={{fontSize: this.props.mobile ? "3vh" : "2vh", color: 'white'}}>Total deaths: </Typography>
                                <Typography style={{fontSize: this.props.mobile ? "8vh" : "3vh", color: 'white', fontWeight: 'bold', marginTop: '7px'}} variant="h3">{this.state.totalDeath}</Typography>
                            </ThemeProvider>
                        </div>
                    </Card>
                    {this.props.mobile && this.state.showListD ?
                        <Card style={{width: "100%", backgroundColor: '#2A2A28', maxHeight: '60vh', overflow: 'auto', overflowX: 'hidden' }}>
                            <List>
                                <ListSubheader disableGutters disableSticky className="ListSubheader" style={{color: '#747474', lineHeight: '25px'}}>Total deaths</ListSubheader>
                                <div>
                                    {this.state.data.map((item, key) => (
                                        <div key={key}>
                                            <ListItem button >
                                                <ListItemText primary={item.Deaths} primaryTypographyProps={{style: {color: '#747474', fontWeight: 'bold'}}} />
                                                <ListItemText primary={item.Country_Region} primaryTypographyProps={{style: {marginLeft: '10px', color: 'white' }}}/>
                                            </ListItem>
                                            <Divider style={{backgroundColor: '#5b5b5b'}}/>
                                        </div>
                                    ))}
                                </div>
                            </List>
                        </Card>
                        :
                        null
                    }
                    <Card className="CasesList" onClick={() => this.setState({showListR: !this.state.showListR})} style={{ marginTop: this.props.mobile ? '12px' : '0', height: this.props.mobile ? '200px' : '100px', marginRight: this.props.mobile ? '5px' : '20px', marginLeft: this.props.mobile ? '5px' : '0', width: this.props.mobile ? '100%' : '99%', backgroundColor: "#2A2A28"}}>
                        <div>
                            <ThemeProvider theme={coco}>
                                <Typography style={{fontSize: this.props.mobile ? "3vh" : "2vh", color: 'white'}}>Total recovered: </Typography>
                                <Typography style={{fontSize: this.props.mobile ? "8vh" : "3vh", color: '#43A047', fontWeight: 'bold', marginTop: '7px'}} variant="h3">{this.state.totalRecovered}</Typography>
                            </ThemeProvider>
                        </div>
                    </Card>
                    {this.props.mobile && this.state.showListR ?
                        <Card style={{marginTop: '3px', width: "100%", backgroundColor: '#2A2A28', maxHeight: '60vh', overflow: 'auto', overflowX: 'hidden' }}>
                            <List>
                                <ListSubheader disableGutters disableSticky className="ListSubheader" style={{color: '#747474', lineHeight: '25px'}}>Total deaths</ListSubheader>
                                <div>
                                    {this.state.data.map((item, key) => (
                                        <div key={key}>
                                            <ListItem button >
                                                <ListItemText primary={item.Recovered} primaryTypographyProps={{style: {color: '#43A047', fontWeight: 'bold'}}} />
                                                <ListItemText primary={item.Country_Region} primaryTypographyProps={{style: {marginLeft: '10px', color: 'white' }}}/>
                                            </ListItem>
                                            <Divider style={{backgroundColor: '#5b5b5b'}}/>
                                        </div>
                                    ))}
                                </div>
                            </List>
                        </Card>
                        :
                        null
                    }

                </div>
                {!this.props.mobile ?
                    <div className="SecondList">
                        <Card style={{backgroundColor: '#2A2A28', maxHeight: '40vh', overflow: 'auto', overflowX: 'hidden'}}>
                            <List>
                                <ListSubheader disableGutters disableSticky className="ListSubheader" style={{color: '#747474', lineHeight: '25px'}}>Total deaths</ListSubheader>
                                <div>
                                    {this.state.data.map((item, key) => (
                                        <div key={key}>
                                            <ListItem button>
                                                <ListItemText primary={item.Deaths} primaryTypographyProps={{
                                                    style: {
                                                        color: 'white',
                                                        fontWeight: 'bold'
                                                    }
                                                }}/>
                                                <ListItemText primary={item.Country_Region} primaryTypographyProps={{
                                                    style: {
                                                        marginLeft: '10px',
                                                        color: 'white'
                                                    }
                                                }}/>
                                            </ListItem>
                                            <Divider style={{backgroundColor: '#5b5b5b'}}/>
                                        </div>
                                    ))}
                                </div>
                            </List>
                        </Card>
                        <Card style={{
                            backgroundColor: '#2A2A28',
                            maxHeight: '40vh',
                            overflow: 'auto',
                            overflowX: 'hidden'
                        }}>
                            <List>
                                <ListSubheader disableGutters disableSticky className="ListSubheader"
                                               style={{color: '#747474', lineHeight: '25px'}}>Total
                                    recovered
                                </ListSubheader>
                                <div>
                                    {this.state.data.map((item, key) => (
                                        <div key={key}>
                                            <ListItem button>
                                                <ListItemText primary={item.Recovered} primaryTypographyProps={{
                                                    style: {
                                                        color: '#43A047',
                                                        fontWeight: 'bold'
                                                    }
                                                }}/>
                                                <ListItemText primary={item.Country_Region} primaryTypographyProps={{
                                                    style: {
                                                        marginLeft: '10px',
                                                        color: 'white'
                                                    }
                                                }}/>
                                            </ListItem>
                                            <Divider style={{backgroundColor: '#5b5b5b'}}/>
                                        </div>
                                    ))}
                                </div>
                            </List>
                        </Card>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default SecondList;
