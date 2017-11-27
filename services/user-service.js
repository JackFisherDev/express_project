const _ = require('lodash');
const User = require('../models/user');

class UserService {
    static createUser(params, callback) {
        const user = new User(params);
        user.save(callback);
    }

    static showUser(id, callback) {
        const query = {};

        if (id) query._id = id;

        User.find(query, callback);
    }

    static updateUser(id, params, callback) {
        User.findById(id, (err, user) => {
            if(err) return callback(err);
            if(!user) return callback();
            // Update attributes
            user = _.merge(user, params);
            user.save(callback)
        });
    }

    static deleteUser(id, callback) {
        User.remove({ _id: id }, callback);
    }
}

module.exports = UserService;