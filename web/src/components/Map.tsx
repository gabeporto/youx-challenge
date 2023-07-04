import { MapContainer, TileLayer, Marker, WMSTileLayer, useMapEvents, Popup } from 'react-leaflet'; 
import "../styles/styles.css"
import "leaflet/dist/leaflet.css"
import { Icon } from 'leaflet';
import { styled } from 'styled-components';
import { useState } from 'react';

interface MapProps  {
    height: number;
    onPositionChange: (latitude: number, longitude: number) => void;
    currentPosition?: {latitude : number, longitude : number};
}

const StyledMapContainer = styled.div<MapProps>`
    height: ${props => props.height}px;
    width: 100%;
`

interface MapEventsProps {
    onMapClick: (latitude: number, longitude: number) => void;
}

function MapEvents({ onMapClick }: MapEventsProps) {
    useMapEvents({
        click: (event) => {
        const { lat, lng } = event.latlng;
        onMapClick(lat, lng);
        },
    });

    return null;
}

export default function Map(props : MapProps) {

    const [marker, setMarker] = useState({
        latitude: props.currentPosition?.latitude || 0,
        longitude: props.currentPosition?.longitude || 0
    });

    const customIcon = new Icon({
        iconUrl: require("../assets/icons/marker-icon.png"),
        iconSize: [38, 38]
    }); 
    
    const handleMapClick = (latitude: number, longitude: number) => {
        setMarker({
            latitude: latitude,
            longitude: longitude,
        })
        props.onPositionChange(latitude, longitude);
      };

    return (
        <StyledMapContainer height={props.height} onPositionChange={handleMapClick} currentPosition={props?.currentPosition}>
            <MapContainer center={[-22.252252, -45.703597]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <WMSTileLayer
                    url="http://sistemas.gt4w.com.br/geoserver/processo_seletivo/wms"
                    layers="processo_seletivo:ufs_brasil"
                    format="image/png"
                    transparent={true}
                />

                 <MapEvents onMapClick={handleMapClick}/>
                {marker && (
                    <Marker position={[marker.latitude, marker.longitude]} icon={customIcon} key={marker.latitude}>
                        <Popup>
                            Localização selecionada
                        </Popup>
                    </Marker>
                )}
            </MapContainer>

            
        </StyledMapContainer>
    )

}

