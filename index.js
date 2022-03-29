const UPLOADS = __dirname+'/uploads';

const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5200;
const URL = 'mongodb://127.0.0.1:27017/eCartDb';

app.use(express.json());
app.use(cors({credentials:true, origin: true}));
app.use('/uploads', express.static(UPLOADS));

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


app.use('/api/users', require("./routes/usersRoute")(express));
app.use('/api/products', require("./routes/productRoute")(express, UPLOADS));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));