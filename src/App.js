import React from 'react';
import Obituaries from './Obituaries';

function App({obituaries}) {
  return (
    <div className="container mt-4">
      <div className="row row-cols-4 g-4">
        {obituaries.map((obituary, index) => (
          <div className="col" key={index}>
            <Obituaries data={obituary} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
