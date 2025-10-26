import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT,
  MYSQL_PUBLIC_URL: "mysql://root:JysdQeDlWYCTZjUyStUEQUlJJnisgToG@shinkansen.proxy.rlwy.net:17656/railway",
  api: {
    countries: "https://restcountries.com/v2/all?fields=name,capital,region,population,flag,currencies",
    rates: "https://open.er-api.com/v6/latest/USD",
  },
};

// Updated validation
if (!config.port) {
  throw new Error(
    "Missing port variables. Check .env file."
  );
}

export default config;
