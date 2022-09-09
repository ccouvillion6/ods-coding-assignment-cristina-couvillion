import './App.css';
import React, {useState} from "react";
import {FlightTable} from "./FlightTable";
import Papa from "papaparse";

function App() {
  const [searchText, setSearchText] = useState("");
  const [flightData, setFlightData] = useState([]);

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
  }

  const handleSubmit = async () => {
    var flights = [];
    await getData().then(rows => {
        console.log(rows);
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
  
  return (
    <div className="App">
      <h1>Flight Search</h1>
      <input className="searchBar" placeholder="Search by city..." value={searchText} onChange={e => setSearchText(e.target.value)}/>
      <div className="buttonGroup">
        <button onClick={clearField}>Clear</button>
        { "   " }
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {flightData.length > 0 && (
        <>
          <p>Results for <b>{searchText}</b></p>
          <FlightTable flightData={flightData} />
        </>
      )}

    </div>
  );
}

export default App;
