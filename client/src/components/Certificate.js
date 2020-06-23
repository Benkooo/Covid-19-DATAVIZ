import React from 'react'
import { TextField, FormControl, Checkbox, Typography, Snackbar, FormControlLabel, Button } from '@material-ui/core'
import axios from 'axios'
import MuiAlert from '@material-ui/lab/Alert'

import '../styles/Certificate.css'

class Certificate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dispError: false,
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

    handleClose = () => {
        this.setState({
            dispError: false
        })
    }

    handleChangeText = (event, field) => {
        this.setState({
            [field]: event.target.value
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

    submitForm = () => {
        
            if (this.state.checkedOne) {
                this.setState({
                    check: 0
                })
            } else if (this.state.checkedTwo) {
                this.setState({
                    check: 1
                })
            } else if (this.state.checkedThree) {
                this.setState({
                    check: 2
                })
            } else if (this.state.checkedFour) {
                this.setState({
                    check: 3
                })
            } else if (this.state.checkedFive) {
                this.setState({
                    check: 4
                })
            } else if (this.state.checkedSix) {
                this.setState({
                    check: 5
                })
            } else if (this.state.checkedSeven) {
                this.setState({
                    check: 6
                })
            }

            if (this.state.surname || this.state.name || this.state.birthdate
                || this.state.birthplace || this.state.address || this.state.city
                || this.state.postcode || this.state.dateOut || this.state.timeOut === '') {
                    this.setState({
                        dispError: true
                    })
            } else {
                //post data
                axios.post("http://localhost:5000/get_qrcode", {
                    surname: this.state.surname,
                    name: this.state.name,
                    birthdate: this.state.birthdate,
                    birthplace: this.state.birthplace,
                    address: this.state.address,
                    city: this.state.city,
                    postcode: this.state.postcode,
                    check: this.state.check,
                    dateOut: this.state.dateOut,
                    timeOut: this.state.timeOut
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }

    }

    render() {

        return (
            <div className="Code">
                    <Typography style={{fontFamily: 'Product Sans', fontSize: '35px', marginBottom: '30px'}}>
                        COVID-19 Travel certificate
                    </Typography>
                    <div className="CertifInput">
                    <FormControl error={this.state.dispError}>
                        <TextField 
                            style={{marginTop: '30px', width: '350px'}}
                            id="surname"
                            label="surname"
                            variant="outlined"
                            onChange={(event) => this.handleChangeText(event, "surname")}
                            value={this.state.surname}
                        />
                        <TextField 
                        style={{marginTop: '30px', width: '350px'}}
                            id="name"
                            label="name"
                            variant="outlined"
                            onChange={(event) => this.handleChangeText(event, "name")}
                            value={this.state.name}
                        />
                        <TextField 
                        style={{marginTop: '30px', width: '350px'}}
                            id="birthdate"
                            type="date"
                            variant="outlined"
                            onChange={(event) => this.handleChangeText(event, "birthdate")}
                            value={this.state.birthdate}
                        />
                        <TextField 
                        style={{marginTop: '30px', width: '350px'}}
                            id="birthplace"
                            label="birthplace"
                            variant="outlined"
                            onChange={(event) => this.handleChangeText(event, "birthplace")}
                            value={this.state.birthplace}
                        />
                        <TextField 
                        style={{marginTop: '30px', width: '350px'}}
                            id="address"
                            label="address"
                            variant="outlined"
                            onChange={(event) => this.handleChangeText(event, "address")}
                            value={this.state.address}
                        />
                        <TextField 
                        style={{marginTop: '30px', width: '350px'}}
                            id="city"
                            label="city"
                            variant="outlined"
                            onChange={(event) => this.handleChangeText(event, "city")}
                            value={this.state.city}
                        />
                        <TextField 
                        style={{marginTop: '30px', width: '350px'}}
                            id="postcode"
                            label="postcode"
                            variant="outlined"
                            onChange={(event) => this.handleChangeText(event, "postcode")}
                            value={this.state.postcode}
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
                        <TextField 
                        style={{marginTop: '30px', width: '350px'}}
                            id="date out"
                            type="date"
                            defaultValue="2020-05-04"
                            onChange={(event) => this.handleChangeText(event, "dateOut")}
                            value={this.state.dateOut}
                        />
                        <TextField 
                        style={{marginTop: '30px', width: '350px'}}
                            id="timeout"
                            type="time"
                            defaultValue="23:42"
                            onChange={(event) => this.handleChangeText(event, "timeOut")}
                            value={this.state.timeOut}
                        />
                    </FormControl>
                    
                    <Button style={{marginTop: "43px", marginBottom: '22px'}} variant="contained" color="primary" onClick={this.submitForm}>
                        Generate certificate
                    </Button>
                    
                    <Snackbar 
                    style={{top: 100, height: 0}} 
                    anchorOrigin={ {vertical: 'top', horizontal: 'center'} } 
                    open={this.state.dispError} 
                    autoHideDuration={6000} 
                    onClose={this.handleClose} >
                    <MuiAlert variant="filled" severity="error" onClose={this.handleClose}>
                        Invalid informations
                    </MuiAlert>
                    </Snackbar>

                    </div>
            </div>
        )
    }
}

export default Certificate;