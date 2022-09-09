import './App.css';
import React, {useState, useRef, useEffect} from "react";
import {FlightTable} from "./FlightTable";
import Papa from "papaparse";

function App() {
  const [searchText, setSearchText] = useState("");
  const [flightData, setFlightData] = useState([]);
  const ref = useRef(null);

  async function fetchCsv() {
    const response = await fetch('data/flights.csv');
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    return csv;
  }

  async function getData() {
    const data = Papa.parse(await fetchCsv(), {header: true});
    return data.data;
  }

  const clearField = () => {
    setSearchText("");
    setFlightData([]);
    ref.current.value = "";
  }

  const handleSubmit = () => {
    setSearchText(ref.current.value);
  }

  const refreshFlightData = async () => {
    var flights = [];
    await getData().then(rows => {
        const queryString = searchText.toLowerCase();
        rows.forEach(row => {
          const origin = row.origin ? row.origin.toLowerCase() : "";
          const originFull = row.origin_full_name ? row.origin_full_name.toLowerCase() : "";
          const dest = row.destination ? row.destination.toLowerCase() : "";
          const destFull = row.destination_full_name ? row.destination_full_name.toLowerCase() : "";
          if (origin.includes(queryString) || originFull.includes(queryString) || dest.includes(queryString) || destFull.includes(queryString)) {
            flights.push(row);
          }
        });
      }
    ).finally(() => {
      setFlightData(flights);
    });
  }

  useEffect(() => {
    refreshFlightData();
  }, [searchText]);

  return (
    <div className="App">
      <h1>Flight Search</h1>
      <input ref={ref} className="searchBar" placeholder="Search by city..." />
      <div className="buttonGroup">
        <button onClick={clearField}>Clear</button>
        { "   " }
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {searchText.length > 0 && flightData.length === 0 ? ( 
        <p>No results found for {searchText} </p>
      ) : searchText.length > 0 && (
        <>
          <p>Results for <b>{searchText}</b></p> 
          <FlightTable flightData={flightData} />
        </>
    )}
      
    </div>
  );
}

export default App;
