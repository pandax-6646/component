import isEmpty from "lodash-es/isEmpty";
import { EMPTY_VALUE } from "./constants";

export const emptyToDash = (value: unknown): string => {
  if (value === null || value === undefined) {
    return EMPTY_VALUE;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" || trimmed === "null" || trimmed === "undefined"
      ? EMPTY_VALUE
      : value;
  }

  if (["number", "boolean", "bigint", "symbol"].includes(typeof value)) {
    return String(value);
  }

  return isEmpty(value) ? EMPTY_VALUE : String(value);
};

/**
 * 按指定值数组的顺序对对象数组排序（类型安全版）
 * @template T - 对象类型
 * @template K - 对象中用于排序的键名（必须是 T 的合法 key）
 */
interface SortOptions {
  caseInsensitive?: boolean;
  trim?: boolean;
}
export const sortByStringOrder = <T, K extends keyof T>(
  list: readonly T[],
  key: K,
  orderArr: readonly T[K][], // 👈 核心约束：orderArr 元素类型必须等于 T[K]
  options?: SortOptions,
): T[] => {
  const { caseInsensitive = false, trim = true } = options ?? {};

  // 标准化函数：统一处理大小写和空格
  const normalize = (val: T[K]): string | null | undefined => {
    if (val == null) return val as null | undefined; // null/undefined 保持原样
    let str = String(val);
    if (trim) str = str.trim();
    if (caseInsensitive) str = str.toLowerCase();
    return str;
  };

  // 建映射时对 key 做标准化
  const orderMap = new Map<string | null | undefined, number>();
  orderArr.forEach((val, index) => {
    orderMap.set(normalize(val), index);
  });

  return [...list].sort((a, b) => {
    const normA = normalize(a[key]);
    const normB = normalize(b[key]);
    const indexA = orderMap.get(normA) ?? Infinity;
    const indexB = orderMap.get(normB) ?? Infinity;
    return indexA - indexB;
  });
};

// 获取localStorage中的数据
export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
}

// 设置localStorage中的数据
export const setLocalStorage = (key: string, value: string | object) => {
  localStorage.setItem(key, JSON.stringify(value));
}

