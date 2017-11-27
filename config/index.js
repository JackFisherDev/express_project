module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    mongo: {
        url: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/users'
    }
};