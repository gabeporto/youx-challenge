import { MapContainer, TileLayer, Marker } from 'react-leaflet'; 
import "../styles/styles.css"
import "leaflet/dist/leaflet.css"
import { Icon, LatLngExpression } from 'leaflet';
import { styled } from 'styled-components';

interface MapProp  {
    height: number;
}

const StyledMapContainer = styled.div<MapProp>`
    height: ${props => props.height}px;
    width: 100%;
`

export default function Map(props : MapProp) {
    
    // Examples 
    const markers = [
        {
        id: 1,
        geocode: [-22.252252, -45.703597],
        popUp: "Hello, I am pop up 1"
        },
        {
        id: 2,
        geocode: [-22.232252, -45.703597],
        popUp: "Hello, I am pop up 2"
        },
        {
        id: 3,
        geocode: [-22.253552, -45.685597],
        popUp: "Hello, I am pop up 3"
        }
    ];

    const customIcon = new Icon({
        iconUrl: require("../assets/icons/marker-icon.png"),
        iconSize: [38, 38]
    }); 
    
    return (
        <StyledMapContainer height={props.height}>
            <MapContainer center={[-22.252252, -45.703597]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((marker) => {
                    const markerCoordinates: LatLngExpression = [marker.geocode[0], marker.geocode[1]];
                    return <Marker position={markerCoordinates} icon={customIcon} key={marker.id} /> ;
                })}
            </MapContainer>
        </StyledMapContainer>
    )
}
