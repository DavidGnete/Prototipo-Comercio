"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const Map = () => {
  const { isLoaded } = useLoadScript({
    // use env var for safety; fallback to empty string for build
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const center = { lat: 6.256058128349799, lng: -75.61064063276916 };

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div className="w-full h-full rounded-lg m-auto">
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      center={center}
      zoom={14}
      options={{
        styles: [
          { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#80b8f4" }] },
          { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#d6e6f5" }] },
          { featureType: "all", elementType: "labels", stylers: [{ visibility: "on" }] },
          { featureType: "poi", elementType: "all", stylers: [{ visibility: "on" }] },
          { featureType: "transit", elementType: "all", stylers: [{ visibility: "on" }] },
          { featureType: "road", elementType: "labels", stylers: [{ visibility: "on" }] },
        ],
        disableDefaultUI: true, // oculta controles por defecto si quieres
      }}
    >
      {typeof window !== 'undefined' && (window as any).google ? (
        <Marker
          position={center}
          icon={{
            url: "https://static.vecteezy.com/system/resources/previews/017/178/337/original/location-map-marker-icon-symbol-on-transparent-background-free-png.png",
            scaledSize: new (window as any).google.maps.Size(40, 40),
            origin: new (window as any).google.maps.Point(0, 0),
            anchor: new (window as any).google.maps.Point(20, 40),
          }}
          title="Mi ubicación"
        />
      ) : null}
    </GoogleMap>
    </div>
  );
};

export default Map;

