const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fuzzy = require('mongoose-fuzzy-searching');

const reviewSchema = mongoose.Schema(
  {
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date: { 
      type: String,
    },
  },  
  {
    timestamps: true,
  }
);

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      default: "phone"
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    sex: {
      type: String,
      default: "",
    },
    specialization: {
      type: String
    },
    about: {
      type: String,
      default: "",
    },
    location: {
      latitude : {
        type: String,
        default: "",
      },
      longitude: {
        type: String,
        default: "",
      },
    },
    image: {
      type: String,
      default: "",
    },
    charge: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.plugin(fuzzy, {
  fields:
     ['name']
  
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
