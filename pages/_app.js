import GlobalStyle from "../styles";
//add SWRconfig to make the fetcher funktion available to  the entire app.
// import { SWRConfig } from "swr";

//add the fetcher funktion
// const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* //add SWRconfig to make the fetcher funktion available to  the entire app. And add the interval for the Refetch the data*/}
      {/* <SWRConfig value={{ fetcher, refreshInterval: 5000 }}> */}
        <GlobalStyle />
        <Component {...pageProps} />
      {/* </SWRConfig> */}
    </>
  );
}
