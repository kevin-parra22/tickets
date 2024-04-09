const { Router } = require('express');
const querys = require('../querys');

const router = Router();

router.get('/', async (req, res) => {
    const query = await querys.getAllactors();
    return res.status(200).json(query);
});

module.exports = router;