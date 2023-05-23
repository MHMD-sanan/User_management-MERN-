const router = require('express').Router();
const signUp = require('../Controller/Client/signUp');
const login = require('../Controller/Client/login');
const auth=require('../MIddlewares/User/auth');
const { getUser } = require('../Controller/Client/userList');
const { EditUser, updateUser, deleteUser } = require('../Controller/Client/editUser');
const upload=require('../Utils/multer');

router.post('/',auth.checkUser);
router.post('/register', signUp.signUp);
router.post('/login', login.Login);
router.get('/getUsers',getUser);
router.get('/editUser',EditUser);
router.post('/updateUser',updateUser);
router.delete('/deleteUser/',deleteUser);

module.exports = router;
