import { Request, Response } from 'express';
import * as service from '../service/catService';
import type { AppError } from '../types/errors';

function isAppError(err: unknown): err is AppError {
  return err !== null && typeof err === 'object' && 'status' in err && 'detail' in err;
}

export async function listCats(req: Request, res: Response): Promise<void> {
  try {
    const cats = await service.listCats();
    res.json(cats);
  } catch {
    res.status(500).json({ detail: 'Error al obtener la lista de gatos' });
  }
}

export async function getCatById(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ detail: 'invalid id' });
    return;
  }

  try {
    const cat = await service.getCatById(id);
    res.json(cat);
  } catch (err) {
    if (isAppError(err)) {
      res.status(err.status).json({ detail: err.detail });
      return;
    }
    res.status(500).json({ detail: 'Error al obtener el gato' });
  }
}

export async function getCatByCatId(req: Request, res: Response): Promise<void> {
  try {
    const cat = await service.getCatByCatId(req.params.cat_id);
    res.json(cat);
  } catch (err) {
    if (isAppError(err)) {
      res.status(err.status).json({ detail: err.detail });
      return;
    }
    res.status(500).json({ detail: 'Error al obtener el gato' });
  }
}

export async function saveCat(req: Request, res: Response): Promise<void> {
  const { cat_id, url, width, height, breeds } = req.body;
  if (!cat_id || !url || width == null || height == null || breeds == null) {
    res.status(400).json({ detail: 'invalid json' });
    return;
  }

  try {
    const cat = await service.saveCat({ cat_id, url, width, height, breeds });
    res.status(201).json(cat);
  } catch (err) {
    if (isAppError(err)) {
      res.status(err.status).json({ detail: err.detail });
      return;
    }
    res.status(500).json({ detail: 'Error al guardar el gato' });
  }
}

export async function updateCat(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ detail: 'invalid id' });
    return;
  }

  const { cat_id, url, width, height, breeds } = req.body;
  if (!cat_id || !url || width == null || height == null || breeds == null) {
    res.status(400).json({ detail: 'invalid json' });
    return;
  }

  try {
    const cat = await service.updateCat(id, { cat_id, url, width, height, breeds });
    res.json(cat);
  } catch (err) {
    if (isAppError(err)) {
      res.status(err.status).json({ detail: err.detail });
      return;
    }
    res.status(500).json({ detail: 'Error al actualizar el gato' });
  }
}

export async function deleteCat(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ detail: 'invalid id' });
    return;
  }

  try {
    await service.deleteCat(id);
    res.status(204).send();
  } catch (err) {
    if (isAppError(err)) {
      res.status(err.status).json({ detail: err.detail });
      return;
    }
    res.status(500).json({ detail: 'Error al eliminar el gato' });
  }
}
