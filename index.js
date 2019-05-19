var express = require('express');
const mssql = require('mssql');

const app=express();

const config = {
		server: '',
		port: 1433,
    	user: '',
    	password: '',
    	database: '',
    	options: {
        	encrypt: false,
        	pool: {
                max: 100,
                min: 0,
                idleTimeoutMillis: 30000
            }
    	}
	};

app.get("/readdb",function(req,res){
	
    var queryString=req.query.qry;
    console.log(queryString);
	new mssql.ConnectionPool(config).connect().then(pool => {
		return pool.request().query(queryString)
			}).then(result => {
			let rows = result.recordset
			//res.setHeader('Access-Control-Allow-Origin', '*')
			res.status(200).json(rows);
			mssql.close();
			}).catch(err => {
			console.log(err);
			res.status(500).send({ message: err})
			mssql.close();
	});
})

app.listen(8888,() => console.log("Listening"));

