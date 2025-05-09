import  { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import { cn } from "@/lib/utils";

interface Place {
  type: "Feature";
  properties: {
    latitude: number;
    longitude: number;
    name: string;
    pop_max: number;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
}

interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: [string, string];
  dashLength?: number;
  dashGap?: number;
  animateTime?: number;
}

const World = ({ className }: { className?: string }) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [arcsData, setArcsData] = useState<ArcData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "./ne_110m_populated_places_simple.geojson"
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch GeoJSON data: ${response.status}`);
        }
        const data = await response.json();

        // Type assertion to ensure correct type
        const features = data.features as Place[];
        setPlaces(features);
      } catch (error) {
        console.error("Error fetching or processing data:", error);
        // Consider setting an error state to display a message to the user
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Generate arc data only after places data is loaded
    if (places.length > 0) {
      const generatedArcsData: ArcData[] = [];
      const numArcs = 20; // Or any number you want
      for (let i = 0; i < numArcs; i++) {
        // Get two random places.  Make sure we don't get the same place twice.
        const startPlaceIndex = Math.floor(Math.random() * places.length);
        let endPlaceIndex = Math.floor(Math.random() * places.length);
        while (endPlaceIndex === startPlaceIndex) {
          endPlaceIndex = Math.floor(Math.random() * places.length);
        }

        const startPlace = places[startPlaceIndex];
        const endPlace = places[endPlaceIndex];

        generatedArcsData.push({
          startLat: startPlace.properties.latitude,
          startLng: startPlace.properties.longitude,
          endLat: endPlace.properties.latitude,
          endLng: endPlace.properties.longitude,
          color: [
            ["red", "white", "blue", "green"][Math.floor(Math.random() * 4)],
            ["red", "white", "blue", "green"][Math.floor(Math.random() * 4)],
          ] as [string, string], // Type assertion here
          dashLength: Math.random(),
          dashGap: Math.random(),
          animateTime: Math.random() * 4000 + 500,
        });
      }
      setArcsData(generatedArcsData);
    }
  }, [places]);

  return (
    <div className={cn(className)}>
      <Globe
        width={800}
        height={800}
        backgroundColor="rgba(0,0,0,0.0)"
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
        labelsData={places}
        labelLat={(d) => (d as Place).properties.latitude}
        labelLng={(d) => (d as Place).properties.longitude}
        labelText={(d) => (d as Place).properties.name}
        labelSize={(d) => Math.sqrt((d as Place).properties.pop_max) * 4e-4}
        labelDotRadius={(d) => Math.sqrt((d as Place).properties.pop_max) * 4e-4}
        labelColor={() => "rgba(255, 165, 0, 0.75)"}
        labelResolution={2}
        arcsData={arcsData}
        arcColor="color"
        arcDashLength="dashLength"
        arcDashGap="dashGap"
        arcDashAnimateTime="animateTime"
      />
    </div>
  );
};

export default World;
