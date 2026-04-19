import type { TFormType } from "../types";

const FORM_TYPE_MAP = new Map<string, TFormType>([
  ["INPUT", "INPUT"],
  ["SELECT", "SELECT"],
]);

const getFormType = (type = "INPUT"): TFormType => {
  const formType = FORM_TYPE_MAP.get(type.toUpperCase());

  if (!formType) {
    throw new Error(`未知的表单类型: ${type}`);
  }

  return formType;
};

export { FORM_TYPE_MAP, getFormType };
