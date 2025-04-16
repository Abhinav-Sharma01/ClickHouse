import React from 'react';
import UploadForm from './components/UploadForm';

function App() {
  return (
    <div className=" bg-gray-100 flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        ClickHouse ↔ Flat File Ingestion
      </h2>
      <UploadForm />
    </div>
  );
}

export default App;
