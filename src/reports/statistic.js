const USERS = require('../user/user.model');
const BOOKS = require('../book/book.model');
const DRESS = require('../dress/dress.model');
const DEVICE = require('../electronic/gadget.model');
const FOODS = require('../food/food.model');

//byProductRemain - to find all products in database
const byProductRemain = async (req, res) => {
    try {
        let dress = await DRESS.aggregate([
            {
                $group: {_id: {title: "$title", type: "$type", category: "$category", qty: "$count", price: "$price"}}
            }
        ]);
        for (let j of dress) {
            j['title'] = j._id.title,
            j['type'] = j._id.type,
            j['category'] = j._id.category,
            j['qty'] = j._id.qty,
            j['price'] = j._id.price
            delete j._id;
        }

        let devices = await DEVICE.aggregate([
            {
                $group: {_id: {title: "$title", type: "$type", category: "$category", qty: "$count", price: "$price"}}
            }
        ]);
        for (let k of devices) {
            k['title'] = k._id.title,
            k['type'] = k._id.type,
            k['category'] = k._id.category,
            k['qty'] = k._id.qty,
            k['price'] = k._id.price
            delete k._id;
        }

        let books = await BOOKS.aggregate([
            {
                $group: {_id: {title: "$title", type: "$type", category: "$category", qty: "$count", price: "$price"}}
            }
        ]);
        for (let l of books) {
            l['title'] = l._id.title,
            l['type'] = l._id.type,
            l['category'] = l._id.category,
            l['qty'] = l._id.qty,
            l['price'] = l._id.price
            delete l._id;
        }

        let foods = await FOODS.aggregate([
            {
                $group: {_id: {title: "$title", type: "$type", category: "$category", qty: "$count", price: "$price"}}
            }
        ]);
        for (let f of foods) {
            f['title'] = f._id.title,
            f['type'] = f._id.type,
            f['category'] = f._id.category,
            f['qty'] = f._id.qty,
            f['price'] = f._id.price
            delete f._id;
        }
        const body = {
            dress,
            books,
            devices,
            foods
        }
        res.status(200).json(body);
    } catch (err) {
        return res.status(500).send(err);
    }
}

//byExpensePenny - to get statistics, sales, profit, which kind of and how much product sold out
const byExpensePenny = async (req, res) => {
    try {
        let productInfo = await USERS.aggregate([
            {$unwind: "$expenses"},
            {
                $group: {_id: {title: "$expenses.title", type: "$expenses.type", category: "$expenses.category"},
                    total: {$sum: "$expenses.itemTotal"}, qty: {$sum: "$expenses.quantity"}
                }
            },
            {$sort: {total: 1}}
        ]);

        let totalPrice = 0;
        for (let i of productInfo) {
            totalPrice += i.total;
            i['title'] = i._id.title;
            i['type'] = i._id.type;
            i['category'] = i._id.category;
            delete i._id;
        }
        productInfo.push({totalPrice: totalPrice});
        res.status(200).json(productInfo);
    } catch (err) {
        return res.status(500).send(err);
    }
};

module.exports = {
    byProductRemain,
    byExpensePenny
}