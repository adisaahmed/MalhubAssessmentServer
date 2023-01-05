const express = require("express");
const app = express();
require('dotenv').config();
const control = require("./routes/control");
const moment = require('moment');
const { default: mongoose } = require("mongoose");



app.use( (req, res, next) => {
    console.log( 'Date/time:', moment().format(), req.originalUrl );
    next();
} )

app.use( express.static('public') );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) )

const dbconnect = async ( DB_URL ) => {
    try {
        const conn = await mongoose.connect( DB_URL, {
            useUnifiedTopology: true,
        } )
        mongoose.set("strictQuery", true)
        console.log(`DB connected. ${ conn.connection.name }`)

    } catch (error) {
        console.log('DB connect failed', error.message);
    }
}


app.use("/api", control);

app.use( ( err, req, res, next ) => {
    console.log('error is ', err.message)
    res.status( 500 ).send('server error ' + err.message)
} )



app.get( '*', (req, res) => {
    res.status(404).json( {
        success: false,
        message: ` No such resource ${ req.originalUrl } `
    } )
} )


const DB_URL = process.env.DB_URL;
dbconnect( DB_URL )


const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
