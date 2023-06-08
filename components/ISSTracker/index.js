import { useEffect, useState } from "react";
import Controls from "../Controls/index";
import Map from "../Map/index";

//1. import SWR (swr allready intalled- install with npm i swr)

import useSWR from "swr";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";

//2.Add the error Handling and the fetch
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

//3.- add the function: const fetcher = (...args) => fetch(...args).then((res) => res.json())
//change the name to avoid the problem with the fetcher above ;

// const myfetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ISSTracker() {
  //4. add swr desconstructing
  const {
    data,
    error,
    isLoading,
    mutate,
    // 5.-use the URL, the fetcher and the interval for the button
  } = useSWR(URL, fetcher, { refreshInterval: 5000 });

  //6. handling the error messages

  if (error) return <div>failed to load</div>;

  if (isLoading) return <div>loading...</div>;

  //- Comment the old version
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

  // console.log(coords);

  return (
    <main>
      <Map longitude={data.longitude} latitude={data.latitude} />
      <Controls
        longitude={data.longitude}
        latitude={data.latitude}
        onReload={() => handleReload(mutate())}
      />
    </main>
  );
}
