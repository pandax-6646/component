export type TFormType =
  | "INPUT"
  | "SELECT"
  | "DATE"
  | "TIME"
  | "DATETIME"
  | "CHECKBOX"
  | "RADIO";

type TPublicFormConfig = {
  label: string;
  type: TFormType;
  modelKey: string;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
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
  change?: (value: any) => void;
};

export type TText = {
  rows?: number;
  showPassword?: boolean;
  readonly?: boolean;
  maxlength?: number;
  inputType?: "textarea" | "text" | "password";
  showWordLimit?: boolean;
  wordLimitPosition?: "inside" | "outside";
};

export type TSelect = {
  options?: Array<{ label: string; value: string; disabled?: boolean }>;
};

export interface IFormConfig extends TText, TPublicFormConfig, TSelect {}
