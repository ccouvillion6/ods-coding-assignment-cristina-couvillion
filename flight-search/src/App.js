import './App.css';
import {useState} from "react";

function App() {
  const [searchText, setSearchText] = useState("");
  const handleChange = (event) => {
    setSearchText(event.target.value);
  }
  const clearField = () => {
    setSearchText("");
  }
  const handleSubmit = () => {
    console.log("Submitted");
  }
  return (
    <div className="App">
      <h1>Flight Search</h1>
      <input className="searchBar" placeholder="Search by city..." onChange={handleChange} value={searchText} />
      <div className="buttonGroup">
        <button onClick={clearField}>Clear</button>
        { "   " }
        <button onClick={handleSubmit}>Submit</button>
      </div>
      
      <p>Results</p>
    </div>
  );
}

export default App;
