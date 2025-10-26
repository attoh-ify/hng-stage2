import dotenv from "dotenv";
dotenv.config();

const { PORT, MYSQL_PUBLIC_URL, COUNTRIES_API, EXCHANGE_API } = process.env;

if (!MYSQL_PUBLIC_URL || !COUNTRIES_API || !EXCHANGE_API) {
  throw new Error("❌ Missing critical environment variables.");
}

const config = {
  port: PORT || 5000,
  databaseUrl: MYSQL_PUBLIC_URL,
  api: {
    countries: COUNTRIES_API,
    rates: EXCHANGE_API
  },
};

export default config;