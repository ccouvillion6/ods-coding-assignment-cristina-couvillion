import './App.css';
import React, {useState} from "react";
import {TableRow} from "./TableRow";
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

  const handleSubmit = (e) => {
    setSearchText(e.target.value);
    var flights = [];
    getData().then(rows => {
        const queryString = e.target.value;
        console.log(queryString);
        rows.forEach(row => {
          const origin = row.origin.toLowerCase();
          const originFull = row.origin_full_name.toLowerCase();
          const dest = row.destination.toLowerCase();
          const destFull = row.destination_full_name.toLowerCase();
          if (origin.includes(queryString) || originFull.includes(queryString) || dest.includes(queryString) || destFull.includes(queryString)) {
            flights.push(row);
          }
          //console.log(flights);
        });
      }
    ).finally(setFlightData(flights));
  }

  const insertTable = (flightData) => {
    return (
      <>
        <p>Results</p>
          <table>
            <thead>
              <tr>
                <th>Flight Number</th>
                <th>From</th>
                <th>To</th>
                <th>ETD</th>
                <th>ETA</th>
              </tr>
            </thead>
            <tbody>
              {flightData.map(row => {
                return <TableRow data={row} />
              })}
            </tbody>
          </table>
      </>
    );
  }
  
  return (
    <div className="App">
      <h1>Flight Search</h1>
      <input className="searchBar" placeholder="Search by city..." />
      <div className="buttonGroup">
        <button onClick={clearField}>Clear</button>
        { "   " }
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {insertTable(flightData)}
    </div>
  );
}

export default App;
