import React from 'react'
import { Card, Typography } from '@material-ui/core'
import moment from 'moment'

import '../styles/NbCountries.css'

class NbCountries extends React.Component {
    render() {
        const nbCountriesInfected = (!this.props.data) ? 0 : (Object.keys(this.props.data).length <= 0) ? 0 : Object.keys(this.props.data[0]).length;

        return (
            <div>
                <Card className="NbCountries" style={{backgroundColor: "#2A2A28"}}>
                    <div>
                        <Typography style={{color: 'white', fontFamily: 'Product Sans'}}>Number of infected countries </Typography>
                        <Typography style={{fontSize:'1.5vw', color: '#BDBDBD', fontWeight: 'bold', marginTop: '7px'}} variant="h3">{nbCountriesInfected}</Typography>
                    </div>
                </Card>
            </div>
        )
    }
}

export default NbCountries;
