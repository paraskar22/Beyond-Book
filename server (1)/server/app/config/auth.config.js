require('dotenv').config();

module.exports = {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiration: 86400, // 24 hours in seconds
    jwtRefreshExpiration: 604800, // 7 days in seconds
    saltRounds: 10
}; 