import React, {useState} from 'react';
import axios from 'axios';
import { bulkCandidates } from '../../redux/candidatesReducer/Action'
import { connect } from 'react-redux';

function CsvToJson({ bulkCandidates }) {

  const [csvTransformedToJson, setCsvTransformedToJson] = useState()
  const [candidates, setCandidates] = useState()

  const handleCsvToJson = (e) => {
    e.preventDefault();
    let csvToJson = e.target.files[0];
    let formData = new FormData();
    formData.append("file", csvToJson);
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND_URL}/api/candidates/csv`,  
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' }}
    })
      .then((res) => {
        setCsvTransformedToJson(res.data)
        console.log(res.data)
      });
  };

  const handleBulkCandidates = () => {  
    bulkCandidates(csvTransformedToJson)
  };

  return (
    <div>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-3">
            <input
              class="form-control"
              name="file"
              type="file"
              id="input"
              accept=".csv"
              onChange={handleCsvToJson}
            ></input>
          </div>
          <div class="col-md-2">
            <button class="btn btn-primary" id="button" onClick={handleBulkCandidates}>
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

const mapDispatchToProps = () => (dispatch) => {
  return {
    bulkCandidates: (jsonCandidates) => dispatch(bulkCandidates(jsonCandidates))
  }
}

export default connect( null, mapDispatchToProps )(CsvToJson)
