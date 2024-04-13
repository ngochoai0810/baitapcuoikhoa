export default async function editApi(id, Activities) {
  const response = await fetch(
    `https://66195b06125e9bb9f299c7ee.mockapi.io/api/Activities/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Activities),
    }
  );
  if (!response.ok) {
    console.error("ERROR");
  }

  return await response.json();
}


