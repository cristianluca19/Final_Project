import React from 'react';

function csvToJson() {
  return (
    <div>
      <h1>holiii</h1>
      <div>
        <input
          class="form-control"
          type="file"
          id="input"
          accept=".xls,.xlsx"
        ></input>
      </div>
      <div>
        <button class="btn btn-primary" id="button">
          Convert
        </button>
      </div>
      <div class="col-md-12">
        <pre id="jsondata"></pre>
      </div>
    </div>
  );
}

export default csvToJson
