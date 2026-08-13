export type TColumns = {
  prop?: string;
  label?: string;
  width?: number;
  buttonRender?: TbuttonRender[];
  [key: string]: any;
};

export type TbuttonRender = {
  label: string;
  key?: string;
  isShow?: boolean;
  onClick?: (value: any) => void;
};

export type TTableOptions = {
  cols: TColumns[];
  operateButtonMax?: number;
  isShowTab?: boolean;
  tableUrl?: string;
  tableSearchKey?: string;
};
