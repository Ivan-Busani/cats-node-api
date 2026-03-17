import * as repo from '../repository/catRepository';
import type { Cat, SaveCatInput } from '../types/cat';
import type { AppError } from '../types/errors';

const DUPLICATE_ERROR_CODE = '23505';

function throwAppError(status: number, detail: string): never {
  const error: AppError = { status, detail };
  throw error;
}

export async function listCats(): Promise<Cat[]> {
  return repo.findAll();
}

export async function getCatById(id: number): Promise<Cat> {
  const cat = await repo.findById(id);
  if (!cat) throwAppError(404, 'Gato no encontrado');
  return cat;
}

export async function getCatByCatId(catId: string): Promise<Cat> {
  const cat = await repo.findByCatId(catId);
  if (!cat) throwAppError(404, 'Gato no encontrado');
  return cat;
}

export async function saveCat(data: SaveCatInput): Promise<Cat> {
  try {
    return await repo.save(data);
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && err.code === DUPLICATE_ERROR_CODE) {
      throwAppError(409, 'Ya existe un gato con este ID en la base de datos');
    }
    throw err;
  }
}

export async function updateCat(id: number, data: SaveCatInput): Promise<Cat | null> {
  const cat = await repo.update(id, data);
  if (!cat) throwAppError(404, 'Gato no encontrado');
  return cat;
}

export async function deleteCat(id: number): Promise<void> {
  const cat = await repo.remove(id);
  if (!cat) throwAppError(404, 'Gato no encontrado');
}
