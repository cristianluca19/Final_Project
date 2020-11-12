import React, {useState} from 'react';
import axios from 'axios';

function CsvToJson() {

  const [csvTransformedToJson, setCsvTransformedToJson] = useState()
  const [candidates, setCandidates] = useState()

  const handleCsvFile = (e) => {
    e.preventDefault();
    let csvToJson = e.target.files[0];
    console.log(csvToJson)
    let formData = new FormData();
    formData.append("file", csvToJson);
    console.log(formData)
    axios({
      method: 'post',
      url: 'http://localhost:5000/api/candidates/csv',    //modificar puerto localhost
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' }}
    })
      .then((res) => {
        setCsvTransformedToJson(res.data)
      });
  };

  const handleConvert = () => {    //pasar esta funcion a redux
    axios
      .post(`http://localhost:5000/api/candidates`, csvTransformedToJson)   //modificar puerto localhost
      .then((res) => {
        console.log(res.data, "bulkCandidate")
        setCandidates(res.data)
      });
  };

  return (
    <div>
      <div class="conatiner mt-5">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-3">
            <input
              class="form-control"
              name="file"
              type="file"
              id="input"
              accept=".csv"
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

export default CsvToJson
