const DEFAULT_KEYWORD_FIELD = "keyword";

export type TTableFilterState = {
  tabValue: string;
  /** 已提交的关键字（一次性查询后写入） */
  keyword: string;
  moreFilters: Record<string, string | number>;
  advancedFilters: Record<string, unknown>;
};

export function collectTableQueryParams(options: {
  tabColKey?: string;
  keywordSearchKey?: string;
  page: number;
  pageSize: number;
  filters: TTableFilterState;
}): Record<string, string | number> {
  const { tabColKey, keywordSearchKey, page, pageSize, filters } = options;
  const params: Record<string, string | number> = { page, pageSize };

  if (tabColKey && filters.tabValue && filters.tabValue !== "all") {
    params[tabColKey] = filters.tabValue;
  }

  const keyword = filters.keyword.trim();
  if (keyword) {
    params[keywordSearchKey ?? DEFAULT_KEYWORD_FIELD] = keyword;
  }

  for (const [key, value] of Object.entries(filters.moreFilters)) {
    if (value !== undefined && value !== null && value !== "") {
      params[key] = value;
    }
  }

  for (const [key, value] of Object.entries(filters.advancedFilters)) {
    if (value !== undefined && value !== null && value !== "") {
      params[key] = value as string | number;
    }
  }

  return params;
}
