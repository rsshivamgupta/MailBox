export const baseUrl = "http://localhost:3000/";

function getTokenHeaders() {
  const token = localStorage.getItem("token");
  if (token == null) {
    window.location = "../Login/index.html";
  }
  const headers = { authorization: token };
  return headers;
}
export default getTokenHeaders;
