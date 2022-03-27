const UPLOADS = __dirname+'/uploads';

const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5200;
const URL = 'mongodb://127.0.0.1:27017/eCartDb';

app.use(express.json());

app.use(cors({credentials:true, origin: true}));

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => console.log('Connected'))
    .catch((err) => console.log(err));

const con = mongoose.connection;

con.on('open', () => {
    console.log('Second database connection passed')
})

con.on('error', () => {
    console.log('Connection failed');
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

app.use('/api', require("./routes/appRoutes")(express, UPLOADS));
