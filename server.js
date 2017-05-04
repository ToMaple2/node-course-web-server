/*
	server.js
*/
const express = require( 'express' );
const hbs = require( 'hbs' );
const fs = require( 'fs' );

const port = process.env.PORT || 3000; //	set port# from an environment variable with a default of 3000

var app = express();
hbs.registerPartials( __dirname + '/views/partials' );
app.set( 'view engine', 'hbs' );

//	express "middleware"
//	- server logging
app.use( ( request, response, next ) => {
	var now = new Date().toString();
	var logEntry = `${now}: ${request.method} ${request.url}`;
	console.log( logEntry );
	fs.appendFile( 'server.log', logEntry + '\n', (err) => {
		if ( err ) {
			console.log( 'Unable to append to server log' );
		}
	});
	next();
});
//	- uncomment to display a maintenance message
// app.use(( request, response, next ) => {
// 	response.render( 'maintenance.hbs', {
// 		pageTitle: 'System Maintenance'
// 	});
// });

//	designate a public directory of static pages
app.use( express.static( __dirname + '/public' ));

hbs.registerHelper( 'getCurrentYear', () => {
	return new Date().getFullYear();
});

// define a root url mapping for a home page
app.get( '/', ( request, response ) => {
	// response.send( 'Hello Express' );
	response.render( 'home.hbs', {
		pageTitle: 'Home Page',
		name: 'Tom',
		likes: [ 'sushi', 'music', 'my wife' ]
	});
});

//	About page
app.get( '/about', ( request, response ) => {
	response.render( 'about.hbs', {
		pageTitle: 'About Page'
	} );
});

app.get( '/bad', ( request, response ) => {
	response.send( { errorMessage: 'Unable to handle request' } );
});

//	start listening
app.listen( port, () => {
	console.log( `Server is up on port ${port}` );
} );
