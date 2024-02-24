import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Controller from "./Controller";

const config = {
  center: [47.316666, 5.016667],
  zoom: 6,
};

const App = () => {
  return (
    <MapContainer
      center={config.center}
      zoom={config.zoom}
      scrollWheelZoom={false}
      className="map"
      maxZoom={17}
      minZoom={3}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Controller />
      {/* {points.length > 0 &&
        points.map((point) => (
          <Marker
            key={point.properties.id}
            position={[
              point.geometry.coordinates[1],
              point.geometry.coordinates[0],
            ]}
          >
            <Popup>{point.properties.name}</Popup>
          </Marker>
        ))} */}
    </MapContainer>
  );
};
export default App;
