var http = require('http');
var fs = require('fs');

//function to set headers and send data flexibly
function serveStatic(res, path, contentType, responseCode){
	if (!responseCode){
		//set response code to 200 unless otherwise specified
		responseCode = 200;
	}

	fs.readFile(__dirname + path, function(err, data){
		if(err){ 
			//handle server errors
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.end('500 - Internal Error');
		} else {
			//set appropriate header, send data.
			res.writeHead(responseCode, {'Content-Type': contentType});
			res.end(data);
		}
	});
}

//create server and handle basic routes
http.createServer(function(req, res){
	var path = req.url.toLowerCase();
	switch(path){
		case '/':
			//send html file for home page
			serveStatic(res, '/public/home.html', 'text/html');
			break;
		case '/about':
			//send text file (to show that I can).
			serveStatic(res, '/public/about.html', 'text/html');
			break;
		default: 
			//if not home or about, send 404 response.
			res.writeHead(404, {'Content-Type' : 'text/plain'});
			res.end('404: Page not found.');
	}
})
.listen(process.env.PORT || 3000);

console.log("Server started, listening on port 3000");