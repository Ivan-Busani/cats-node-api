export interface Cat {
  id: number;
  cat_id: string;
  url: string;
  width: number;
  height: number;
  breeds: unknown;
  api_used?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface SaveCatInput {
  cat_id: string;
  url: string;
  width: number;
  height: number;
  breeds: unknown;
}