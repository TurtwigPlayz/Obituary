import React from 'react';
import Obituaries from './Obituaries';

function App({ obituaries }) {
  return (
    <div className="container-fluid">
      <div className="row">
        {obituaries.map((obituary, index) => (
          <div key={index} className="col-md-3">
            <Obituaries data={obituary} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
