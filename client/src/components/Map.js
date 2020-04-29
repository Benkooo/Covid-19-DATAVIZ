import React from 'react';
import { loadModules } from 'esri-loader';
import {Button, Card} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import renderer from "../utils/Renderer";
import NbCountries from "./NbCountries";
import LastUpdate from "./LastUpdate";

import '../styles/Map.css'

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }

    setConfirmed() {
        this.setState({map:"Confirmed"});
        this.setMapConfirmed()
    }

    setDeaths() {
        this.setState({map:"Deaths"});
        this.setMapDeaths()
    }

    setRecovered() {
        this.setState({map:"Recovered"});
        this.setMapRecovered()
    }

    getCurrentDate(separator='-'){
        let newDate = new Date();
        newDate.setDate(newDate.getDate()-1);
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${month<10?`0${month}`:`${month}`}${separator}${date}${separator}${year}`
    }

    componentDidMount() {
        this.setMapConfirmed()
    }

    setMapConfirmed() {
        console.log(this.getCurrentDate());
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/CSVLayer'], { css: true })
            .then(([ArcGISMap, MapView, CSVLayer]) => {
                const mapConfirmed = new ArcGISMap({
                    basemap: "dark-gray",
                });
                const csvConfirmed = new CSVLayer("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"+ this.getCurrentDate() +".csv", {
                    latitudeField: "Lat",
                    longitudeField: 'Long_',
                    renderer: renderer.Confirmed
                });
                mapConfirmed.add(csvConfirmed);
                this.view = new MapView({
                    container: this.mapRef.current,
                    map: mapConfirmed,
                    center: [-118, 34],
                    zoom: 2,
                });
            });
    }

    setMapDeaths() {
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/CSVLayer'], { css: true })
            .then(([ArcGISMap, MapView, CSVLayer]) => {
                const mapDeaths = new ArcGISMap({
                    basemap: "dark-gray",
                });
                const csvDeaths = new CSVLayer("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"+ this.getCurrentDate() +".csv", {
                    latitudeField: "Lat",
                    longitudeField: 'Long_',
                    renderer: renderer.Deaths
                });
                mapDeaths.add(csvDeaths);
                this.view = new MapView({
                    container: this.mapRef.current,
                    map: mapDeaths,
                    center: [-118, 34],
                    zoom: 2,
                });
            });
    }

    setMapRecovered() {
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/CSVLayer'], { css: true })
            .then(([ArcGISMap, MapView, CSVLayer]) => {
                const mapRecovered = new ArcGISMap({
                    basemap: "dark-gray",
                });
                const csvRecovered = new CSVLayer("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"+ this.getCurrentDate() +".csv", {
                    latitudeField: "Lat",
                    longitudeField: 'Long_',
                    renderer: renderer.Recovered
                });
                mapRecovered.add(csvRecovered);
                this.view = new MapView({
                    container: this.mapRef.current,
                    map: mapRecovered,
                    center: [-118, 34],
                    zoom: 2,
                });
            });
    }

    componentWillUnmount() {
        if (this.view) {
            this.view.container = null;
        }
    }

    displayMap() {
        return (
            <div style={{height: "80vh"}} ref={this.mapRef} />
        )
    }

    render() {
        return (
            <div style={{flexDirection: 'column', display: "flex", marginTop: this.props.mobile ? "40px" : "90px"}}>
                <Card style={{alignItems: "center", justifyContent: "center", width: this.props.mobile ? "100vw" : "48vw", height: '78vh', backgroundColor: "#282c34"}}>
                    <div>
                        {this.displayMap()}
                    </div>
                </Card>
                {this.props.mobile &&
                    <div style={{display: 'flex', flexDirection: 'row', marginRight: 'auto', marginTop: "10px"}}>
                        <Button onClick={() => this.setConfirmed()} style={{marginLeft: 'auto', backgroundColor: '#b52826', color: 'black'}} variant="contained">Confirmed</Button>
                        <Button onClick={() => this.setDeaths()} style={{marginLeft: '10px', backgroundColor: '#B2B2B4', color: 'black'}} variant="contained">Deaths</Button>
                        <Button onClick={() => this.setRecovered()} style={{marginLeft: '10px', backgroundColor: '#43A047', color: 'black'}} variant="contained">Recovered</Button>
                    </div>
                }
                {!this.props.mobile &&
                <div style={{display: 'flex', flexDirection: 'row', maxWidth: '48vw' }}>
                    <div style={{ height: "38px", marginRight: 'auto', marginTop: "20px"}}>
                        <Button onClick={() => this.setConfirmed()} style={{marginLeft: 'auto', backgroundColor: '#b52826', color: 'black'}} variant="contained">Confirmed</Button>
                        <Button onClick={() => this.setDeaths()} style={{marginLeft: '10px', backgroundColor: '#B2B2B4', color: 'black'}} variant="contained">Deaths</Button>
                        <Button onClick={() => this.setRecovered()} style={{marginLeft: '10px', backgroundColor: '#43A047', color: 'black'}} variant="contained">Recovered</Button>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <NbCountries data={this.props.confirmedOverTime}/>
                        <LastUpdate data={this.props.confirmedOverTime}/>
                    </div>
                </div>
                }
            </div>
        );
    }
}
