const ACCESS_TOKEN_KEY = "accessToken";

export function setAccessToken(accessToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}
