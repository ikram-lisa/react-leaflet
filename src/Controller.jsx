import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Icon, DivIcon, Point } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import useSupercluster from "use-supercluster";
import { getColorName } from "./helpers";

const config = {
  center: [47.316666, 5.016667],
  zoom: 6,
};
const markerIcon = new Icon({
  iconUrl: "/marker.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 30],
  popupAnchor: [0, -30],
});
const Controller = () => {
  const [points, setPoints] = useState([]);
  const [bounds, setBounds] = useState([]);
  const [zoom, setZoom] = useState(config.zoom);

  const map = useMapEvents({
    moveend: () => {
      const b = map.getBounds();
      setBounds([
        b.getSouthWest().lng,
        b.getSouthWest().lat,
        b.getNorthEast().lng,
        b.getNorthEast().lat,
      ]);
    },
    zoomend: () => {
      setZoom(map.getZoom());
    },
  });
  const { clusters, supercluster } = useSupercluster({
    points: points,
    bounds: bounds,
    zoom: zoom,
    options: { radius: 75 },
  });

  //   useEffect(() => {
  //     console.log(clusters);
  //     console.log(bounds);
  //     console.log(zoom);
  //   }, [points, bounds, zoom]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://api.irail.be/stations/?format=json&lang=nl"
      );
      const data = await response.json();
      setPoints(
        data.station.map((s) => ({
          type: "Feature",
          properties: { cluster: false, name: s.name, id: s.id },
          geometry: {
            type: "Point",
            coordinates: [parseFloat(s.locationX), parseFloat(s.locationY)],
          },
        }))
      );
    })();

    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);

    setZoom(map.getZoom());

    // uitbreiding zet de bounds van de kaart zodat we alle points zien
    // map.fitBounds())
  }, []);
  return (
    clusters.length > 0 &&
    clusters.map(
      (
        {
          id,
          properties: { cluster: isCluster, point_count, name },
          geometry: {
            coordinates: [x, y],
          },
        },
        i
      ) =>
        isCluster ? (
          <Marker
            icon={
              new DivIcon({
                iconSize: new Point(
                  40 + (point_count / points.length) * 40,
                  40 + (point_count / points.length) * 40
                ),
                className: `clusterIcon clusterIcon--${getColorName(
                  point_count
                )}`,
                html: point_count,
              })
            }
            key={i}
            position={[y, x]}
            eventHandlers={{
              click: () => {
                const expansionZoom = supercluster.getClusterExpansionZoom(id);
                map.setView([y, x], expansionZoom, {
                  animate: true,
                });
              },
            }}
          />
        ) : (
          <Marker icon={markerIcon} key={i} position={[y, x]}>
            <Popup>{name}</Popup>
          </Marker>
        )
    )
  );
};
export default Controller;
