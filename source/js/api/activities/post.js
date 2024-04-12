import { Render } from "../../main.js";
export default async function postActivity(data) {
  const respone = await fetch(
    "https://66195b06125e9bb9f299c7ee.mockapi.io/api/Activities",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  Render();
  return respone;
}
