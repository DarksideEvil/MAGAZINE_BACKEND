const router = require('express').Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const FRONT_URL = process.env.FRONT_URL;
const { logError } = require('../setting/logs/extraLogger');
const USERMODEL = require('../user/user.model');
const DRESSMODEL = require('../dress/dress.model');
const TECHMODEL = require('../electronic/gadget.model');
const FOODMODEL = require('../food/food.model');
const BOOKMODEL = require('../book/book.model');
const mongoose = require('mongoose');

router.post('/checkout', async (req, res) => {
  //generating new id and applying to client's bought product 
  var generatedId = new mongoose.Types.ObjectId();
  //prod - product which client sent
  const prod = req?.body?.product;
  //user - client information
  const user = req?.body?.org;
  //foundUser - finding client in database
  const foundUser = await USERMODEL.findOne({_id: user._id, email: user.email});
  //these are for get bought time then add 1 year all kind of product's guarantee
  let sana = new Date();
  let sana1 = new Date();
  let sana2 = new Date(sana1.setFullYear(sana1.getFullYear() + 1));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: prod?.title
          },
          unit_amount: prod?.itemTotal * 100
        },
        quantity: prod?.quantity
      }],
      success_url: FRONT_URL,
      cancel_url: FRONT_URL
    });

    if (prod.category === 'tech') {
      const foundProduct = await TECHMODEL.findOne({_id: prod?._id, title: prod?.title});
      foundProduct.count = foundProduct.count - prod.quantity,
      prod['guarantee'][0]._id = generatedId;
      prod['guarantee'][0].date = sana; 
      prod['guarantee'][0].term = sana2;
      delete prod?.id; delete prod?.available; delete prod?.count;
      prod.service = true; prod._id = generatedId;
      foundUser['expenses'].push(prod);
      await foundUser.save();
      await foundProduct.save();
    }

    if (prod.category === 'dress') {
      const foundProduct = await DRESSMODEL.findOne({_id: prod?._id, title: prod?.title});
      foundProduct.count = foundProduct.count - prod.quantity,
      delete prod?.id; delete prod?.available; delete prod?.count;
      prod._id = generatedId; foundUser['expenses'].push(prod);
      await foundUser.save();
      await foundProduct.save();
    }

    if (prod.category === 'food') {
      const foundProduct = await FOODMODEL.findOne({_id: prod?._id, title: prod?.title});
      foundProduct.count = foundProduct.count - prod.quantity,
      delete prod?.id; delete prod?.count;
      prod._id = generatedId; foundUser['expenses'].push(prod);
      await foundUser.save();
      await foundProduct.save();
    }

    if (prod.category === 'book') {
      const foundProduct = await BOOKMODEL.findOne({_id: prod?._id, title: prod?.title});
      foundProduct.count = foundProduct.count - prod.quantity,
      delete prod?.id; delete prod?.count;
      prod._id = generatedId; foundUser['expenses'].push(prod);
      await foundUser.save();
      await foundProduct.save();
    }
      
    res.status(200).send({url: session.url});
  } catch (err) {
    logError(err);
    res.status(500).send({error: err});
  }
});

module.exports = router;