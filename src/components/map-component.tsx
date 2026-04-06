'use client'; // Important for Next.js App Router

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Don't forget the CSS
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons in Next.js (important!)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function LocationMap() {
    const position: [number, number] = [23.1641, 89.2065]; // ← Change to your location (lat, lng)

    return (
        <MapContainer
            center={position}
            zoom={17}
            scrollWheelZoom={true}
            style={{ height: '250px', width: '100%' }}
        >
            {/* Free OpenStreetMap tiles (looks very similar to Google) */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Your pin */}
            <Marker position={position}>
                <Popup>
                    <div style={{ minWidth: '200px' }}>
                        <h3>Your Location Name</h3>
                        <p>Your address here</p>
                        {/* Add rating, buttons, etc. just like Google Maps */}
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
}