/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const USerSchema = require('../../Model/User/userSchema');

const maxAge = 3 * 24 * 60 * 60;
const cretaeToken = (id) => jwt.sign({ id }, 'mysecretcode', {expiresIn: maxAge,});
const handleErrors = (err) => {
	let errors = '';
	if (err.message === 'Incorrect password' || err.message === 'Incorrect email') {
		errors = 'Bad Credentials';
		return errors;
	}
	return errors;
};

module.exports.Login = async (req, res) => {
    try {
		const { email, password } = req.body;
		const user = await USerSchema.login(email, password);

		const token = cretaeToken(user._id);
		res.cookie('jwt', token, {
			withCredentials: true,
			httpOnly: false,
			maxAge: maxAge * 100,
		});
		res.status(201).json({ user: user._id, created: true });
	} catch (error) {
		// eslint-disable-next-line no-console
		const errors = handleErrors(error);
		res.json({ errors, created: false });
	}
};
