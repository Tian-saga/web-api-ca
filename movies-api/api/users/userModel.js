import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const Schema = mongoose.Schema;

// 先准备一个正则表达式
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const UserSchema = new Schema({
  username: {
    type: String, 
    unique: true, 
    required: [true, 'Username is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: function (value) {
        return passwordRegex.test(value);
      },
      message:
        'Password must be at least 8 chars long, contain letters, digits and special characters.'
    }
  }
});

UserSchema.methods.comparePassword = async function (passw) { 
  return await bcrypt.compare(passw, this.password); 
}

UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

UserSchema.pre('save', async function(next) {
  const saltRounds = 10; // You can adjust the number of salt rounds
  //const user = this;
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
  } catch (error) {
     next(error);
  }

  } else {
      next();
  }
});


export default mongoose.model('User', UserSchema);
