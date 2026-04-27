export type TFormType =
  | "INPUT"
  | "SELECT"
  | "DATE"
  | "TIME"
  | "DATETIME"
  | "CHECKBOX"
  | "RADIO"
  | "NUMBER"
  | "SWITCH"
  | "UPLOAD";

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

export type TNumber = {
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  controls?: boolean;
  controlsPosition?: "right" | "default";
};

export type TDateTime = {
  dateType?: "date" | "datetime" | "week" | "month" | "year";
  format?: string;
  valueFormat?: string;
  disabledDate?: (date: Date) => boolean;
};

export type TSwitch = {
  activeText?: string;
  inactiveText?: string;
  activeValue?: boolean | number | string;
  inactiveValue?: boolean | number | string;
  activeColor?: string;
  inactiveColor?: string;
};

export type TUpload = {
  action?: string;
  headers?: Record<string, string>;
  data?: Record<string, any>;
  name?: string;
  withCredentials?: boolean;
  showUploadList?: boolean;
  drag?: boolean;
  accept?: string;
  multiple?: boolean;
  limit?: number;
  autoUpload?: boolean;
  tip?: string;
};

export interface IFormConfig extends TText, TPublicFormConfig, TSelect, TNumber, TDateTime, TSwitch, TUpload {}
