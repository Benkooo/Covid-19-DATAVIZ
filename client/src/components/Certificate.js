import React from 'react'
import { TextField, FormControl, Checkbox, Typography, FormControlLabel } from '@material-ui/core'

import '../styles/Certificate.css'

class Certificate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surname: '',
            name: '',
            birthdate: '',
            birthplace: '',
            address: '',
            city: '',
            postcode: '',
            check: 0,
            dateOut: '',
            timeOut: '',
            checkedOne: false,
            checkedTwo: false,
            checkedThree: false,
            checkedFour: false,
            checkedFive: false,
            checkedSix: false,
            checkedSeven: false,
        }
    }

    handleChangeText = event => {
        this.setState({
            [event]: event.target.value
        })
    }

    handleChangeBoxOne = () => {
        this.setState({
            checkedOne: !this.state.checkedOne
        })
    }

    handleChangeBoxTwo = () => {
        this.setState({
            checkedTwo: !this.state.checkedTwo
        })
    }

    handleChangeBoxThree = () => {
        this.setState({
            checkedThree: !this.state.checkedThree
        })
    }

    handleChangeBoxFour = () => {
        this.setState({
            checkedFour: !this.state.checkedFour
        })
    }

    handleChangeBoxFive = () => {
        this.setState({
            checkedFive: !this.state.checkedFive
        })
    }

    handleChangeBoxSix = () => {
        this.setState({
            checkedSix: !this.state.checkedSix
        })
    }

    handleChangeBoxSeven = () => {
        this.setState({
            checkedSeven: !this.state.checkedSeven
        })
    }

    render() {

        const code = this.props.urlQRCode

        return (
            <div className="Code">
                    <Typography style={{fontFamily: 'Product Sans', fontSize: '35px', marginBottom: '30px'}}>
                        COVID-19 Travel certificate
                    </Typography>
                    <div className="CertifInput">
                    <FormControl>
                        <TextField 
                            style={{marginTop: '30px', width: '350px'}}
                            id="surname"
                            label="surname"
                            variant="outlined"
                        />
                        <TextField 
                        style={{marginTop: '30px', width: '350px'}}
                            id="name"
                            label="name"
                            variant="outlined"
                        />
                        <TextField 
                        style={{marginTop: '30px', width: '350px'}}
                            id="birthdate"
                            type="date"
                            variant="outlined"
                        />
                        <TextField 
                        style={{marginTop: '30px', width: '350px'}}
                            id="birthplace"
                            label="birthplace"
                            variant="outlined"
                        />
                        <TextField 
                        style={{marginTop: '30px', width: '350px'}}
                            id="address"
                            label="address"
                            variant="outlined"
                        />
                        <TextField 
                        style={{marginTop: '30px', width: '350px'}}
                            id="city"
                            label="city"
                            variant="outlined"
                        />
                        <TextField 
                        style={{marginTop: '30px', width: '350px'}}
                            id="postcode"
                            label="postcode"
                            variant="outlined"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.checkedOne}
                                    onChange={this.handleChangeBoxOne}
                                    name="Work"
                                    color="primary"
                                />
                            }
                            style={{marginTop: '30px', maxWidth: '350px'}}
                            label="Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle, lorsqu'ils sont indispensables à l'exercice d’activités ne pouvant être organisées sous forme de télétravail ou déplacements professionnels ne pouvant être différés."
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.checkedTwo}
                                    onChange={this.handleChangeBoxTwo}
                                    name="Work"
                                    color="primary"
                                />
                            }
                            style={{marginTop: '30px', maxWidth: '350px'}}
                            label="Déplacements pour effectuer des achats de fournitures nécessaires à l’activité professionnelle et des achats de première nécessité dans des établissements dont les activités demeurent autorisées"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.checkedThree}
                                    onChange={this.handleChangeBoxThree}
                                    name="Work"
                                    color="primary"
                                />
                            }
                            style={{marginTop: '30px', maxWidth: '350px'}}
                            label="Consultations et soins ne pouvant être assurés à distance et ne pouvant être différés ; consultations et soins des patients atteints d'une affection de longue durée."
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.checkedFour}
                                    onChange={this.handleChangeBoxFour}
                                    name="Work"
                                    color="primary"
                                />
                            }
                            style={{marginTop: '30px', maxWidth: '350px'}}
                            label="Déplacements pour motif familial impérieux, pour l’assistance aux personnes vulnérables ou la garde d’enfants."
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.checkedFive}
                                    onChange={this.handleChangeBoxFive}
                                    name="Work"
                                    color="primary"
                                />
                            }
                            style={{marginTop: '30px', maxWidth: '350px'}}
                            label="Déplacements brefs, dans la limite d'une heure quotidienne et dans un rayon maximal d'un kilomètre autour du domicile, liés soit à l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive collective et de toute proximité avec d'autres personnes, soit à la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie."
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.checkedSix}
                                    onChange={this.handleChangeBoxSix}
                                    name="Work"
                                    color="primary"
                                />
                            }
                            style={{marginTop: '30px', maxWidth: '350px'}}
                            label="Convocation judiciaire ou administrative."
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.checkedSeven}
                                    onChange={this.handleChangeBoxSeven}
                                    name="Work"
                                    color="primary"
                                />
                            }
                            style={{marginTop: '30px', maxWidth: '350px'}}
                            label="Participation à des missions d’intérêt général sur demande de l’autorité administrative."
                        />
                    </FormControl>
                    <img 
                        style={{maxWidth: '20%', height: 'auto', marginTop: '100px'}}
                        src={"http://" + code}
                        alt="new"
                    />
                    </div>
            </div>
        )
    }
}

export default Certificate;