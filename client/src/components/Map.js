import React, {Component} from 'react';
import MapGL, {Layer, Source} from 'react-map-gl';
import {Card } from "@material-ui/core";
import {clusterCountLayer, clusterLayer, unclusteredPointLayer} from "./layers";
import test from '../assets/test.geojson';
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXBpYmlub3VzZSIsImEiOiJjazhyZjFwMmIwNmdhM21wOWk0djhyOHpwIn0.dvTKZIP4mnJFUJxm6IQWmg'; // Set your mapbox token here

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 0,
                longitude: 0,
                zoom: 2,
                bearing: 0,
                pitch: 0
            },
        };
    }


    _sourceRef = React.createRef();

    _onViewportChange = viewport => this.setState({viewport});

    _onClick = event => {
        const feature = event.features[0];
        if (!feature)
            return;
        const clusterId = feature.properties.cluster_id;

        const mapboxSource = this._sourceRef.current.getSource();

        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) {
                return;
            }

            this._onViewportChange({
                ...this.state.viewport,
                longitude: feature.geometry.coordinates[0],
                latitude: feature.geometry.coordinates[1],
                zoom,
                transitionDuration: 500
            });
        });
    };

    render() {

        const {viewport} = this.state;

        return (
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "120px"}}>
                <Card style={{alignItems: "center", justifyContent: "center", width: "55vw"}}>
                    <div className="MapWidget">
                        <MapGL
                            {...viewport}
                            width="55vw"
                            height="80vh"
                            mapStyle="mapbox://styles/mapbox/dark-v9"
                            onViewportChange={this._onViewportChange}
                            mapboxApiAccessToken={MAPBOX_TOKEN}
                            interactiveLayerIds={[clusterLayer.id]}
                            onClick={this._onClick}
                        >
                            <Source
                                type="geojson"
                                data={test}
                                cluster={true}
                                clusterMaxZoom={14}
                                clusterRadius={50}
                                ref={this._sourceRef}
                            >
                                <Layer {...clusterLayer} />
                                <Layer {...clusterCountLayer} />
                                <Layer {...unclusteredPointLayer} />
                            </Source>
                        </MapGL>
                    </div>
                </Card>
            </div>

        );
    }
}

document.body.style.margin = 0;
