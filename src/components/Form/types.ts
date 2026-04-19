export type TFormType =
  | "INPUT"
  | "SELECT"
  | "DATE"
  | "TIME"
  | "DATETIME"
  | "CHECKBOX"
  | "RADIO";

export interface IFormConfig {
  label: string;
  type: TFormType;
  modelKey: string;
  options?: Array<{ label: string; value: string }>;
  rules?: Array<{
    required?: boolean;
    message?: string;
    trigger: string;
    validator?: (
      rule: any,
      value: any,
      callback: (error?: Error) => void,
    ) => void;
  }>;
}
