/* eslint-disable no-underscore-dangle */
const USerSchema = require("../../Model/User/userSchema");

module.exports.EditUser=async(req,res)=>{
    try {
        const user=await USerSchema.findById(req.query.id);
        res.status(201).json(user);

    } catch (error) {
        console.log(error);
    }
}

module.exports.updateUser=async(req,res)=>{
    try {
        await USerSchema.findByIdAndUpdate({ _id: req.body._id }, { $set: { name: req.body.name}});
        res.status(201).json({status:true})
    } catch (error) {
        console.log(error);
    }   
}

module.exports.deleteUser=async(req,res)=>{
    try {
        await USerSchema.findByIdAndDelete(req.query.id);
        res.status(201).json({status:true});
    } catch (error) {
        console.log(error);
    }
}