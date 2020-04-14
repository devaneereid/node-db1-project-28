const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

// GET Request
router.get('/', (req, res) => {
    db.select('*')
        .from('accounts')
        .then(accounts => {
            res.status(200).json({ data: accounts });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'GET request not reached' });
        });
});

// GET (ID's) Request
router.get('/:id', (req,res) => {
    db('accounts')
        .where({ id: req.params.id })
        .first()
        .then(accounts => {
            res.status(200).json({ data: accounts });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving Account ID'});
        });
});

// POST Request
router.post('/', (req, res) => {
    const postData = req.body;
        db('accounts')
            .insert(postData, 'id')
            .then(ids => {
                const id = ids[0];
                db('accounts')
                .where({ id })
                .first()
                .then(post => {
                    res.status(201).json({ data: post });
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: 'Error creating new post' });
            });
});

// PUT Request
router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    db('accounts')
        .where({ id })
        .update(changes)
        .then(count => {
            res.status(200).json(count)
            })
            .catch(error => {
                console.log('PUT Error', error)
                res.status(404).json({ message: 'No Accounts by that ID found' });
            });
});

// PATCH Request 
// router.patch('/:id', (req, res) => {
//     const changes = req.body;
//     const { id } = req.params;
//     db('accounts')
//         .where({ id })
//         .update(changes)
//         .then(count => {
//             if (count > 0) {
//                 res.status(200).json({ message: 'Update request successful' })
//             } else {
//                 res.status(404).json({ message: 'No Accounts by that ID found' });
//             }
//         });
// });

// DELETE Request
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db('accounts')
        .where({ id })
        .del()
        .then(count => {
            res.status(200).json(count);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'Failed to Delete account' })
        });
});

module.exports = router;