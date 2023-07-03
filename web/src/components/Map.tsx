import { MapContainer, TileLayer, Marker, WMSTileLayer, useMapEvents, Popup } from 'react-leaflet'; 
import "../styles/styles.css"
import "leaflet/dist/leaflet.css"
import { Icon } from 'leaflet';
import { styled } from 'styled-components';
import { useState } from 'react';

interface MapProps  {
    height: number;
    onPositionChange: (lat: number, lng: number) => void;
}

const StyledMapContainer = styled.div<MapProps>`
    height: ${props => props.height}px;
    width: 100%;
`

interface MapEventsProps {
    onMapClick: (lat: number, lng: number) => void;
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

    const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);

    const customIcon = new Icon({
        iconUrl: require("../assets/icons/marker-icon.png"),
        iconSize: [38, 38]
    }); 
    
    const handleMapClick = (lat: number, lng: number) => {
        setMarker({
            lat: lat,
            lng: lng,
        })
        props.onPositionChange(lat, lng);
      };
      
    return (
        <StyledMapContainer height={props.height} onPositionChange={handleMapClick}>
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
                    <Marker position={[marker.lat, marker.lng]} icon={customIcon} key={marker.lat}>
                        <Popup>
                            Localização selecionada
                        </Popup>
                    </Marker>
                )}
            </MapContainer>

            
        </StyledMapContainer>
    )

}

