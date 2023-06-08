import { useEffect, useState } from "react";
import Controls from "../Controls/index";
import Map from "../Map/index";

//3. import SWR (swr allready intalled- install with npm i swr)

import { useSWR } from "swr";c

const URL = "https://api.wheretheiss.at/v1/satellites/25544";

//4. add the function: const fetcher = (...args) => fetch(...args).then((res) => res.json());
// const fetcher = (...args) => fetch(...args).then((res) => res.json())

const fetcher = async (URL) => {
  const res = await fetch(URL);
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function ISSTracker() {
  // const [coordsState, setCoordsState] = useState({
  //   longitude: 0,
  //   latitude: 0,
  // });

  //5.- useSWR

  const { data, isLoading, mutate } = useSWR(URL, fetcher);

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
    // <SWRConfig value={{ fetcher, refreshInterval: 5000 }}>
    <main>
      <Map longitude={data.longitude} latitude={data.latitude} />
      <Controls
        longitude={data.longitude}
        latitude={data.latitude}
        onReload={() => handleReload(mutate())}
      />
    </main>
    // </SWRConfig>
  );
}
