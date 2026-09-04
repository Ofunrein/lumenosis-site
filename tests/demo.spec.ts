import { createHmac } from "node:crypto";
import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";

const demoSecret = "test-demo-room-secret-at-least-32-characters";
const demoToken = createHmac("sha256", demoSecret)
  .update("lumenosis-demo:patricia-any-old-street")
  .digest("base64url");
const demo = `/demo/${demoToken}`;

test("approved demo loads and property gallery works", async ({ page }) => {
  await page.goto(demo);
  await expect(page.getByRole("heading", { name: /every listing inquiry/i })).toBeVisible();

  await page.getByRole("button", { name: "Open photo 1 of 3" }).click();
  const gallery = page.getByRole("dialog", { name: /photo gallery/i });
  await expect(gallery).toBeVisible();
  await expect(gallery).toContainText("1 of 3");

  await page.keyboard.press("ArrowRight");
  await expect(gallery).toContainText("2 of 3");
  await page.mouse.click(4, 4);
  await expect(gallery).toBeHidden();
});

test("gallery supports mobile swipe", async ({ page }) => {
  await page.goto(demo);
  await page.getByRole("button", { name: "Open photo 1 of 3" }).click();
  const gallery = page.getByRole("dialog", { name: /photo gallery/i });

  await gallery.evaluate((element) => {
    const touch = (x: number) =>
      new Touch({ identifier: 1, target: element, clientX: x, clientY: 300 });
    element.dispatchEvent(
      new TouchEvent("touchstart", { bubbles: true, changedTouches: [touch(300)] }),
    );
    element.dispatchEvent(
      new TouchEvent("touchend", { bubbles: true, changedTouches: [touch(100)] }),
    );
  });

  await expect(gallery).toContainText("2 of 3");
});

test("email preview reads like a team member", async ({ page }) => {
  await page.route("**/api/demo/*/email", (route) =>
    route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        subject: "471 Any Old Street East",
        reply:
          "Hi, the home was listed as active at our last verification. Would you like Patricia to confirm weekend showing availability?",
        captured: ["Wants a weekend showing"],
        nextAction: "Confirm availability with Patricia",
      }),
    }),
  );
  await page.goto(demo);
  await page.getByRole("button", { name: "Run email demo" }).click();
  await expect(page.getByText(/the home was listed as active/i)).toBeVisible();
  await expect(page.locator("body")).not.toContainText(
    /AI assistant|artificial intelligence|automated reply/i,
  );
});

test("email route keeps disclosure language out of buyer replies", async () => {
  const source = await readFile("app/api/demo/[token]/email/route.ts", "utf8");
  expect(source).not.toContain("I’m Iris, the AI assistant");
  expect(source).not.toContain("AI email agent");
  expect(source).toContain("Do not mention AI, automation, a demo");
});

test("admin actions reject unauthenticated requests", async ({ request }) => {
  const response = await request.post("/api/admin/demos/not-a-demo/approve");
  expect(response.status()).toBe(401);
});

test("admin password creates a protected session", async ({ request }) => {
  const response = await request.post("/api/admin/login", {
    form: { password: "7458" },
    maxRedirects: 0,
  });
  expect(response.status()).toBe(303);
  expect(response.headers().location).toMatch(/\/admin\/demos$/);
  expect(response.headers()["set-cookie"]).toContain("lumenosis_admin=");
  expect(response.headers()["set-cookie"]).toContain("HttpOnly");
  expect(response.headers()["set-cookie"].toLowerCase()).toContain("samesite=strict");
});
