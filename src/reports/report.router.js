const router = require('express').Router();

const {
    IPhone,
    Tablet,
    TV,
    Galaxy,
    Notebook,

    Lacoste,
    Polo,
    Rebook,
    Converse,
    Adidas,

    Cofee,
    Fries,
    Pizza,
    Kebab,
    Sushi
} = require('./report');

const {
    byProductRemain,
    byExpensePenny
} = require('./statistic');

router.route('/byProductRemain').get(byProductRemain);

router.route('/byExpensePenny').get(byExpensePenny);

router.route('/iphone').get(IPhone);

router.route('/tablet').get(Tablet);

router.route('/tv').get(TV);

router.route('/samsung').get(Galaxy);

router.route('/pc').get(Notebook);


router.route('/lacoste').get(Lacoste);

router.route('/polo').get(Polo);

router.route('/rebook').get(Rebook);

router.route('/converse').get(Converse);

router.route('/adidas').get(Adidas);


router.route('/cofee').get(Cofee);

router.route('/fries').get(Fries);

router.route('/pizza').get(Pizza);

router.route('/kebab').get(Kebab);

router.route('/sushi').get(Sushi);

module.exports = router;