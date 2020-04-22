import React from 'react';
import { loadModules } from 'esri-loader';
import {Card, CircularProgress} from "@material-ui/core";

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.state= {
            dispMap: true,
        }
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
        console.log(this.getCurrentDate());
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/CSVLayer'], { css: true })
            .then(([ArcGISMap, MapView, CSVLayer]) => {
                const map = new ArcGISMap({
                    basemap: "dark-gray",
                });
                const defaultSym = {
                    type: "simple-marker",
                    color : {
                        r: 170,
                        g: 16,
                        b: 15,
                        a: 0.7
                    }
                };
                const renderer = {
                    type: "simple",
                    symbol: defaultSym,
                    visualVariables: [
                        {
                            type: "size",
                            field: "Confirmed",
                            stops: [
                                {
                                    value: 0,
                                    size: 4,
                                },
                                {
                                    value: 1000,
                                    size: 10,
                                },
                                {
                                    value: 5000,
                                    size: 12,
                                },
                                {
                                    value: 10000,
                                    size: 15,
                                },
                                {
                                    value: 30000,
                                    size: 16,
                                },
                                {
                                    value: 50000,
                                    size: 17,
                                },
                                {
                                    value: 60000,
                                    size: 18,
                                },
                                {
                                    value: 80000,
                                    size: 20,
                                },
                                {
                                    value: 100000,
                                    size: 30,
                                },
                                {
                                    value: 200000,
                                    size: 40,
                                },
                            ]
                        }
                    ]
                };
                const csv = new CSVLayer("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"+ this.getCurrentDate() +".csv", {
                    latitudeField: "Lat",
                    longitudeField: 'Long_',
                    renderer: renderer
                });
                map.add(csv);
                this.view = new MapView({
                    container: this.mapRef.current,
                    map: map,
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
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: this.props.mobile ? "50px" : "120px"}}>
                <Card style={{alignItems: "center", justifyContent: "center", width: this.props.mobile ? "100vw" : "55vw", height: '80vh', backgroundColor: "#282c34"}}>
                    <div className="MapWidget">
                        {this.displayMap()}
                    </div>
                </Card>
            </div>
        );
    }
}
