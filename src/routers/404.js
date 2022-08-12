const express = require('express')

const { errorJson, errorHtml } = require('../middleware/errors')

const router = new express.Router()

router.get('*', async (req, res) => { errorJson(res, 404) })


router.post('*', async (req, res) => { errorJson(res, 404) })


router.patch('*', async (req, res) => { errorJson(res, 404) })


router.put('*', async (req, res) => { errorJson(res, 404) })


router.delete('*', async (req, res) => { errorJson(res, 404) })


module.exports = router
