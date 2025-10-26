import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 51320,

  MYSQL_PUBLIC_URL: process.env.MYSQL_PUBLIC_URL || "mysql://root:JysdQeDlWYCTZjUyStUEQUlJJnisgToG@shinkansen.proxy.rlwy.net:17656/railway",

  api: {
    countries: process.env.COUNTRIES_API_URL,
    rates: process.env.RATES_API_URL,
  },
};

// Updated validation
if (!config.MYSQL_PUBLIC_URL || !config.api.countries || !config.api.rates) {
  throw new Error(
    "Missing critical environment variables. Check .env file for DATABASE_URL and API URLs."
  );
}

export default config;
