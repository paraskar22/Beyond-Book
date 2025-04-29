// auth.config.js
module.exports = {
  secret: process.env.JWT_SECRET || "dev-secret-key",
  jwtExpiration: "24h", // Token expires in 24 hours
};
