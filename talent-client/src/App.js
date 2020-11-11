import React, { useState } from 'react';
import logo from "./logo.svg";
import "./App.css";
import csvToJson from "./csvToJson/csvToJson";

function App() {

  const [csvFile, setCsvFile] = useState()

  const handleCsvFile = (e) => {
    e.preventDefault();
    let formData = new FormData()
    formData.append('file', e.target.files[0]);
    console.log(e.target.files[0])
    setCsvFile(formData)
    console.log(formData, "aaa")
  }

  const handleConvert = () => {
    let options = {
      method: "POST",
      headers: csvFile,
      body: csvFile,
    };

    fetch(`http://localhost:3000/api/v1/csv`, options)
      .then((resp) => resp.json())
      .then((result) => {
        alert(result.message);
        console.log(result)
      });
  };

  return (
    <div className="App">
      
        <div class="conatiner mt-5">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-3">
            <input
              class="form-control"
              type="file"
              id="input"
              accept=".csv,.xls,.xlsx"
              onChange={handleCsvFile}
            ></input>
          </div>
          <div class="col-md-2">
            <button class="btn btn-primary" id="button" onClick={handleConvert}>
              Convert
            </button>
          </div>
          <div class="col-md-12">
            <pre id="jsondata"></pre>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
