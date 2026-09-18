import type { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";

const { mock, Random } = Mock;

// 总条数：保证分页数据稳定（每次请求同一页返回相同记录）
const TOTAL = 100;

// 一次性生成固定数据池，分页时按 page/pageSize 切片返回
const mockPool = mock({
  [`list|${TOTAL}`]: [
    {
      "id|+1": 1,
      name: () => (Math.random() > 0.6 ? "@cname" : ""),
      state: () => Random.province(),
      city: () => Random.city(),
      address: () => Random.county(true),
      zip: () => Random.zip(),
      email: "@email",
      "age|18-60": 1,
      date: Random.date(),
      desc: Random.cparagraph(),
      can_view: () => (Math.random() >= 0.5 ? 1 : 0),
      can_edit: () => (Math.random() >= 0.5 ? 1 : 0),
    },
  ],
}).list as Record<string, any>[];

// 分页处理：解析参数 + 越界兜底 + 切片，返回分页结果及元信息
const paginate = <T>(list: T[], page: any, pageSize: any) => {
  const safePageSize = Math.max(1, Number(pageSize) || 10);
  const totalPages = Math.max(1, Math.ceil(list.length / safePageSize));
  const safePage = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const start = (safePage - 1) * safePageSize;
  const end = start + safePageSize;

  return {
    list: list.slice(start, end),
    total: list.length,
    page: safePage,
    pageSize: safePageSize,
    totalPages,
  };
};

const userMock: MockMethod[] = [
  {
    url: "/api/list",
    method: "get",
    // timeout: "2000",
    response: (req: Request) => {
      const { page, pageSize } = req.query;
      const result = paginate(mockPool, page, pageSize);

      return {
        code: 200,
        msg: "请求成功",
        data: result,
      };
    },
  },
];

export default userMock;
