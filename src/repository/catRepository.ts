import prisma from '../config/database';
import { Cat, SaveCatInput } from '../types/cat';

function toCat(row: { 
  id: bigint, 
  cat_id: string, 
  url: string, 
  width: number, 
  height: number, 
  breeds: unknown, 
  api_used: string | null, 
  created_at: Date | null, 
  updated_at: Date | null 
}): Cat {
  return {
    id: Number(row.id),
    cat_id: row.cat_id,
    url: row.url,
    width: row.width,
    height: row.height,
    breeds: row.breeds ?? [],
    api_used: row.api_used ?? null,
    created_at: row.created_at?.toISOString() ?? null,
    updated_at: row.updated_at?.toISOString() ?? null,
  };
}

export async function findAll(): Promise<Cat[]> {
  const rows = await prisma.cat.findMany({
    orderBy: { id: 'desc' }
  });
  return rows.map(toCat);
}

export async function findById(id: number): Promise<Cat | null> {
  const row = await prisma.cat.findUnique({
    where: { id: BigInt(id) }
  })
  return row ? toCat(row) : null;
}

export async function findByCatId(catId: string): Promise<Cat | null> {
  const row = await prisma.cat.findUnique({
    where: { cat_id: catId }
  })
  return row ? toCat(row) : null;
}

export async function save(cat: SaveCatInput): Promise<Cat> {
  const { cat_id, url, width, height, breeds } = cat;
  const row = await prisma.cat.create({
    data: {
      cat_id,
      url,
      width,
      height,
      breeds: (breeds ?? []) as object,
      api_used: 'nodejs'
    }
  });
  return toCat(row);
}

export async function update(id: number, cat: SaveCatInput): Promise<Cat | null> {
  const { cat_id, url, width, height, breeds } = cat;
  try {
    const row = await prisma.cat.update({
      where: { id: BigInt(id) },
      data: {
        cat_id,
        url,
        width,
        height,
        breeds: (breeds ?? []) as object,
        api_used: 'nodejs'
      }
    });
    return toCat(row);
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === 'P2025') {
      return null;
    }
    throw err;
  }
}

export async function remove(id: number): Promise<Cat | null> {
  try {
    const row = await prisma.cat.delete({
      where: { id: BigInt(id) }
    });
    return { id: Number(row.id)} as Cat;
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === 'P2025') {
      return null;
    }
    throw err;
  }
}
