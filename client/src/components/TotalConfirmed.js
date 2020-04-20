import React from 'react'
import { withStyles, ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { List, ListItem, ListItemText, Card, Divider, ListSubheader, Typography } from '@material-ui/core'

import '../styles/TotalConfirmed.css'

const theme = createMuiTheme({})
const coco = responsiveFontSizes(theme)

class TotalConfirmed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalConfirmed: this.props.totalConfirmed,
            totalDeath: this.props.totalDeath,
            totalRecovered: this.props.totalRecovered,
            data: this.props.data
        }
    }

    render() {

        return (
            <div className="CasesContainer">
                <Card className="CasesTotal" style={{backgroundColor: "#2A2A28"}}>
                    <div>
                        <ThemeProvider theme={coco}>
                            <Typography style={{color: 'white'}}>Total confirmed: </Typography>
                            <Typography style={{fontSize:'3vw', color: '#9D1C19', fontWeight: 'bold', marginTop: '7px'}} variant="h3">{this.state.totalConfirmed}</Typography>
                        </ThemeProvider>
                    </div>
                </Card>
                <Card style={{backgroundColor: '#2A2A28', maxHeight: '60vh', overflow: 'auto', overflowX: 'hidden' }}>
                    <List>
                        <ListSubheader disableGutters disableSticky className="ListSubheader" style={{ color: '#747474', lineHeight: '25px'}}>Confirmed cases by Country/Region/Sovereignty</ListSubheader>
                        <div>
                            {this.state.data.map((item, key) => (
                                <div key={key}>
                                    <ListItem button >
                                        <ListItemText primary={item.Confirmed} primaryTypographyProps={{style: {color: '#9D1C19', fontWeight: 'bold'}}} />
                                        <ListItemText primary={item.Country_Region} primaryTypographyProps={{style: {marginLeft: '10px', color: 'white' }}}/>
                                    </ListItem>
                                    <Divider style={{backgroundColor: '#5b5b5b'}}/>
                                </div>
                            ))}
                        </div>
                    </List>
                </Card>
            </div>

        )
    }
}

export default TotalConfirmed;