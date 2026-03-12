const service = require('../service/catService');

async function listCats(req, res) {
  try {
    const cats = await service.listCats();
    res.json(cats);
  } catch (err) {
    res.status(500).json({ detail: 'Error al obtener la lista de gatos' });
  }
}

async function getCatById(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ detail: 'invalid id' });

  try {
    const cat = await service.getCatById(id);
    res.json(cat);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ detail: err.detail });
    res.status(500).json({ detail: 'Error al obtener el gato' });
  }
}

async function getCatByCatId(req, res) {
  try {
    const cat = await service.getCatByCatId(req.params.cat_id);
    res.json(cat);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ detail: err.detail });
    res.status(500).json({ detail: 'Error al obtener el gato' });
  }
}

async function saveCat(req, res) {
  const { cat_id, url, width, height, breeds } = req.body;
  if (!cat_id || !url || width == null || height == null || breeds == null) {
    return res.status(400).json({ detail: 'invalid json' });
  }

  try {
    const cat = await service.saveCat({ cat_id, url, width, height, breeds });
    res.status(201).json(cat);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ detail: err.detail });
    res.status(500).json({ detail: 'Error al guardar el gato' });
  }
}

async function updateCat(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ detail: 'invalid id' });

  const { cat_id, url, width, height, breeds } = req.body;
  if (!cat_id || !url || width == null || height == null || breeds == null) {
    return res.status(400).json({ detail: 'invalid json' });
  }

  try {
    const cat = await service.updateCat(id, { cat_id, url, width, height, breeds });
    res.json(cat);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ detail: err.detail });
    res.status(500).json({ detail: 'Error al actualizar el gato' });
  }
}

async function deleteCat(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ detail: 'invalid id' });

  try {
    await service.deleteCat(id);
    res.status(204).send();
  } catch (err) {
    if (err.status) return res.status(err.status).json({ detail: err.detail });
    res.status(500).json({ detail: 'Error al eliminar el gato' });
  }
}

module.exports = { listCats, getCatById, getCatByCatId, saveCat, updateCat, deleteCat };
