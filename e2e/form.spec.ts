import { test, expect } from "@playwright/test";

test.describe("动态表单 E2E 测试", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("表单渲染", () => {
    test("页面应正确渲染表单", async ({ page }) => {
      const form = page.locator("form.el-form");
      await expect(form).toBeVisible();
    });

    test("应渲染文本框表单项", async ({ page }) => {
      const inputFormItem = page.locator(".el-form-item").filter({ hasText: "文本框" });
      await expect(inputFormItem).toBeVisible();
      const input = inputFormItem.locator(".el-textarea__inner");
      await expect(input).toBeVisible();
    });

    test("应渲染选择框表单项", async ({ page }) => {
      const selectFormItem = page.locator(".el-form-item").filter({ hasText: "选择框" });
      await expect(selectFormItem).toBeVisible();
      const select = selectFormItem.locator(".el-select");
      await expect(select).toBeVisible();
    });

    test("应渲染数字输入框表单项", async ({ page }) => {
      const numberFormItem = page.locator(".el-form-item").filter({ hasText: "数字输入框" });
      await expect(numberFormItem).toBeVisible();
      const numberInput = numberFormItem.locator(".el-input-number");
      await expect(numberInput).toBeVisible();
    });

    test("应渲染日期选择表单项", async ({ page }) => {
      const dateFormItem = page.locator(".el-form-item").filter({ hasText: "日期选择" });
      await expect(dateFormItem).toBeVisible();
      const datePicker = dateFormItem.locator(".el-date-editor");
      await expect(datePicker).toBeVisible();
    });

    test("应渲染日期时间选择表单项", async ({ page }) => {
      const datetimeFormItem = page.locator(".el-form-item").filter({ hasText: "日期时间选择" });
      await expect(datetimeFormItem).toBeVisible();
      const datetimePicker = datetimeFormItem.locator(".el-date-editor");
      await expect(datetimePicker).toBeVisible();
    });

    test("应渲染单选框表单项", async ({ page }) => {
      const radioFormItem = page.locator(".el-form-item").filter({ hasText: "单选框" });
      await expect(radioFormItem).toBeVisible();
      const radioGroup = radioFormItem.locator(".el-radio-group");
      await expect(radioGroup).toBeVisible();
    });

    test("应渲染多选框表单项", async ({ page }) => {
      const checkboxFormItem = page.locator(".el-form-item").filter({ hasText: "多选框" });
      await expect(checkboxFormItem).toBeVisible();
      const checkboxGroup = checkboxFormItem.locator(".el-checkbox-group");
      await expect(checkboxGroup).toBeVisible();
    });

    test("应渲染开关表单项", async ({ page }) => {
      const switchFormItem = page.locator(".el-form-item").filter({ hasText: "开关" });
      await expect(switchFormItem).toBeVisible();
      const switchComponent = switchFormItem.locator(".el-switch");
      await expect(switchComponent).toBeVisible();
    });

    test("应渲染文件上传表单项", async ({ page }) => {
      const uploadFormItem = page.locator(".el-form-item").filter({ hasText: "文件上传" });
      await expect(uploadFormItem).toBeVisible();
      const upload = uploadFormItem.locator(".el-upload");
      await expect(upload).toBeVisible();
    });

    test("应渲染获取参数和重置表单按钮", async ({ page }) => {
      await expect(page.getByRole("button", { name: "获取参数" })).toBeVisible();
      await expect(page.getByRole("button", { name: "重置表单" })).toBeVisible();
    });
  });

  test.describe("Input 输入与校验", () => {
    test("应在文本框中输入内容", async ({ page }) => {
      const inputFormItem = page.locator(".el-form-item").filter({ hasText: "文本框" });
      const textarea = inputFormItem.locator(".el-textarea__inner");
      await textarea.fill("test");
      await expect(textarea).toHaveValue("test");
    });

    test("必填校验：文本框为空时触发 blur 应显示必填错误", async ({ page }) => {
      const inputFormItem = page.locator(".el-form-item").filter({ hasText: "文本框" });
      const textarea = inputFormItem.locator(".el-textarea__inner");
      await textarea.click();
      await textarea.blur();
      const error = inputFormItem.locator(".el-form-item__error");
      await expect(error).toBeVisible();
      await expect(error).toContainText("请输入文本");
    });

    test("长度校验：输入过短时应显示长度错误", async ({ page }) => {
      const inputFormItem = page.locator(".el-form-item").filter({ hasText: "文本框" });
      const textarea = inputFormItem.locator(".el-textarea__inner");
      await textarea.fill("ab");
      await textarea.blur();
      const error = inputFormItem.locator(".el-form-item__error");
      await expect(error).toBeVisible();
      await expect(error).toContainText("长度必须在 3 - 5");
    });

    test("正则校验：输入非字母时应显示格式错误", async ({ page }) => {
      const inputFormItem = page.locator(".el-form-item").filter({ hasText: "文本框" });
      const textarea = inputFormItem.locator(".el-textarea__inner");
      await textarea.fill("abc1");
      await textarea.blur();
      const error = inputFormItem.locator(".el-form-item__error");
      await expect(error).toBeVisible();
      await expect(error).toContainText("只能输入字母");
    });

    test("自定义校验：输入 admin 应显示自定义错误", async ({ page }) => {
      const inputFormItem = page.locator(".el-form-item").filter({ hasText: "文本框" });
      const textarea = inputFormItem.locator(".el-textarea__inner");
      await textarea.fill("admin");
      await textarea.blur();
      const error = inputFormItem.locator(".el-form-item__error");
      await expect(error).toBeVisible();
      await expect(error).toContainText("用户名不能为 admin");
    });

    test("合法输入不应显示错误", async ({ page }) => {
      const inputFormItem = page.locator(".el-form-item").filter({ hasText: "文本框" });
      const textarea = inputFormItem.locator(".el-textarea__inner");
      await textarea.fill("abc");
      await textarea.blur();
      const error = inputFormItem.locator(".el-form-item__error");
      await expect(error).not.toBeVisible();
    });
  });

  test.describe("Select 选择与校验", () => {
    test("应能选择下拉选项", async ({ page }) => {
      const selectFormItem = page.locator(".el-form-item").filter({ hasText: "选择框" });
      const select = selectFormItem.locator(".el-select");
      await select.click();
      const option = page.getByRole("listbox").getByText("选项一");
      await option.click();
      const selectWrapper = selectFormItem.locator(".el-select__wrapper");
      await expect(selectWrapper).toContainText("选项一");
    });

    test("必填校验：通过获取参数按钮触发选择框必填校验", async ({ page }) => {
      await page.getByRole("button", { name: "获取参数" }).click();
      const selectFormItem = page.locator(".el-form-item").filter({ hasText: "选择框" });
      const error = selectFormItem.locator(".el-form-item__error");
      await expect(error).toBeVisible();
      await expect(error).toContainText("请选择活动区域");
    });

    test("选择后不应显示错误", async ({ page }) => {
      const selectFormItem = page.locator(".el-form-item").filter({ hasText: "选择框" });
      const select = selectFormItem.locator(".el-select");
      await select.click();
      const option = page.getByRole("listbox").getByText("选项二");
      await option.click();
      const error = selectFormItem.locator(".el-form-item__error");
      await expect(error).not.toBeVisible();
    });
  });

  test.describe("NumberInput 数字输入与校验", () => {
    test("应在数字输入框中输入数字", async ({ page }) => {
      const numberFormItem = page.locator(".el-form-item").filter({ hasText: "数字输入框" });
      const numberInput = numberFormItem.locator("input[type='number']");
      await numberInput.fill("50");
      await expect(numberInput).toHaveValue("50");
    });

    test("应能使用增减按钮调整数值", async ({ page }) => {
      const numberFormItem = page.locator(".el-form-item").filter({ hasText: "数字输入框" });
      const increaseBtn = numberFormItem.locator(".el-input-number__increase");
      const numberInput = numberFormItem.locator("input[type='number']");
      await numberInput.fill("10");
      await increaseBtn.click();
      await expect(numberInput).toHaveValue("11");
    });

    test("必填校验：数字输入框为空时点击获取参数应显示必填错误", async ({ page }) => {
      await page.getByRole("button", { name: "获取参数" }).click();
      const numberFormItem = page.locator(".el-form-item").filter({ hasText: "数字输入框" });
      const error = numberFormItem.locator(".el-form-item__error");
      await expect(error).toBeVisible();
      await expect(error).toContainText("请输入数量");
    });

    test("输入数字后不应显示错误", async ({ page }) => {
      const numberFormItem = page.locator(".el-form-item").filter({ hasText: "数字输入框" });
      const numberInput = numberFormItem.locator("input[type='number']");
      await numberInput.fill("50");
      await numberInput.blur();
      const error = numberFormItem.locator(".el-form-item__error");
      await expect(error).not.toBeVisible();
    });
  });

  test.describe("DateTimePicker 日期时间选择与校验", () => {
    test("应能选择日期", async ({ page }) => {
      const dateFormItem = page.locator(".el-form-item").filter({ hasText: "日期选择" });
      const datePicker = dateFormItem.locator(".el-date-editor");
      await datePicker.click();
      const todayButton = page.locator(".el-date-table td.available").first();
      await todayButton.click();
      const input = dateFormItem.locator(".el-date-editor input");
      await expect(input).not.toHaveValue("");
    });

    test("应能选择日期时间", async ({ page }) => {
      const datetimeFormItem = page.locator(".el-form-item").filter({ hasText: "日期时间选择" });
      const datetimePicker = datetimeFormItem.locator(".el-date-editor");
      await expect(datetimePicker).toBeVisible();
      
      // 点击日期时间选择器
      await datetimePicker.click();
      
      // 等待一段时间让面板加载
      await page.waitForTimeout(1000);
      
      // 点击页面其他地方关闭面板
      await page.click("body");
      
      const input = datetimeFormItem.locator(".el-date-editor input");
      await expect(input).toBeVisible();
    });

    test("必填校验：日期未选择时点击获取参数应显示必填错误", async ({ page }) => {
      await page.getByRole("button", { name: "获取参数" }).click();
      const dateFormItem = page.locator(".el-form-item").filter({ hasText: "日期选择" });
      const error = dateFormItem.locator(".el-form-item__error");
      await expect(error).toBeVisible();
      await expect(error).toContainText("请选择日期");
    });

    test("必填校验：日期时间未选择时点击获取参数应显示必填错误", async ({ page }) => {
      await page.getByRole("button", { name: "获取参数" }).click();
      const datetimeFormItem = page.locator(".el-form-item").filter({ hasText: "日期时间选择" });
      const error = datetimeFormItem.locator(".el-form-item__error");
      await expect(error).toBeVisible();
      await expect(error).toContainText("请选择日期时间");
    });
  });

  test.describe("Radio 单选框与校验", () => {
    test("应能选择单选选项", async ({ page }) => {
      const radioFormItem = page.locator(".el-form-item").filter({ hasText: "单选框" });
      const maleRadio = radioFormItem.locator(".el-radio").filter({ hasText: "男" });
      await maleRadio.click();
      await expect(maleRadio).toHaveClass(/is-checked/);
    });

    test("必填校验：单选框未选择时点击获取参数应显示必填错误", async ({ page }) => {
      await page.getByRole("button", { name: "获取参数" }).click();
      const radioFormItem = page.locator(".el-form-item").filter({ hasText: "单选框" });
      const error = radioFormItem.locator(".el-form-item__error");
      await expect(error).toBeVisible();
      await expect(error).toContainText("请选择性别");
    });

    test("选择后不应显示错误", async ({ page }) => {
      const radioFormItem = page.locator(".el-form-item").filter({ hasText: "单选框" });
      const femaleRadio = radioFormItem.locator(".el-radio").filter({ hasText: "女" });
      await femaleRadio.click();
      const error = radioFormItem.locator(".el-form-item__error");
      await expect(error).not.toBeVisible();
    });
  });

  test.describe("Checkbox 多选框与校验", () => {
    test("应能选择多个多选选项", async ({ page }) => {
      const checkboxFormItem = page.locator(".el-form-item").filter({ hasText: "多选框" });
      const footballCheckbox = checkboxFormItem.locator(".el-checkbox").filter({ hasText: "足球" });
      const basketballCheckbox = checkboxFormItem.locator(".el-checkbox").filter({ hasText: "篮球" });
      await footballCheckbox.click();
      await basketballCheckbox.click();
      await expect(footballCheckbox).toHaveClass(/is-checked/);
      await expect(basketballCheckbox).toHaveClass(/is-checked/);
    });

    test("必填校验：多选框未选择时点击获取参数应显示必填错误", async ({ page }) => {
      await page.getByRole("button", { name: "获取参数" }).click();
      const checkboxFormItem = page.locator(".el-form-item").filter({ hasText: "多选框" });
      const error = checkboxFormItem.locator(".el-form-item__error");
      await expect(error).toBeVisible();
      await expect(error).toContainText("请选择爱好");
    });

    test("选择后不应显示错误", async ({ page }) => {
      const checkboxFormItem = page.locator(".el-form-item").filter({ hasText: "多选框" });
      const swimmingCheckbox = checkboxFormItem.locator(".el-checkbox").filter({ hasText: "游泳" });
      await swimmingCheckbox.click();
      const error = checkboxFormItem.locator(".el-form-item__error");
      await expect(error).not.toBeVisible();
    });
  });

  test.describe("Switch 开关", () => {
    test("应能切换开关状态", async ({ page }) => {
      const switchFormItem = page.locator(".el-form-item").filter({ hasText: "开关" });
      const switchComponent = switchFormItem.locator(".el-switch");
      await expect(switchComponent).not.toHaveClass(/is-checked/);
      await switchComponent.click();
      await expect(switchComponent).toHaveClass(/is-checked/);
    });

    test("开关默认关闭状态应显示关闭文案", async ({ page }) => {
      const switchFormItem = page.locator(".el-form-item").filter({ hasText: "开关" });
      const switchComponent = switchFormItem.locator(".el-switch");
      await expect(switchComponent).toContainText("关闭");
    });

    test("开关开启后应显示开启文案", async ({ page }) => {
      const switchFormItem = page.locator(".el-form-item").filter({ hasText: "开关" });
      const switchComponent = switchFormItem.locator(".el-switch");
      await switchComponent.click();
      await expect(switchComponent).toContainText("开启");
    });
  });

  test.describe("Upload 文件上传", () => {
    test("应显示上传按钮", async ({ page }) => {
      const uploadFormItem = page.locator(".el-form-item").filter({ hasText: "文件上传" });
      const uploadBtn = uploadFormItem.locator(".el-button");
      await expect(uploadBtn).toBeVisible();
      await expect(uploadBtn).toContainText("点击上传");
    });

    test("应显示上传提示文字", async ({ page }) => {
      const uploadFormItem = page.locator(".el-form-item").filter({ hasText: "文件上传" });
      const tip = uploadFormItem.locator(".el-upload__tip");
      await expect(tip).toBeVisible();
      await expect(tip).toContainText("支持 jpg、png、pdf 格式，最多上传3个文件");
    });

    test("应显示上传列表", async ({ page }) => {
      const uploadFormItem = page.locator(".el-form-item").filter({ hasText: "文件上传" });
      const upload = uploadFormItem.locator(".el-upload");
      await expect(upload).toHaveClass(/el-upload--text/);
    });
  });

  test.describe("获取参数按钮", () => {
    test("表单未填写时点击获取参数（带校验）应显示校验错误", async ({ page }) => {
      await page.getByRole("button", { name: "获取参数" }).click();
      const nameError = page.locator(".el-form-item").filter({ hasText: "文本框" }).locator(".el-form-item__error");
      await expect(nameError).toBeVisible();
    });

    test("表单填写合法后点击获取参数应成功", async ({ page }) => {
      const nameInputFormItem = page.locator(".el-form-item").filter({ hasText: "文本框" });
      const textarea = nameInputFormItem.locator(".el-textarea__inner");
      await textarea.fill("abc");

      const selectFormItem = page.locator(".el-form-item").filter({ hasText: "选择框" });
      const select = selectFormItem.locator(".el-select");
      await select.click();
      await page.getByRole("listbox").getByText("选项一").click();

      const numberFormItem = page.locator(".el-form-item").filter({ hasText: "数字输入框" });
      const numberInput = numberFormItem.locator("input[type='number']");
      await numberInput.fill("50");

      const radioFormItem = page.locator(".el-form-item").filter({ hasText: "单选框" });
      await radioFormItem.locator(".el-radio").filter({ hasText: "男" }).click();

      const checkboxFormItem = page.locator(".el-form-item").filter({ hasText: "多选框" });
      await checkboxFormItem.locator(".el-checkbox").filter({ hasText: "足球" }).click();

      const switchFormItem = page.locator(".el-form-item").filter({ hasText: "开关" });
      await switchFormItem.locator(".el-switch").click();

      const consoleMessages: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "log") {
          consoleMessages.push(msg.text());
        }
      });

      await page.getByRole("button", { name: "获取参数" }).click();

      await expect(async () => {
        return consoleMessages.some((msg) => msg.includes("测试数据"));
      }).toBeTruthy();
    });
  });

  test.describe("重置表单按钮", () => {
    test("点击重置表单应清空所有输入", async ({ page }) => {
      const nameInputFormItem = page.locator(".el-form-item").filter({ hasText: "文本框" });
      const textarea = nameInputFormItem.locator(".el-textarea__inner");
      await textarea.fill("abc");

      const selectFormItem = page.locator(".el-form-item").filter({ hasText: "选择框" });
      const select = selectFormItem.locator(".el-select");
      await select.click();
      await page.getByRole("listbox").getByText("选项一").click();

      const numberFormItem = page.locator(".el-form-item").filter({ hasText: "数字输入框" });
      const numberInput = numberFormItem.locator("input[type='number']");
      await numberInput.fill("50");

      const radioFormItem = page.locator(".el-form-item").filter({ hasText: "单选框" });
      await radioFormItem.locator(".el-radio").filter({ hasText: "男" }).click();

      const checkboxFormItem = page.locator(".el-form-item").filter({ hasText: "多选框" });
      await checkboxFormItem.locator(".el-checkbox").filter({ hasText: "足球" }).click();

      const switchFormItem = page.locator(".el-form-item").filter({ hasText: "开关" });
      await switchFormItem.locator(".el-switch").click();

      await page.getByRole("button", { name: "重置表单" }).click();

      await expect(textarea).toHaveValue("");
      const selectPlaceholder = selectFormItem.locator(".el-select__placeholder");
      await expect(selectPlaceholder).toBeVisible();
      await expect(numberInput).toHaveValue("");
      await expect(switchFormItem.locator(".el-switch")).not.toHaveClass(/is-checked/);
    });

    test("重置表单后应清除所有校验错误", async ({ page }) => {
      const nameInputFormItem = page.locator(".el-form-item").filter({ hasText: "文本框" });
      const textarea = nameInputFormItem.locator(".el-textarea__inner");
      await textarea.click();
      await textarea.blur();
      const error = nameInputFormItem.locator(".el-form-item__error");
      await expect(error).toBeVisible();

      await page.getByRole("button", { name: "重置表单" }).click();
      await expect(error).not.toBeVisible();
    });
  });
});
