import { QUERY_METHOD } from "./constants";
import type { TScreenType } from "@/components/Form/types";


/** 查询方法的值类型 */
export type TQueryMethod = (typeof QUERY_METHOD)[keyof typeof QUERY_METHOD];


export type TScreenInfo = {
  type: TScreenType;
  searchType: TQueryMethod;
  name: string;
  placeholder?: string;
}

export type TColumns = {
  prop?: string;
  label?: string;
  width?: number;
  buttonRender?: TbuttonRender[];
  screenInfo?: TScreenInfo;
  [key: string]: any;
};

export type TbuttonRender = {
  label: string;
  key?: string;
  isShow?: boolean;
  onClick?: (value: any) => void;
};

export type TTabCols = {
  id: string;
  name: string;
  isShow: boolean;
  initActive?: boolean;
};

export type TSearchButtonCols = {
  name: string;
  key: string;
  type?: "primary" | "success" | "info" | "warning" | "danger";
  isShow: boolean;
  onClick: (value: any) => void;
};

export type TPagebarButtonCols = {
  name: string;
  key: string;
  isShow: boolean;
  options?: TRadioGroup[];
  onClick?: (value: any) => void;
  onMultipleClick?: (value: any) => void;
}

export type TRadioGroup = {
  label: string;
  value: string | number;
};

export type TTabMoreFilter = {
  name: string;
  key: string;
  radioGroup: TRadioGroup[];
};

export type TTableOptions = {
  cols: TColumns[];
  operateButtonMax?: number;
  isShowTab?: boolean;
  tableUrl?: string;
  tableSearchKey?: string;
  /** 快捷关键字搜索提交时的查询字段名，默认 keyword */
  keywordSearchKey?: string;
  tabColKey?: string;
  tabCols: TTabCols[];
  searchButtonCols: TSearchButtonCols[];
  tabMoreFilter: TTabMoreFilter[];
  pagebarButtonCols: TPagebarButtonCols[];
};
