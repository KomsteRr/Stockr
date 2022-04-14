// import express, { Router, Request, Response, NextFunction } from 'express';
import express, * as express_test from "express"
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';

const app = express ? express() : express_test.default();
const port = process.env.port || 8889;
const db_url = 'mongodb://127.0.0.1:27017/';
const dbname = 'stockr';

app.get('/stockr-items', function (req: express.Request, res: express.Response) {

    try {
        //ici la connection à mongodb
        MongoClient.connect((db_url + dbname), function (err, db) {
            if (err) throw err;
            let dbo: any;
            dbo = db.db(dbname);

            dbo.collection("items").find({}).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(result))
            });
        });

    }
    catch (err) {
        throw err;
    }
})

app.use(bodyParser.json());

app.post('/add-stockr', function (req: express.Request, res: express.Response) {
    try {
        //ici la connection à mongodb
        MongoClient.connect((db_url + dbname), function (err, db) {
            if (err) throw err;
            let dbo: any;
            dbo = db.db(dbname);

            dbo.collection("items").insertOne(req.body, function (err, result) {
                if (err) throw err;
                db.close();
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(result))
            });
        });
    } catch (err) {
        throw err;
    }
})

app.post('/delete-stockr', function (req: express.Request, res: express.Response) {
    try {
        //ici la connection à mongodb
        MongoClient.connect((db_url + dbname), function (err, db) {
            if (err) throw err;
            let dbo: any;
            dbo = db.db(dbname);

            dbo.collection("items").deleteOne(req.body, function (err, result) {
                if (err) throw err;
                db.close();
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(result))
            });
        });
    } catch (err) {
        throw err;
    }
})

//on lance notre app sur le port paramétré
app.listen(port, () => console.log(`app running on port ${port}`))