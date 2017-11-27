const _ = require("lodash");
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UserService = require('../services/user-service');
const UserMapper = require('../mapper/user-mapper');

// Show user data by ID
router.get('/:id', function (req, res, next) {
    UserService.showUser(req.params.id, (err, users) => {
        if(err) return next(err);
        res.send(users);
    });
});

// Show all users
router.get('', function (req, res, next) {
    UserService.showUser(req.params.id, (err, users) => {
        if(err) return next(err);
        res.send(users);
    });
});

// Register user
router.post('', function (req, res, next) {
    req.check('firstName', 'Empty first name').notEmpty();
    req.sanitize('firstName').escape();
    req.sanitize('firstName').trim();

    req.check('lastName', 'Empty last name').notEmpty();
    req.sanitize('lastName').escape();
    req.sanitize('lastName').trim();

    req.check('email', 'Invalid email')
        .notEmpty()
        .isEmail();
    req.sanitize('email').trim();

    req.check('password', 'Password is invalid')
        .notEmpty()
        .isLength({
            min: 4,
            max: 20
        });
    req.sanitize('password').escape();

    const dataToCreate = _.cloneDeep(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));
    // Validation ...
    console.log(dataToCreate);

    const errors = req.validationErrors();
    console.log(errors);

    if (errors) {
        res.send(errors);
    } else {
        UserService.createUser(dataToCreate, (err, user) => {
            if (err) return next(err);
            res.status(200).json(UserMapper.userToResponse(user));
        });
    }
});

// Update user data
router.put('/:id', function (req, res, next) {
    const dataToCreate = _.cloneDeep(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));
    UserService.updateUser(req.params.id, dataToCreate, (err, user) => {
        if(err) return next(err);
        res.json(UserMapper.userToResponse(user));
    })
});

// Delete user
router.delete('/:id', function (req, res, next) {
    UserService.deleteUser(req.params.id, (err, removed) => {
        if(err) return next(err);
        res.json({removed});
    });
});

module.exports = router;
