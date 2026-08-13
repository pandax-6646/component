import type { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";

const { mock, Random, setup } = Mock;

const userMock: MockMethod[] = [
  {
    url: "/api/list",
    method: "get",
    timeout: "2000",
    response: () => {
      return {
        code: 200,
        msg: "请求成功",
        data: mock({
          "list|10": [
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
          total: 100,
        }),
      };
    },
  },
];

export default userMock;
