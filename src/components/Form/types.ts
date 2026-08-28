import { SCREEN_TYPE, INPUT_TYPE, WORD_LIMIT_POSITION, CONTROLS_POSITION, DATE_TYPE } from "./constants";

export type TScreenType = (typeof SCREEN_TYPE)[keyof typeof SCREEN_TYPE];
export type TInputType = (typeof INPUT_TYPE)[keyof typeof INPUT_TYPE];
export type TWordLimitPosition = (typeof WORD_LIMIT_POSITION)[keyof typeof WORD_LIMIT_POSITION];
export type TControlsPosition = (typeof CONTROLS_POSITION)[keyof typeof CONTROLS_POSITION];
export type TDateType = (typeof DATE_TYPE)[keyof typeof DATE_TYPE];


type TPublicFormConfigs = {
  isShow?: boolean | Function;
  label: string;
  type: TScreenType;
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
  inputType?: TInputType;
  showWordLimit?: boolean;
  wordLimitPosition?: TWordLimitPosition;
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
  controlsPosition?: TControlsPosition;
};

export type TDateTime = {
  dateType?: TDateType;
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

export interface IFormConfigs
  extends
  TText,
  TPublicFormConfigs,
  TSelect,
  TNumber,
  TDateTime,
  TSwitch,
  TUpload { }
