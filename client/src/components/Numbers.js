import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { ListItem, ListItemText, Card, ListSubheader } from '@material-ui/core'
import { FixedSizeList } from 'react-window'
import '../styles/Numbers.css'

const useStyles = theme => ({
    root: {
      width: '100%',
      height: 400,
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
});

class Numbers extends React.Component {

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
            <div style={{marginLeft: "300px", marginTop: "200px"}}>
                <Card className={classes.root}>
                    <div className="NumbersWidget">
                        <ListSubheader style={{position: 'relative', lineHeight: '25px'}}>
                            Confirmed cases by Country/Region/Sovereignty
                        </ListSubheader>
                        <FixedSizeList height={400} width={300} itemSize={46} itemCount={200}>
                            {this.renderRow}
                        </FixedSizeList>
                    </div>
                </Card>
            </div>

        )
    }
}

export default withStyles(useStyles)(Numbers);