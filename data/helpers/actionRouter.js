const express = 'express';
const Actions = require('./actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get(req.query, id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: 'Actions not found'})
    });
});

router.get('/:id', (req,res) => {
    Actions.insert(req.params.id)
    .then(action => {
        if (action){
            res.status(200).json(action)
        }else {
            res.status(404).json({message: `${id} not found`})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: 'Action not found'});
    })
})

router.post('/:id', (req, res) =>{
    Actions.insert(req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: 'error creating action'})
    })
})

router.put('/:id', (req, res) => {
    Actions.update(req.params.id)
    .then(action => {
        if(!req.params){
            res.status(400).json({message: 'null'})
        }else{
            reques.status(200).json(action)
        }
    })
})