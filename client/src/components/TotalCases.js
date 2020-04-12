import React from 'react'
import { withStyles, ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme, CssBaseline, ListItem, ListItemText, Card, ListSubheader, Typography, responsiveFontSizes } from '@material-ui/core'
import { FixedSizeList } from 'react-window'
import '../styles/TotalCases.css'

const useStyles = theme => ({
});

class TotalCases extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalNumber: 1456999,
            casesByCountry: [1212, 99, 33131, 1391, 298, 1212, 300, 456],
            countries: ["France", "Allemagne", "Pays-Bad", "Autriche", "Suède", "Nigeria", "Ouga", "Bouga"]
        }
    }

    renderRow = (props) => {
        const { index, style } = props
        const dispNum = <div style={{color: 'red', fontWeight: 'bold'}}>{this.state.casesByCountry[index]}</div>
        const dispCountry = <div>{this.state.countries[index]}</div>

        return (
            <div>
                <ListItem divider={true} button style={style} key={index}>
                    <ListItemText primary={dispNum} />
                    <ListItemText primary={dispCountry} />
                </ListItem>
            </div>
        )
    }
    
    render() {

        let theme = createMuiTheme();
        theme = responsiveFontSizes(theme);

        return (
            <div className="CasesContainer">
                        <Card className="CasesTotal" style={{backgroundColor: "#3d3d3d"}}>
                            <ThemeProvider theme={theme}>
                                <div className="TypoStyle">
                                    <Typography style={{color: 'white'}} variant="h5">Total confirmed: </Typography>
                                    <Typography style={{color: '#ba0000', fontWeight: 'bold'}} variant="h4">{this.state.totalNumber}</Typography>
                                </div>
                            </ThemeProvider>
                        </Card>
                        <Card className="CasesList">
                                <ListSubheader style={{ position: 'relative', lineHeight: '25px'}}>
                                    Confirmed cases by Country/Region/Sovereignty
                                </ListSubheader>
                                <FixedSizeList height={400} width={300} itemSize={42} itemCount={this.state.casesByCountry.length}>
                                    {this.renderRow}
                                </FixedSizeList>
                        </Card>
            </div>

        )
    }
}

export default withStyles(useStyles)(TotalCases);