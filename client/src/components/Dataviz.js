import React from 'react'

import DashboardMobile from "./DashboardMobile";
import Dashboard from "./Dashboard";

class Dataviz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: false
        }
        this.setMobile = this.setMobile.bind(this);
    }

    setMobile() {
        this.setState({mobile: !this.state.mobile})
    }

    render() {
        return (
            <div>
                {this.state.mobile ?
                    <DashboardMobile setMobile={this.setMobile}/>
                    :
                    <Dashboard setMobile={this.setMobile}/>
                }
            </div>
        )
    }
}

export default Dataviz;
