import { getLocalStorage, setLocalStorage } from "@/utils";

/** 本地保存的表格查询快照（后续可扩展 keyword、moreFilters 等） */
export type TTableSearchStorage = {
  advancedFilters: Record<string, unknown>;
  queryParams?: Record<string, string | number>;
  updatedAt?: number;
};

export function loadTableSearch(
  tableSearchKey?: string,
): TTableSearchStorage | null {
  if (!tableSearchKey) return null;
  const raw = getLocalStorage(tableSearchKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as TTableSearchStorage;
  } catch {
    return null;
  }
}

export function saveTableSearch(
  tableSearchKey: string | undefined,
  payload: Omit<TTableSearchStorage, "updatedAt">,
) {
  if (!tableSearchKey) return;
  setLocalStorage(tableSearchKey, {
    ...payload,
    updatedAt: Date.now(),
  });
}

export function clearTableSearch(tableSearchKey?: string) {
  if (!tableSearchKey) return;
  localStorage.removeItem(tableSearchKey);
}
