import React from 'react'

class Certificate extends React.Component {
    render() {
        return (
            <div>
                <img 
                    style={{maxWidth: '20%', height: 'auto', marginTop: '100px'}}
                    src={"http://" + this.props.urlQRCode}
                    alt="new"
                />
            </div>
        )
    }
}

export default Certificate;