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

  test.describe("获取参数按钮", () => {
    test("表单未填写时点击获取参数（带校验）应显示校验错误", async ({ page }) => {
      await page.getByRole("button", { name: "获取参数" }).click();
      const nameError = page.locator(".el-form-item").filter({ hasText: "文本框" }).locator(".el-form-item__error");
      await expect(nameError).toBeVisible();
    });

    test("表单填写合法后点击获取参数应成功", async ({ page }) => {
      const inputFormItem = page.locator(".el-form-item").filter({ hasText: "文本框" });
      const textarea = inputFormItem.locator(".el-textarea__inner");
      await textarea.fill("abc");

      const selectFormItem = page.locator(".el-form-item").filter({ hasText: "选择框" });
      const select = selectFormItem.locator(".el-select");
      await select.click();
      await page.getByRole("listbox").getByText("选项一").click();

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
      const inputFormItem = page.locator(".el-form-item").filter({ hasText: "文本框" });
      const textarea = inputFormItem.locator(".el-textarea__inner");
      await textarea.fill("abc");

      const selectFormItem = page.locator(".el-form-item").filter({ hasText: "选择框" });
      const select = selectFormItem.locator(".el-select");
      await select.click();
      await page.getByRole("listbox").getByText("选项一").click();

      await page.getByRole("button", { name: "重置表单" }).click();

      await expect(textarea).toHaveValue("");
      const selectedValue = selectFormItem.locator(".el-select__placeholder");
      await expect(selectedValue).toBeVisible();
    });

    test("重置表单后应清除所有校验错误", async ({ page }) => {
      const inputFormItem = page.locator(".el-form-item").filter({ hasText: "文本框" });
      const textarea = inputFormItem.locator(".el-textarea__inner");
      await textarea.click();
      await textarea.blur();
      const error = inputFormItem.locator(".el-form-item__error");
      await expect(error).toBeVisible();

      await page.getByRole("button", { name: "重置表单" }).click();
      await expect(error).not.toBeVisible();
    });
  });
});
