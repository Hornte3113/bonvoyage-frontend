"use client";

import { useRef, useCallback } from "react";
import Map, { MapMouseEvent } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

type SelectedPlace = {
  name: string;
  lng: number;
  lat: number;
};

type Props = {
  onPlaceSelect: (place: SelectedPlace) => void;
};

export default function MapView({ onPlaceSelect }: Props) {
  const mapRef = useRef(null);

  const handleClick = useCallback(
    async (e: MapMouseEvent) => {
      const { lng, lat } = e.lngLat;

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&language=es`
      );
      const data = await response.json();
      const placeName = data.features?.[0]?.place_name ?? `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

      onPlaceSelect({ name: placeName, lng, lat });
    },
    [onPlaceSelect]
  );

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: 0,
        latitude: 20,
        zoom: 2,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      onClick={handleClick}
      cursor="pointer"
    />
  );
}
