import type { TFormType } from "../types";

const FORM_TYPE_MAP = new Map<string, TFormType>([
  ["INPUT", "INPUT"],
  ["SELECT", "SELECT"],
]);

export { FORM_TYPE_MAP };
