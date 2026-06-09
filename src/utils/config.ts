const apiPrefix: string = "/admin";
export const config = {
  BACKEND_API_URL: `${process.env.REACT_APP_BACKEND_API_URL}${apiPrefix}` || "http://localhost:5000/api/admin",
};

console.log(
  "API URL:",
  process.env.REACT_APP_BACKEND_API_URL
);