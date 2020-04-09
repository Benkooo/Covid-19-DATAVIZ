import React from 'react'
import { withStyles, ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme, CssBaseline, ListItem, ListItemText, Card, ListSubheader, Typography } from '@material-ui/core'
import { FixedSizeList } from 'react-window'
import '../styles/TotalCases.css'

const useStyles = theme => ({
    list: {
      height: 400,
      maxWidth: 300,
      backgroundColor: theme.palette.background.default,
      
    },
    total: {
        height: 100,
        width: 300,
        maxWidth: 300,
        marginBottom: '30px',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

class TotalCases extends React.Component {

    renderRow = props => {
        const { index, style } = props

        return (
            <div>
                <ListItem divider={true} button style={style} key={index}>
                    <ListItemText primary={`${index + 1} France`}/>
                </ListItem>
            </div>
        )
    }
    
    render() {
          const { classes } = this.props

        return (
            <div className="CasesContainer">
                        <Card className={classes.total}>
                            <Typography>
                                Total confirmed
                            </Typography>
                            <Typography>
                                1 498 000
                            </Typography>
                        </Card>
                        <Card className={classes.list}>
                                <ListSubheader style={{ position: 'relative', lineHeight: '25px'}}>
                                    Confirmed cases by Country/Region/Sovereignty
                                </ListSubheader>
                                <FixedSizeList height={400} width={300} itemSize={46} itemCount={200}>
                                    {this.renderRow}
                                </FixedSizeList>
                        </Card>
            </div>

        )
    }
}

export default withStyles(useStyles)(TotalCases);