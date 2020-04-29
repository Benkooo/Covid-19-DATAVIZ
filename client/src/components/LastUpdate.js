import React from 'react'
import { Card, Typography } from '@material-ui/core'
import moment from 'moment'

import '../styles/LastUpdate.css'

class LastUpdate extends React.Component {
    render() {

        const date = this.props.data
        console.log('bla bla bla')
        console.log(this.props.data)//.nb_countries)
        const lastUpdateDate = moment(date[date.length - 1].date).format('MMMM Do YYYY')

        return (
            <div>
                <Card className="LastUpdate" style={{backgroundColor: "#2A2A28"}}>
                    <div>
                        <Typography style={{color: 'white', fontFamily: 'Product Sans'}}>Last update at </Typography>
                        <Typography style={{fontSize:'1.5vw', color: '#BDBDBD', fontWeight: 'bold', marginTop: '7px'}} variant="h3">{lastUpdateDate}</Typography>
                    </div>
                </Card>
            </div>
        )
    }
}

export default LastUpdate;
