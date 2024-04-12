export default async function deleteApi(id) {
  const response = await fetch(
    "https://66195b06125e9bb9f299c7ee.mockapi.io/api/Activities/" + id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    return await response.json();
  }
}
