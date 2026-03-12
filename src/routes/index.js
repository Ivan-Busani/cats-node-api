const { Router } = require('express');
const catHandler = require('../handler/catHandler');
const healthHandler = require('../handler/healthHandler');

const router = Router();

router.get('/health', healthHandler.health);

router.get('/api/v1/cats/list', catHandler.listCats);
router.get('/api/v1/cats/cat_id/:cat_id', catHandler.getCatByCatId);
router.get('/api/v1/cats/:id', catHandler.getCatById);
router.post('/api/v1/cats/save', catHandler.saveCat);
router.put('/api/v1/cats/update/:id', catHandler.updateCat);
router.delete('/api/v1/cats/delete/:id', catHandler.deleteCat);

module.exports = router;
