import { useEffect, useState } from "react";
import Controls from "../Controls/index";
import Map from "../Map/index";

//3. import SWR (swr allready intalled- install with npm i swr)

import { SWRConfig } from "swr";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";

//4. add the function: const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher = (URL) => fetch(URL).then((res) => res.json());

//1.- I change the name of the state to recognise it quickly. coords to coordState...

export default function ISSTracker() {
  // const [coordsState, setCoordsState] = useState({
  //   longitude: 0,
  //   latitude: 0,
  // });

  //5.- useSWR

  const { data, error, isLoading } = useSWR(URL, fetcher);

  if (error) return <div>failed to load</div>;

  if (isLoading) return <div>loading...</div>;

  //2.- Comment the old version
  // async function getISSCoords() {
  //   try {
  //     const response = await fetch(URL);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setCoordsState({ longitude: data.longitude, latitude: data.latitude });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     getISSCoords();
  //   }, 5000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <SWRConfig value={{ fetcher, refreshInterval: 5000 }}>
      <main>
        <Map longitude={data.longitude} latitude={data.latitude} />
        <Controls
          longitude={data.longitude}
          latitude={data.latitude}
          //2.- comment old version - onRefresh={getISSCoords}
        />
      </main>
    </SWRConfig>
  );
}
