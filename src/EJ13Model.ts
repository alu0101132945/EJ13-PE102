import {Document, connect, model, Schema} from 'mongoose';
import validator from 'validator';

connect('mongodb://127.0.0.1:27017/user-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});

interface PersonInterface extends Document {
  name: string,
  surname: string,
  email: string,
  password: string
}

const UserSchema = new Schema<PersonInterface>({
  name: {
    type: String,
    trim: true,
    required: true,
    validate: (value: string) => {
        if (!value.match(/^[A-Z]/)) {
          throw new Error('Names must start with a capital letter');
        } else if (!validator.isAlpha(value)) {
          throw new Error('Names must contain alpha characters only');
        }
      },
    },
  surname: {
    type: String,
    trim: true,
    required: true,
    validate: (value: string) => {
        if (!value.match(/^[A-Z]/)) {
          throw new Error('Surnames must start with a capital letter');
        } else if (!validator.isAlpha(value)) {
          throw new Error('Surnames must contain alpha characters only');
        }
    },
  },
  email: {
    type: String,
    trim: true,
    required: true,
    validate: (value: string) => {
        if (!validator.isEmail(value)) {
          throw new Error('The email string must contain an email');
        }
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

const User = model<PersonInterface>('User', UserSchema);

function insert(nam:string,sur:string,ema:string,pas:string) {
  User.insertMany({
    name: nam,
    surname: sur,
    email: ema,
    password: pas
  }).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
}

function find(email:string){
  User.findOne({
        email: email,
      })
      .then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
}

function update(nam:string,sur:string,ema:string,pas:string) {
  User.updateOne({
        email: ema,
      }, {
        $set: {
          name: nam,
          surname: sur,
          password: pas,
        },
  }).then((result) => {
    // console.log(result.modifiedCount);
  }).catch((error) => {
    console.log(error);
  }); 
} 

function delet(email:string) {
  User.deleteOne({
        email: email,
  }).then((result) => {
    console.log(result.deletedCount);
  }).catch((error) => {
    console.log(error);
  });
}

insert('Carlos','Pio','carlos@gmail.com','1234')
insert('Alicia','Pio','alicia@gmail.com','5678')
find('carlos@gmail.com')
update('Juan','Pio','carlos@gmail.com','12AB')
delet('alicia@gmail.com')