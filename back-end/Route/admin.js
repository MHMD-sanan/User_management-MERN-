const router=require('express').Router();
const { login } = require('../Controller/admin/Login');
const auth=require('../MIddlewares/admin/auth');
const upload=require('../Utils/multer');
const AddUsr=require('../Controller/admin/AddUser');

router.post('/login',login);
router.post('/verifAdmin',auth.checkAdmin);
router.post('/adduser',upload.single("profileImage"),AddUsr.AddUser);

module.exports=router;