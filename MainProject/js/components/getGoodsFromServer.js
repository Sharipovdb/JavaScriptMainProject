export async function getGoodsFromServer() {
  const response = await fetch("./data/data.json", {
    method: "GET",
    headers: {
      email: "blitzdima@yandex.ru",
    },
  });

  const data = await response.json();
  return data;
}