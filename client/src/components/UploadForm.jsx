import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    host: '', port: '', user: '', jwtToken: '', database: '', table: '',
  });

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
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      alert(`Uploaded ${res.data.records} records successfully`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Upload failed: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Upload CSV to ClickHouse</h2>

        {['host', 'port', 'user', 'jwtToken', 'database', 'table'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}

        <input
          type="file"
          onChange={handleFile}
          required
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadForm;
