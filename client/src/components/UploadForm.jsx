import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({ host: '', port: '', user: '', jwtToken: '', database: '', table: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', file);
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
  
    try {
      const res = await axios.post(
        'http://localhost:5000/api/flatfile-to-clickhouse',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert(`Uploaded ${res.data.records} records successfully`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Upload failed: ' + (err.response?.data?.error || err.message));
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input name="host" placeholder="Host" onChange={handleChange} required />
      <input name="port" placeholder="Port" onChange={handleChange} required />
      <input name="user" placeholder="User" onChange={handleChange} required />
      <input name="jwtToken" placeholder="JWT Token" onChange={handleChange} required />
      <input name="database" placeholder="Database" onChange={handleChange} required />
      <input name="table" placeholder="Table" onChange={handleChange} required />
      <input type="file" onChange={handleFile} required />
      <button type="submit">Upload CSV to ClickHouse</button>
    </form>
  );
}

export default UploadForm;
