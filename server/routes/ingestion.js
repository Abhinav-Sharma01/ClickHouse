const express = require('express');
const router = express.Router();
const controller = require('../controllers/ingestionController');

router.post('/clickhouse-to-flatfile', controller.clickhouseToFlatFile);
router.post('/flatfile-to-clickhouse', controller.flatFileToClickhouse);
router.post('/columns', controller.getColumns);
router.post('/preview', controller.previewData);

module.exports = router;