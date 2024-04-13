export default async function getActivities(id) {
  const response = await fetch(
    `https://66195b06125e9bb9f299c7ee.mockapi.io/api/Activities/${id}`
  );

  if (!response.ok) {
    console.error("ERROR");
  }

  const data = await response.json();
  return data;
}
