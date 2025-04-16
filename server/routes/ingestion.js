const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const controller = require('../controllers/ingestionController');

router.post('/clickhouse-to-flatfile', controller.clickhouseToFlatFile);
router.post(
    '/flatfile-to-clickhouse',
    upload.single('file'),
    controller.flatFileToClickhouse
  );
router.post('/columns', controller.getColumns);
router.post('/preview', controller.previewData);

module.exports = router;