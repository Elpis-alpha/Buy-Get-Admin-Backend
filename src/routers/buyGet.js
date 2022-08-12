const express = require('express')

const { errorJson } = require('../middleware/errors')

const BuyGet = require('../models/BuyGet')

const router = new express.Router()


// Sends post request to create buyGet
router.post('/api/buyGet/create', async (req, res) => {

  try {

    const doublePm = await BuyGet.find({ title: req.body.title })

    if (doublePm.length > 0) return res.status(400).send({ error: 's', bat: '...', message: "Duplicate Title" })

    const doubleXPm = await BuyGet.find({ 'productOrBrand.data.name': req.body.productOrBrand.data.name, 'offerProducts.data.name': req.body.offerProducts.data.name })

    if (doubleXPm.length > 0) return res.status(400).send({ error: 's', bat: '...', message: "Duplicate Promo" })

    const newBuyGet = new BuyGet({

      ...req.body

    })

    await newBuyGet.save()

    res.status(201).send(newBuyGet)

  } catch (error) {

    res.status(400).send(error)

  }

})


// Sends get request to get all buyGet
router.get('/api/buyGet/get-all', async (req, res) => {

  const sort = {}

  if (req.query.sortBy) {

    const query = req.query.sortBy.split(':')

    query[1] = query[1] === 'asc' ? 1 : -1

    sort[query[0]] = query[1]

  }

  const limit = req.query.limit

  const skip = req.query.skip

  try {

    const buyGet = await BuyGet.find().limit(limit).skip(skip).sort(sort)

    res.send(buyGet)

  } catch (error) {

    console.log(error);

    return errorJson(res, 500)

  }

})


// Sends get request to get all specific item
router.get('/api/buyGet/getSingle', async (req, res) => {

  try {

    const title = req.query.title

    if (typeof title !== "string") return errorJson(res, 400, "No _id provided")

    const buyGet = await BuyGet.findOne({ title })

    if (!buyGet) return errorJson(res, 404)

    res.send(buyGet)

  } catch (error) {

    return errorJson(res, 500)

  }

})


// Sends patch request to update buyGet
router.patch('/api/buyGet/update', async (req, res) => {

  const _id = req.params.id

  const updates = Object.keys(req.body)

  const allowedUpdate = ['title', 'startDate', 'endDate', 'productOrBrand', 'offerProducts']

  const isValidOp = updates.every(item => allowedUpdate.includes(item))

  if (!isValidOp) return res.status(400).send({ error: 'Invalid Updates', allowedUpdates: allowedUpdate })

  try {

    const title = req.query.title

    if (typeof title !== "string") return errorJson(res, 400, "No _id provided")

    const buyGet = await BuyGet.findOne({ title })

    const doublePm = await BuyGet.find({ title: req.body.title })

    console.log(doublePm[0]?._id);
    console.log(buyGet._id);

    if (doublePm.length > 0 && doublePm[0]?._id?.toString() !== buyGet._id.toString()) return res.status(400).send({ error: 's', bat: '...', message: "Duplicate Title" })

    const doubleXPm = await BuyGet.find({ 'productOrBrand.data.name': req.body.productOrBrand.data.name, 'offerProducts.data.name': req.body.offerProducts.data.name })

    if (doubleXPm.length > 0 && doubleXPm[0]?._id?.toString() !== buyGet._id.toString()) return res.status(400).send({ error: 's', bat: '...', message: "Duplicate Promo" })

    updates.forEach(item => buyGet[item] = req.body[item])

    await buyGet.save()

    if (!buyGet) return errorJson(res, 404)

    res.status(201).send(buyGet)

  } catch (error) {

    return errorJson(res, 500)

  }

})


// Sends delete request to delete buyGet
router.delete('/api/buyGet/delete', async (req, res) => {

  try {

    const title = req.query.title

    if (typeof title !== "string") return errorJson(res, 400, "No _id provided")

    const buyGet = await BuyGet.findOneAndDelete({ title })

    if (!buyGet) return errorJson(res, 404)

    res.send(buyGet)

  } catch (error) {

    return errorJson(res, 500)

  }

})


module.exports = router
