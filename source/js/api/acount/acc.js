export default async function postApi(data) {
  const respone = await fetch("https://recruitment-api.pyt1.stg.jmr.pl/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const da = await respone.json();
  console.log(da);
  if (da.status === "ok") {
    window.location.href = "./indexx.html";
  }
}
