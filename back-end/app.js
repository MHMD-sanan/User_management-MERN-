/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoute = require('./Route/client');
const adminRoute=require('./Route/admin')

const app = express();

app.listen(3001, () => {
	console.log('server started in 3001');
});
require('./utils/dbConfig');

app.use(
	cors({
		origin: ['http://localhost:3000'],
		method: ['GET', 'POST', 'DELETE', 'PATCH'],
    	credentials: true,
	}),
);
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static("uploads"));

// const fileupload=require('express-fileupload');
// app.use(fileupload({
//     useTempFiles:true
// }))


app.use('/', userRoute);
app.use('/admin',adminRoute)