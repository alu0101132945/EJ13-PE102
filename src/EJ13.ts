import './db/mongoose';
import {User} from './EJ13Model';
import {MongoClient} from 'mongodb';

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'notes-app';

function insert(nam:string,sur:string,ema:string,pas:string) {
    MongoClient.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, (error, client) => {
      if (error) {
        console.log(`Unable to connect to database: ${error.message}`);
      } else {
        const db = client.db(dbName);
    
        db.collection<>('Users').insertOne({
          name: nam,
          surname: sur,
          email: ema,
          password: pas
        }, (error, result) => {
          if (error) {
            console.log(error);
          } else if (result) {
            console.log(result.insertedCount);
          }
        });
      }
    });
}

function find(email:string){
    MongoClient.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((client) => {
        const db = client.db(dbName);
      
        return db.collection<>('notes').findOne({
          email: email,
        });
      }).then((result) => {
        console.log(result);
      }).catch((error) => {
        console.log(error);
      });
}
  
function update(nam:string,sur:string,ema:string,pas:string) {
    MongoClient.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((client) => {
        const db = client.db(dbName);
      
        return db.collection<>('notes').updateOne({
          email: ema,
        }, {
          $set: {
            name: nam,
            surname: sur,
            password: pas,
          },
        });
      }).then((result) => {
        console.log(result.modifiedCount);
      }).catch((error) => {
        console.log(error);
      });
    
} 

function delet(email:string) {
    MongoClient.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((client) => {
        const db = client.db(dbName);
      
        return db.collection<>('notes').deleteOne({
          email: email,
        });
      }).then((result) => {
        console.log(result.deletedCount);
      }).catch((error) => {
        console.log(error);
      });
}
  