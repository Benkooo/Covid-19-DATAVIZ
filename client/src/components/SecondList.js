import React from 'react'
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import {
    Card,
    List,
    ListSubheader,
    ListItem,
    Divider,
    ListItemText,
    Typography,
    FormControlLabel, Switch
} from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import '../styles/SecondList.css'

const theme = createMuiTheme({});
const coco = responsiveFontSizes(theme)

class SecondList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalDeath: this.props.totalDeath,
            totalRecovered: this.props.totalRecovered,
            totalTests: this.props.totalTests,
            data: this.props.data,
            dataUS: this.props.dataUS,
            showListD: false,
            showListR: false,
            deaths: true,
            recovered: false,
            hospitalization: true,
            tests: false,
            leftLabel: "Total deaths",
            leftListLabel: "Deaths",
            leftList : "Deaths",
            leftData: this.props.totalDeath,
            rightLabel: "Cumulative hospitalization",
            rightListLabel: "Hospitalized",
            rightList : "Hospitalization",
            rightData: "hospitalized"
        }
    }

    handleChangeDeaths = () => {
        this.setState({
            deaths: true,
            recovered: false,
            leftList: "Deaths",
            leftData: this.state.totalDeath,
            leftListLabel: "Deaths",
            leftLabel: "Total deaths"
        })
    };

    handleChangeRecovered = () => {
        this.setState({
            recovered: true,
            deaths: false,
            leftList: "Recovered",
            leftData: this.state.totalRecovered,
            leftListLabel: "Recovered",
            leftLabel: "Total recovered"
        })
    };

    handleChangeHospitalization = () => {
        this.setState({
            hospitalization: true,
            tests: false,
            rightList: "Hospitalization",
            rightLabel: "Cumulative hospitalization",
            rightListLabel: "Hospitalized",
            rightData: "hospitalized"
        })
    };

    handleChangeTests = () => {
        this.setState({
            hospitalization: false,
            tests: true,
            rightList: "Tests",
            rightLabel: "Total test results in US",
            rightListLabel: "Tested",
            rightData: "totalTestResults"

        })
    };

    render() {

        return (
            <div>
                <div className="TotalDeathRecovered" style={this.props.mobile ? {flexDirection: "column"} : {flexDirection: "row"}}>
                    {this.props.mobile &&
                    <Card className="CasesList" onClick={() => this.setState({showListD: !this.state.showListD})} style={{ marginBottom: this.props.mobile ? '3px' : '0', height: this.props.mobile ? '200px' : '100px', marginRight: this.props.mobile ? '5px' : '20px', marginLeft: this.props.mobile ? '5px' : '0', width: this.props.mobile ? '100%' : '99%', backgroundColor: "#2A2A28"}}>
                        <div>
                            <ThemeProvider theme={coco}>
                                <Typography style={{fontSize: this.props.mobile ? "3vh" : "2vh", color: 'white', fontFamily: 'Product Sans'}}>Total deaths</Typography>
                                <Typography style={{fontSize: this.props.mobile ? "8vh" : "3vh", color: 'white', fontWeight: 'bold', marginTop: '7px'}} variant="h3">{this.state.totalDeath}</Typography>
                            </ThemeProvider>
                        </div>
                    </Card>
                    }
                    {!this.props.mobile &&
                    <Card className="CasesList" onClick={() => this.setState({showListD: !this.state.showListD})} style={{ marginBottom: this.props.mobile ? '3px' : '0', height: this.props.mobile ? '200px' : '100px', marginRight: this.props.mobile ? '5px' : '20px', marginLeft: this.props.mobile ? '5px' : '0', width: this.props.mobile ? '100%' : '99%', backgroundColor: "#2A2A28"}}>
                        <div>
                            <ThemeProvider theme={coco}>
                                <Typography style={{fontSize: this.props.mobile ? "3vh" : "2vh", color: 'white', fontFamily: 'Product Sans'}}>{this.state.leftLabel} </Typography>
                                <Typography style={{fontSize: this.props.mobile ? "8vh" : "3vh", color: this.state.deaths ? 'white' : '#43A047', fontWeight: 'bold', marginTop: '7px'}} variant="h3">{this.state.leftData}</Typography>
                            </ThemeProvider>
                        </div>
                    </Card>
                    }
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
                    {this.props.mobile &&
                    <Card className="CasesList" onClick={() => this.setState({showListR: !this.state.showListR})}
                          style={{
                              marginTop: this.props.mobile ? '12px' : '0',
                              height: this.props.mobile ? '200px' : '100px',
                              marginRight: this.props.mobile ? '5px' : '20px',
                              marginLeft: this.props.mobile ? '5px' : '0',
                              width: this.props.mobile ? '100%' : '99%',
                              backgroundColor: "#2A2A28"
                          }}>
                        <div>
                            <ThemeProvider theme={coco}>
                                <Typography style={{
                                    fontSize: this.props.mobile ? "3vh" : "2vh",
                                    color: 'white',
                                    fontFamily: 'Product Sans'
                                }}>Total recovered </Typography>
                                <Typography style={{
                                    fontSize: this.props.mobile ? "8vh" : "3vh",
                                    color: '#43A047',
                                    fontWeight: 'bold',
                                    marginTop: '7px'
                                }} variant="h3">{this.state.totalRecovered}</Typography>
                            </ThemeProvider>
                        </div>
                    </Card>
                    }
                    {!this.props.mobile &&
                    <Card className="CasesList" onClick={() => this.setState({showListD: !this.state.showListD})} style={{ marginBottom: this.props.mobile ? '3px' : '0', height: this.props.mobile ? '200px' : '100px', marginRight: this.props.mobile ? '5px' : '20px', marginLeft: this.props.mobile ? '5px' : '0', width: this.props.mobile ? '100%' : '99%', backgroundColor: "#2A2A28"}}>
                        <div>
                            {this.state.hospitalization &&
                            <ThemeProvider theme={coco}>
                                <Typography style={{fontSize: "28px", color: this.state.hospitalization ? 'white' : '#73B2FF', fontFamily: 'Product Sans'}}>
                                    {this.state.rightLabel}
                                </Typography>
                                <Typography style={{fontSize: "15px", color: 'white', fontFamily: 'Product Sans'}}>
                                    by State
                                </Typography>
                            </ThemeProvider>}
                            {!this.state.hospitalization &&
                            <ThemeProvider theme={coco}>
                                <Typography style={{fontSize: this.props.mobile ? "3vh" : "2vh", color: 'white', fontFamily: 'Product Sans'}}>{this.state.rightLabel} </Typography>
                                <Typography style={{fontSize: this.props.mobile ? "8vh" : "3vh", color: '#73B2FF', fontWeight: 'bold', marginTop: '7px'}} variant="h3">{this.state.totalTests}</Typography>
                            </ThemeProvider>}
                        </div>
                    </Card>
                    }
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
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Card style={{marginRight: "10px", backgroundColor: '#2A2A28', maxHeight: '40vh', overflow: 'auto', overflowX: 'hidden'}}>
                                <List>
                                    <ListSubheader disableGutters disableSticky className="ListSubheader" style={{color: '#747474', lineHeight: '25px', fontFamily: 'Product Sans'}}>{this.state.leftListLabel}</ListSubheader>
                                    <div>
                                        {this.state.data.map((item, key) => (
                                            <div key={key}>
                                                <ListItem button>
                                                    <ListItemText primary={item[this.state.leftList]} primaryTypographyProps={{
                                                        style: {
                                                            color: this.state.deaths ? 'white' : '#43A047',
                                                            fontWeight: 'bold'
                                                        }
                                                    }}/>
                                                    <ListItemText primary={item.Country_Region} primaryTypographyProps={{
                                                        style: {
                                                            marginLeft: '10px',
                                                            color: 'white',
                                                            fontFamily: 'Product Sans'
                                                        }
                                                    }}/>
                                                </ListItem>
                                                <Divider style={{backgroundColor: '#5b5b5b'}}/>
                                            </div>
                                        ))}
                                    </div>
                                </List>
                            </Card>
                            <div>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.deaths}
                                            onChange={this.handleChangeDeaths}
                                            name="checkedBs"
                                            color="primary"
                                        />
                                    }
                                    label="Deaths"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.recovered}
                                            onChange={this.handleChangeRecovered}
                                            name="checkedBs"
                                            color="primary"
                                        />
                                    }
                                    label="Recovered"
                                />
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Card style={{backgroundColor: '#2A2A28', maxHeight: '40vh', overflow: 'auto', overflowX: 'hidden', marginRight: '10px'}}>
                                <List>
                                    <ListSubheader disableGutters disableSticky className="ListSubheader"
                                                   style={{color: '#747474', lineHeight: '25px', fontFamily: 'Product Sans'}}>
                                        {this.state.rightListLabel}
                                    </ListSubheader>
                                    <div>
                                        {this.state.dataUS.map((item, key) => (
                                            <div>
                                            {item[this.state.rightData] &&
                                            <div key={key}>
                                                <ListItem button>
                                                    <ListItemText primary={item[this.state.rightData]}
                                                                  primaryTypographyProps={{
                                                                      style: {
                                                                          color: this.state.hospitalization ? 'white' : '#73B2FF',
                                                                          fontWeight: 'bold'
                                                                      }
                                                                  }}/>
                                                    <ListItemText primary={item.state}
                                                                  primaryTypographyProps={{
                                                                      style: {
                                                                          marginLeft: '10px',
                                                                          color: 'white',
                                                                          fontFamily: 'Product Sans'
                                                                      }
                                                                  }}/>
                                                </ListItem>
                                                <Divider style={{backgroundColor: '#5b5b5b'}}/>
                                            </div>
                                            }
                                            </div>
                                        ))}
                                    </div>
                                </List>
                            </Card>
                            <div>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.hospitalization}
                                            onChange={this.handleChangeHospitalization}
                                            name="checkedBs"
                                            color="primary"
                                        />
                                    }
                                    label="Hospitalization"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.tests}
                                            onChange={this.handleChangeTests}
                                            name="checkedBs"
                                            color="primary"
                                        />
                                    }
                                    label="US tests"
                                />

                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default SecondList;
