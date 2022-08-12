const mongoose = require('mongoose')


const buyGetSchema = new mongoose.Schema({

  title: {

    type: String,

    required: true,

    unique: true,

    trim: true,

  },

  startDate: {

    type: String,

    required: true,

  },

  endDate: {

    type: String,

    required: true,

  },

  productOrBrand: { // type, data, pieces

    type: Object,

    required: true,

  },

  offerProducts: { // data, pieces

    type: Object,

    required: true,

  },

}, { timestamps: true })

// BuyGet Model
const BuyGet = mongoose.model('BuyGet', buyGetSchema)

module.exports = BuyGet
