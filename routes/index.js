var express = require('express');
var router = express.Router();
var Todo = require('../model/db');
var utils = require('../utils');

router.get('/', function (req, res) {
    if (req.cookies != undefined) {
        var user_id = req.cookies.user_id;
    }
    else {
        var user_id = undefined;
    }

    Todo.
        find({ user_id: user_id }).
        sort('-updated_at').
        exec(function (err, todos) {
            if (err) console.log(err);

            res.render('index', {
                title: 'Todo Lists',
                todos: todos
            });
        });
});


router.post('/create', function (req, res) {
    new Todo({
        user_id: req.cookies.user_id,
        content: req.body.content,
        updated_at: Date.now()
    }).save(function (err, todo, count) {
        if (err) console.log(err);

        res.redirect('/');
    });
});

router.get('/destroy/:id', function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (req.cookies != undefined) {
            var user_id = req.cookies.user_id;
        }
        else {
            var user_id = undefined;
        }

        if (todo.user_id !== user_id) {
            return utils.forbidden(res);
        }

        todo.remove(function (err, todo) {
            if (err) console.log(err);

            res.redirect('/');
        });
    });
});

module.exports = router;