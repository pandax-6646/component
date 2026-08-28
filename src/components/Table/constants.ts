const QUERY_METHOD = {
  /** 等于 */
  EQUAL: "=",

  /** 大于 */
  GREATER: ">",

  /** 大于等于 */
  GREATER_OR_EQUAL: ">=",

  /** 小于 */
  LESS: "<",

  /** 小于等于 */
  LESS_OR_EQUAL: "<=",

  /** 模糊查询 */
  LIKE: "LIKE",

  /** FIND_IN_SET查询 --- 搜索一个字符串在另一个逗号分隔的字符串列表中的位置 */
  FIND_IN_SET: "FIND_IN_SET",

  /** IN 查询 --- 查询匹配多个字段 */
  IN: "IN",

  /** 区间查询 --- 选取介于两个值之间的数据范围内的值 */
  BETWEEN: "BETWEEN",

  /** 区间查询 --- 选取介于两个值之间的数据范围内的值 【注】推荐使用BETWEEN */
  RANGE: "RANGE",

  /** NULL查询 --- 查询字段是否是NULL */
  NULL: "NULL",

  /** NOT NULL查询 --- 查询字段是否是NOT NULL */
  NOT_NULL: "NOT NULL",
};


export { QUERY_METHOD };
