export default async function getApi() {
  const respone = await fetch(
    "https://66195b06125e9bb9f299c7ee.mockapi.io/api/Activities"
  );
  if (!respone.ok) {
    return [];
  }
  return await respone.json();
}
getApi();
