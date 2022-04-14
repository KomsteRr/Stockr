"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express")), express_test = express_1;
const mongodb_1 = require("mongodb");
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default ? (0, express_1.default)() : express_test.default();
const port = process.env.port || 8889;
const db_url = 'mongodb://127.0.0.1:27017/';
const dbname = 'stockr';
app.get('/stockr-items', function (req, res) {
    try {
        mongodb_1.MongoClient.connect((db_url + dbname), function (err, db) {
            if (err)
                throw err;
            let dbo;
            dbo = db.db(dbname);
            dbo.collection("items").find({}).toArray(function (err, result) {
                if (err)
                    throw err;
                db.close();
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result));
            });
        });
    }
    catch (err) {
        throw err;
    }
});
app.use(body_parser_1.default.json());
app.post('/add-stockr', function (req, res) {
    try {
        mongodb_1.MongoClient.connect((db_url + dbname), function (err, db) {
            if (err)
                throw err;
            let dbo;
            dbo = db.db(dbname);
            dbo.collection("items").insertOne(req.body, function (err, result) {
                if (err)
                    throw err;
                db.close();
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result));
            });
        });
    }
    catch (err) {
        throw err;
    }
});
app.post('/delete-stockr', function (req, res) {
    try {
        mongodb_1.MongoClient.connect((db_url + dbname), function (err, db) {
            if (err)
                throw err;
            let dbo;
            dbo = db.db(dbname);
            dbo.collection("items").deleteOne(req.body, function (err, result) {
                if (err)
                    throw err;
                db.close();
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result));
            });
        });
    }
    catch (err) {
        throw err;
    }
});
app.listen(port, () => console.log(`app running on port ${port}`));
//# sourceMappingURL=index.js.map