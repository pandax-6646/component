## 组件字段说明

|     字段名称     | 类型    | 是否必需 |                                          说明                                          |
| :---------------: | ------- | :------: | :-------------------------------------------------------------------------------------: |
|     tableUrl     | String  |    是    |                table列表的请求参数，后面 `location.search` 看需求添加                |
|     isShowTab     | Boolean |    否    |                         用于控制是否显示table列表头部的切换列表                         |
|    tableParmas    | Object  |    否    |          table列表所有查询默认的参数，如果存在和原查询参数字段一致的则会被覆盖          |
|  oneSearchParams  | Object  |    否    |             table列表高级查询参数，如果存在和原查询参数字段一致的则会被覆盖             |
|   isHidenSearch   | Boolean |    否    |                        用于控制是否显示table列表头部高级查询部分                        |
|  defaultToolbar  | Array   |    否    |                      如需隐藏列筛选按钮传 `[]` ，否则不传该字段                      |
|       cols       | Array   |    是    |       layui列数据配置[文档](https://layui.dev/docs/2/table/#options.cols)，其他配置       |
|     spanCols     | [Array] |    否    |                  多级表头数据配置，值为二维数组，配置于 `cols` 类似                  |
| operateButtonMax | Number  |    否    |                           默认值为 3，操作列最大容纳按钮数量                           |
|   tableTreeKey   | String  |    否    |                       用于设置树形table列表用于展开子项的位置字段                       |
|  tableSearchKey  | String  |    是    | 高级查询参数保存在 `localStorage` 的位置，暂取页面路径地址 `ROUTER_PATH.INDEX` 变量 |
|     tabColKey     | String  |    否    |                                   tab栏切换的查询字段                                   |
|      tabUrl      | String  |    否    |             列表切换tab上的统计数据的接口，已设置默认取，需要修改则传入参数             |
|      tabCols      |         |          |                                                                                        |
|   tabFilterCols   |         |          |                                                                                        |
| searchButtonCols |         |          |                                                                                        |
| pagebarButtonCols | Array   |    否    |                               table列表分页旁边的按钮配置                               |
|     tabRender     |         |          |                                                                                        |
|    portConfig    | Object  |    否    |                                    列表导入导出配置                                    |

### cols 配置

|      字段名称      | 类型     | 是否必需 |                                                                             说明                                                                             |
| :----------------: | -------- | :------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------: |
|       field       | String   |    否    | 列表中显示为必须，只在高级查询弹窗中可不传该字段；如果是操作列表，则需要传入 `createTable/utils`的常量值 `OPERATE_FIELD`；该字段可用于回显数据或排序查询 |
|    exportField    | String   |    否    |                                                                      专门用于导出的字段                                                                      |
|     onlyScreen     | Boolean  |    否    |                                                                是否只做高级查询，不做列表展示                                                                |
|    buttonRender    | Function |    否    |                                            操作列的按钮配置，函数返回对象数组，每个对象为一个按钮，具体看下面文档                                            |
| userDialogIdsField | String   |    否    |                                              用户详情弹窗事件配置，该字段用于传入用户id的字段名，具体看下面文档                                              |
|     screenInfo     | Object   |    否    |                                                               高级查询弹窗配置，具体看下面文档                                                               |

#### spanCols 配置

1. `colspan` 的总数必须和 `cols` 的长度值相同
2. 设置了多级表头后，筛选列功能将被禁用
3. 最好设置 `height` 参数，防止列表在 10 条数据每页的时候出现滚动条

| 字段名称 |  类型  | 是否必须 |      说明      |
| :------: | :----: | :------: | :------------: |
|  title  | String |    是    | 表头展示的文本 |
| rowspan | Number |    否    |   占据的行数   |
| colspan | Number |    否    |   占据的列数   |

##### 案例

![1760593279089](image/README/1760593279089.png)

```javascript
height: 800,
spanCols: [
    [
        { checkbox: true, fixed: 'left', rowspan: 3 },
        { title: 'ID', field: 'id', rowspan: 3 },
        { title: '一级（1）', colspan: 6 },
        { title: '一级（2）', colspan: 2 },
        { title: '一级（3）', colspan: 2 },
        {
            field: utils.OPERATE_FIELD,
            title: '',
            fixed: 'right',
            rowspan: 3,
            width: 200,
            buttonRender: function (record) {
                return [
                    {
                        isShow: HANDLE,
                        layEvent: 'handle',
                        name: '办理',
                        onClick: function (_this, info) {
                            const data = info?.data || {};
                            const url = `${ROUTER_PATH.HANDLE}?ids=${data?.id || ''}&bill=${
                                data?.bill || ''
                            }`;
                            routerTo(url);
                        }
                    },
                    {
                        isShow: SUBMIT,
                        layEvent: 'submit',
                        name: '提交',
                        onClick: function (_this, info) {
                            const { id, bill } = info?.data || {};
                            submitHandle(id, bill);
                        }
                    },
                    {
                        isShow: DETAIL,
                        layEvent: 'detail',
                        name: '查看',
                        onClick: function (_this, info) {
                            const data = info?.data || {};
                            const url = `${ROUTER_PATH.DETAIL}?ids=${data?.id || ''}&bill=${
                                data?.bill || ''
                            }`;
                            routerTo(url);
                        }
                    }
                ];
            }
        }
    ],
    [
        { title: '二级（1）', colspan: 3 },
        { title: '二级（2）', colspan: 3 },
        { title: '二级（3）', colspan: 1 },
        { title: '二级（4）', colspan: 1 },
        { title: '二级（5）', colspan: 1 },
        { title: '二级（6）', colspan: 1 }
    ]
],
cols: [
    {
        field: 'orderid',
        title: __('订单编号'),
        minWidth: 180,
        sort: true,
        screenInfo: {
            type: utils.SCREEN_TYPE.INPUT,
            name: 'orderid',
            searchType: Fast.global.EQueryMethod.LIKE,
            placeholder: '请输入' + __('订单号')
        }
    },
    {
        field: 'user_id',
        title: __('用户'),
        minWidth: 150,
        userDialogIdsField: 'user_id',
        screenInfo: {
            type: utils.SCREEN_TYPE.XSELECT,
            name: 'user_id',
            customId: 'ID-user_id',
            searchType: Fast.global.EQueryMethod.IN,
            option: {
                remoteUrl: 'ajax/get_user_tree',
                radio: false,
                placeholder: '请选择' + __('用户'),
                strictTree: false,
                clickClose: false
            }
        }
    },

    {
        field: 'mc_name',
        title: __('仪器名称'),
        minWidth: 180,
        render: function (d) {
            return d.mc_id_text;
        },
        screenInfo: {
            type: utils.SCREEN_TYPE.INPUT,
            searchType: Fast.global.EQueryMethod.LIKE,
            name: 'mc_name',
            placeholder: '请输入' + __('仪器名称')
        }
    },
    {
        field: 'asset_number',
        title: __('资产编号'),
        screenInfo: {
            type: utils.SCREEN_TYPE.INPUT,
            searchType: Fast.global.EQueryMethod.LIKE,
            name: 'asset_number',
            placeholder: '请输入' + __('资产编号')
        }
    },

    {
        field: 'order_status',
        title: __('订单状态'),
        render: function ({ order_status_text }) {
            return order_status_text;
        }
    },
    {
        field: 'notes',
        title: __('订单备注')
    },

    {
        field: 'step_name',
        title: __('当前步骤'),
        render: function (d) {
            let text = '';
            switch (d.status) {
                case 0:
                    text = d.status_text;
                    break;
                case 1:
                    text = d?.runthread_info?.[0]?.name;
                    break;
                default:
                    text = d?.thread_log?.step_name;
                    break;
            }
            return Fast.util.textRender(text);
        },
        minWidth: 150
    },
    {
        field: 'worker',
        title: __('当前办理人'),
        hide: true,
        minWidth: 210,
        render: function (d) {
            let text = '';
            switch (d.status) {
                case 0:
                    text = d.createby_text;
                    break;
                case 1:
                    text = d?.runthread_info?.[0]?.check_worker_str;
                    break;
                default:
                    text = d?.thread_log?.worker_name;
                    break;
            }
            return Fast.util.textRender(text);
        }
    },

    {
        field: 'createby_text',
        title: __('创建人'),
        minWidth: 100,
        userDialogIdsField: 'createby',
        screenInfo: {
            type: utils.SCREEN_TYPE.XSELECT,
            name: 'createby',
            customId: 'ID-createby',
            searchType: Fast.global.EQueryMethod.IN,
            option: {
                remoteUrl: 'ajax/get_user_tree',
                radio: false,
                placeholder: '请选择' + __('创建人'),
                strictTree: false,
                clickClose: false
            }
        }
    },
    {
        field: 'createtime',
        title: __('Createtime'),
        sort: true,
        render: function (d) {
            return Fast.util.getDateTime(d.createtime * 1000);
        },
        minWidth: 180,
        screenInfo: {
            type: utils.SCREEN_TYPE.DATE_TIME,
            searchType: Fast.global.EQueryMethod.RANGE,
            name: 'createtime',
            placeholder: '请选择日期时间',
            init: function (_this) {
                laydate.render({
                    elem: '#createtime',
                    isPreview: false,
                    range: '-',
                    type: 'datetime',
                    rangeLinked: true,
                    format: 'yyyy-MM-dd HH:mm'
                });
            }
        }
    }
],
```


#### buttonRender 配置

| 字段名称  |   类型   | 是否必需 |                                                                                                                 说明                                                                                                                 |
| --------- | :------: | :------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| isShow    | Boolean |    是    |                                                                                                            是否展示该按钮                                                                                                            |
| name      |  String  |    是    |                                                                                                             按钮文本内容                                                                                                             |
| layEvent  |  String  |    是    |                                                                       该按钮的事件名称，事件名称已和 `can_事件名`的数据绑定，该值为1时事件展示按钮，否则隐藏                                                                       |
| onClick   | Function |    是    |                                               按钮的点击事件回调函数，函数接收参数为（Table实例对象,当前行数据,当存在下拉按钮配置时为选中的下拉数据,否则为undefined,当前点击的dom元素）                                               |
| option    |  Array  |    否    | 对象数组，下拉按钮配置，对象数据格式强烈建议为 `{label: '通过', value: '1'}` ，当设为 `{ name: '通过', key: '1' }` 也可展示下拉列表，选中事件返回的数据为 `{"title":"通过","id":"1","label":"通过","value":"1"}` 已进行兼容处理 |
| mergerBtn | Boolean |    否    |                                  ![1744425230590](image/README/1744425230590.png)<br />特殊的更多按钮，需要同时在同级option中配置isShow，值为该按钮的权限，样式如图，暂时专用于仪器列表和预约规则列表                                  |

#### screenInfo 配置

|  字段名称  |      类型      |  是否必需  |                                                                          说明                                                                          |
| :---------: | :------------: | :--------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------: |
|    name    |     String     |     是     |                                                                      查询字段名称                                                                      |
|  nameType  |     String     |     否     | 范围查询参数，范围最小值必须为 `utils.SEARCH_NAME_TYPE.START` 最大值必须为 `utils.SEARCH_NAME_TYPE.END` ，该参数会覆盖 `searchType` 查询类型参数 |
|    type    |     String     |     否     |                                                    高级查询渲染的文本框类型，且仅允许传入固定的参数                                                    |
| searchType |     String     |     否     |                                            查询类型的参数，且仅允许传入固定的参数，不传默认为 `全等` 查询                                            |
| placeholder |     String     |     否     |                                                                       文本提示框                                                                       |
|   option   | Object \ Array | 下拉框必传 |                                      普通下拉框为 `label`、`value` 对象的数组，xSelect下拉框参数具体看下面文档                                      |

#### xSelect 高级查询里的远程查询下拉框配置

说明：

1. type 类型必须为 utils.SCREEN_TYPE.XSELECT，否则不会渲染。
2. 该集成控件使用的是 [createSelect组件](../createSelect/README.md)，不同点为 `initValue`、`name`、`el` 等属性不需要在option中传入，就算传入也不生效；其余参数同 createSelect 组件的传参。

示例：

```javascript
screenInfo: {
    type: utils.SCREEN_TYPE.XSELECT,
    name: 'createby',
    customId: 'ID-user-ids',
    option: {
        remoteUrl: 'ajax/get_user_tree',
        placeholder: '请选择单位',
        strictTree: false,
        radio: true,
        clickClose: true
    }
}
```

#### userDialogIdsField 配置说明

##### 模式一：逗号隔开的多用户名

说明：

1. 如果仅展示用户名称，无点击事件去掉 `userDialogIdsField` 即可
2. 如果需要展示多个用户名称且可点击，则需要保证 `reviewby_text` 和 `review_uid` 里面的 `用户名称`和 `用户id` 相匹配（按下面示例为例）
3. `reviewby_text` 和 `review_uid` 里面的值需要是 `string` 类型

示例：

```javascript
col: [
    {
        field: 'reviewby_text',
        title: __('审核人'),
        userDialogIdsField: 'review_uid',
        sort: true,
        screenInfo: {
            type: utils.SCREEN_TYPE.XSELECT,
            name: 'review_id',
            customId: 'ID-review',
            option: {
                remoteUrl: 'ajax/get_user_tree',
                placeholder: '请选择' + __('审核人'),
                strictTree: false,
                radio: true,
                clickClose: true
            }
        }
    }
];
```

##### 模式二：深对象层级字段

示例：

```javascript
{
    field: 'user.truename',
    title: __('评价人'),
    userDialogIdsField: 'user.id',
    screenInfo: {
        type: utils.SCREEN_TYPE.XSELECT,
        name: 'user_id',
        customId: 'ID-user_id',
        option: {
            remoteUrl: 'ajax/get_user_tree',
            placeholder: '请选择' + __('创建人'),
            strictTree: false,
            radio: true,
            clickClose: true
        }
    }
},
```

### tabCols 配置

|  字段名称  |  类型  | 是否必填 |                  说明                  |
| :--------: | :-----: | :------: | :------------------------------------: |
|   isShow   | Boolean |    是    |             是否展示该按钮             |
|    name    | String |    是    |              按钮文本内容              |
|     id     | String |    是    |     该按钮的被点击时请求的字段名称     |
|    tree    |  Array  |    否    |            展示树形查询列表            |
| initActive | Boolean |    否    | 默认选中当前选项并执行该选项的查询条件 |

#### tree 配置

|  字段名称  |  类型  | 是否必填 |                                           说明                                           |
| :--------: | :----: | :------: | :--------------------------------------------------------------------------------------: |
|   label   | String |    是    |                                       二级tab名称                                       |
|   value   | String |    是    |                    二级tab的维一值和选中该列表某条数据的查询字段名称                    |
| customName | Object |    是    | tree型数据自定义名称配置，参考[自定义字段名称](https://layui.dev/docs/2/tree/#options.data) |
|  treeList  | Array |    是    |                                        tree型数据                                        |

### tabFilterCols 配置

### searchButtonCols 配置

### pagebarButtonCols 配置

|    字段名称    |   类型   | 是否必需 |                                                       说明                                                       |
| :-------------: | :------: | :------: | :--------------------------------------------------------------------------------------------------------------: |
|     isShow     | Boolean |    是    |                                                  是否展示该按钮                                                  |
|      name      |  String  |    是    |                                                   按钮文本内容                                                   |
|       key       |  String  |    是    | 该按钮的事件名称，事件名称已和 `can_事件名`的数据绑定，所有选中的行的该值为都1时事件触发，否则提示用户没有权限 |
|     onClick     | Function |    是    |                                              按钮的点击事件回调函数                                              |
|     option     |  Array  |    否    |                                      table 列表分页旁边可下拉列表的按钮配置                                      |
|    mergerBtn    | Boolean |    否    |                                       是否将下拉图标和文本合并到一个按钮中                                       |
| onMultipleClick | Function |    否    |                                  配置了下拉列表按钮的下拉列表的点击事件回调函数                                  |

#### option 配置

| 字段名称 |  类型  | 是否必需 | 说明                                                                                                   |
| :------: | :-----: | :------: | ------------------------------------------------------------------------------------------------------ |
|  label  | String |    是    | 与 `label` 组成 `label-value` 对象                                                                 |
|  value  | String |    是    | 与 `key` 组成 `key-value` 的对象                                                                   |
|   name   | String |    否    | 与 `key` 组成 `key-name` 对象，虽然也可展示下拉列表，但与点击事件返回的数据不一致，所以不建议使用  |
|   key   | String |    否    | 与 `name` 组成 `key-name` 对象，虽然也可展示下拉列表，但与点击事件返回的数据不一致，所以不建议使用 |
|  isShow  | Boolean |    否    | 值为 `false` 即不展示该下拉选项                                                                      |

### portConfig 配置

|   字段名称   |   类型   | 是否必需 | 说明                                                  |
| :-----------: | :------: | :------: | ----------------------------------------------------- |
|      id      |  String  |    是    | 渲染导入弹窗的id名称                                  |
|   importUrl   |  String  |    是    | 导入文件的提交接口地址，需要手动拼接根路径'/ysadmin/' |
|  importAfter  | Function |    否    | 导入完成的后调函数                                    |
|   exportUrl   |  String  |    否    | 导出地址，需要手动拼接根路径'/ysadmin/'               |
| exportFieldId | Function |    否    | 导出完成的后调函数                                    |
| exportFieldId |  String  |    否    | 自定义导出的选中数据id的key值                         |
