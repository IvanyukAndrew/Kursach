const {Router} = require('express');
const router = Router();
const Badge = require('./models/Badge');

router.get('/', async (req, res) => {
    const badges = await Badge.find({}).lean();

    res.render('index', {
        title: 'Badge List',
        isIndex: true,
        badges
    });
});

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Badge',
        isCreate: true
    });
});

router.post('/create', async (req, res) => {
    const badge = new Badge({
        title: req.body.title
    })

    await badge.save()
    res.redirect('/')
})

router.post('/complete', async (req, res) => {
    const badge = await Badge.findById(req.body.id);

    badge.complete = true;
    await badge.delete();

    res.redirect('/');
})

module.exports = router;