const repo = require('../repository/catRepository');

const DUPLICATE_ERROR_CODE = '23505';

async function listCats() {
  return repo.findAll();
}

async function getCatById(id) {
  const cat = await repo.findById(id);
  if (!cat) throw { status: 404, detail: 'Gato no encontrado' };
  return cat;
}

async function getCatByCatId(catId) {
  const cat = await repo.findByCatId(catId);
  if (!cat) throw { status: 404, detail: 'Gato no encontrado' };
  return cat;
}

async function saveCat(data) {
  try {
    return await repo.save(data);
  } catch (err) {
    if (err.code === DUPLICATE_ERROR_CODE) {
      throw { status: 409, detail: 'Ya existe un gato con este ID en la base de datos' };
    }
    throw err;
  }
}

async function updateCat(id, data) {
  const cat = await repo.update(id, data);
  if (!cat) throw { status: 404, detail: 'Gato no encontrado' };
  return cat;
}

async function deleteCat(id) {
  const cat = await repo.remove(id);
  if (!cat) throw { status: 404, detail: 'Gato no encontrado' };
}

module.exports = { listCats, getCatById, getCatByCatId, saveCat, updateCat, deleteCat };
