export function isAuthorized(request) {
  const password = request.headers.get("x-admin-password");
  return Boolean(process.env.ADMIN_PASSWORD) && password === process.env.ADMIN_PASSWORD;
}
