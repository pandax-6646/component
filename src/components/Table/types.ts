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

export type TTableOptions = {
  cols: TColumns[];
  operateButtonMax?: number;
  isShowTab?: boolean;
  tableUrl?: string;
  tableSearchKey?: string;
  tabColKey?: string;
  tabCols: TTabCols[];
  searchButtonCols: TSearchButtonCols[];
};
