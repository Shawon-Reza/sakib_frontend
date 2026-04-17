'use client';

import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

type LeafletComponents = {
  MapContainer: typeof import('react-leaflet')['MapContainer'];
  TileLayer: typeof import('react-leaflet')['TileLayer'];
  Marker: typeof import('react-leaflet')['Marker'];
  Popup: typeof import('react-leaflet')['Popup'];
};

export default function LocationMap() {
  const [leafletComponents, setLeafletComponents] =
    useState<LeafletComponents | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadMap = async () => {
      const [reactLeaflet, leafletModule] = await Promise.all([
        import('react-leaflet'),
        import('leaflet'),
      ]);

      const L = leafletModule.default;
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      if (!cancelled) {
        setLeafletComponents({
          MapContainer: reactLeaflet.MapContainer,
          TileLayer: reactLeaflet.TileLayer,
          Marker: reactLeaflet.Marker,
          Popup: reactLeaflet.Popup,
        });
      }
    };

    void loadMap();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!leafletComponents) {
    return (
      <div
        className="w-full animate-pulse rounded-md bg-muted/50"
        style={{ height: 250 }}
      />
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = leafletComponents;
  const position: [number, number] = [23.14820041251338, 89.20185725536862];
// 23.14820041251338, 89.20185725536862
  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom
      style={{ height: '250px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      <Marker position={position}>
        <Popup>
          <div style={{ minWidth: '200px' }}>
            <h3>Modina Enterprise And Leaker Center</h3>
            <p>46X2+6PX, Raja Barda Kanto Rd, dalmil</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}