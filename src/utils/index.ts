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
