const { createClickHouseClient } = require('../services/clickHouseService');
const { writeToCSV, parseCSV } = require('../services/flatFileService');

exports.clickhouseToFlatFile = async (req, res) => {
  try {
    const { host, port, database, user, jwtToken, query, fileName } = req.body;
    const ch = createClickHouseClient({ url: host, port, user, jwtToken });
    const resultSet = await ch.query(query).toPromise();
    await writeToCSV(resultSet.data, fileName);
    res.json({ success: true, records: resultSet.data.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.flatFileToClickhouse = async (req, res) => {
    try {
      const filePath = req.file.path; // multer handles this
      const { host, port, database, user, jwtToken, table } = req.body;
  
      const ch = createClickHouseClient({ url: host, port, user, jwtToken });
      const records = await parseCSV(filePath);
  
      for (const record of records) {
        const keys = Object.keys(record).join(',');
        const values = Object.values(record).map(v => `'${v}'`).join(',');
        await ch.query(`INSERT INTO ${table} (${keys}) VALUES (${values})`).toPromise();
      }
  
      res.json({ success: true, records: records.length });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

exports.getColumns = async (req, res) => {
  try {
    const { host, port, database, user, jwtToken, table } = req.body;
    const ch = createClickHouseClient({ url: host, port, user, jwtToken });
    const resultSet = await ch.query(`DESCRIBE TABLE ${table}`).toPromise();
    const columns = resultSet.data.map(row => row.name);
    res.json({ columns });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.previewData = async (req, res) => {
  try {
    const { host, port, database, user, jwtToken, table, limit = 100 } = req.body;
    const ch = createClickHouseClient({ url: host, port, user, jwtToken });
    const resultSet = await ch.query(`SELECT * FROM ${table} LIMIT ${limit}`).toPromise();
    res.json({ data: resultSet.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};