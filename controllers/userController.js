const { ObjectId } =  require('mongoose').Types;
const { User, Thought, Reaction} = require('../models');



module.exports = {
    async getUsers(req, res) {
        try{
            const users = await User.find();
            const userObj = {
                users,

            };
            return res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleUser (req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId})
                .select('-__v')
                .populate('thoughts')
                .populate('friends');

            if (!user){
                return res.status(404).json({ Message: 'User not found.'});
            }

            res.json(user);
        } catch (err){
            res.status(500).json(err);
        }
    },
    async createUser (req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser (req, res) {
        try{
            console.log('Updating a user.');
            console.log(req.body);
            const userUpdate = await User.findOneAndUpdate(
                { _id: req.params.userId},
                {$set: {'username': req.body.username}},
                {$set: {'email': req.body.email}},
                
            );
            if (!userUpdate) {
                return res
                    .status (404)
                    .json({message: 'User with that id not found.'});
            }
        } catch (err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteUser (req, res) {
        try{
            const user = await User.findOneAndRemove({ _id: req.params.userId});
            if (!user){
                return res.status(404).json({message: 'User not found.'});
            }
            
        } catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
};