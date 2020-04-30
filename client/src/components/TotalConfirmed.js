import React from 'react'
import { List, ListItem, ListItemText, Card, Divider, ListSubheader, Typography } from '@material-ui/core'

import '../styles/TotalConfirmed.css'

class TotalConfirmed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalConfirmed: this.props.totalConfirmed,
            data: this.props.data,
            showList: false
        }
    }

    render() {
        console.log(this.state.showList);
        return (
            <div>
                <Card className="CasesTotal" onClick={() => this.setState({showList: !this.state.showList})} style={{height: this.props.mobile ? "200px" : "160px", backgroundColor: "#2A2A28", marginBottom: this.props.mobile ? "0" : "30px"}}>
                    <div>
                            <Typography style={{fontSize: this.props.mobile ? "3vh" : "2vh", color: 'white', fontFamily: 'Product Sans'}}>Total confirmed </Typography>
                            <Typography style={{fontSize: this.props.mobile ? "8vh" : "3vw", color: '#9D1C19', fontWeight: 'bold', marginTop: '7px'}} variant="h3">{this.state.totalConfirmed}</Typography>
                    </div>
                </Card>
                {!this.props.mobile || this.state.showList ?
                    <Card style={{marginTop: this.props.mobile ? "3px" : "0", backgroundColor: '#2A2A28', maxHeight: '60vh', overflow: 'auto', overflowX: 'hidden' }}>
                        <List>
                            <ListSubheader disableGutters disableSticky className="ListSubheader" style={{ color: '#747474', lineHeight: '25px'}}>Confirmed cases by Country/Region/Sovereignty</ListSubheader>
                            <div>
                                {this.state.data.map((item, key) => (
                                    <div key={key}>
                                        <ListItem button >
                                            <ListItemText primary={item.Confirmed} primaryTypographyProps={{style: {color: '#9D1C19', fontWeight: 'bold'}}} />
                                            <ListItemText primary={item.Country_Region} primaryTypographyProps={{style: {fontFamily: 'Product Sans', marginLeft: '10px', color: 'white' }}}/>
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

        )
    }
}

export default TotalConfirmed;
