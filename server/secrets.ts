export const keycloak = {
  client_id: "minied",
  client_secret: "nMWnkmbYa3xCIf0vw2d5fLfjKRD4jzxB", // TODO
  redirect_uris: ["http://127.0.0.1:8080/api/login-callback"],
  post_logout_redirect_uris: [""],
  response_types: ["code"],
}