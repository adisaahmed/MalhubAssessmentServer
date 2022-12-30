const express = require("express");
const app = express();
const control = require("./routes/control");
const moment = require('moment');



app.use( (req, res, next) => {
    console.log( 'Date/time:', moment().format(), req.originalUrl );
    next();
} )

app.use( express.static('public') );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) )
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



const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
