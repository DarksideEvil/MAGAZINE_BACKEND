const DRESSMODEL = require('../dress/dress.model');
const TECHMODEL = require('../electronic/gadget.model');
const FOODMODEL = require('../food/food.model');

const IPhone = async (req, res) => {
    try {        
        const IPhone = await TECHMODEL.aggregate([
            {
                $match: {
                    $text: {$search: "iphone, apple"},
                    type: "phone"
                }
            }
        ]);
        res.status(200).json(IPhone);
    } catch (err) {
        return res.send(err.message);
    }
}

const Tablet = async (req, res) => {
    try {        
        const tablet = await TECHMODEL.aggregate([
            {
                $match: {
                    $text: {$search: "tablet, ipad, планшет"},
                    type: "tablet"
                }
            }
        ]);
        res.status(200).json(tablet);
    } catch (err) {
        return res.send(err.message);
    }
}

const TV = async (req, res) => {
    try {        
        const tv = await TECHMODEL.aggregate([
            {
                $match: {
                    $text: {$search: "tv, smart tv, телевизор"},
                    type: "tv"
                }
            }
        ]);
        res.status(200).json(tv);
    } catch (err) {
        return res.send(err.message);
    }
}

const Galaxy = async (req, res) => {
    try {        
        const galaxy = await TECHMODEL.aggregate([
            {
                $match: {
                    $text: {$search: "galaxy, samsung, Самсунг"}
                }
            }
        ]);
        res.status(200).json(galaxy);
    } catch (err) {
        return res.send(err.message);
    }
}

const Notebook = async (req, res) => {
    try {        
        const notebook = await TECHMODEL.aggregate([
            {
                $match: {
                    $text: {$search: "laptop, notebook, macbook, computer, pc, ноутбук, Макбук, ПК"},
                    type: "computer"
                }
            }
        ]);
        res.status(200).json(notebook);
    } catch (err) {
        return res.send(err.message);
    }
}



const Lacoste = async (req, res) => {
    try {        
        const lacoste = await DRESSMODEL.aggregate([
            {
                $match: {
                    $text: {$search: "lacoste, Лакосте"},
                    category: "dress"
                }
            }
        ]);
        res.status(200).json(lacoste);
    } catch (err) {
        return res.send(err.message);
    }
}

const Polo = async (req, res) => {
    try {        
        const polo = await DRESSMODEL.aggregate([
            {
                $match: {
                    $text: {$search: "polo, поло"},
                    category: "dress"
                }
            }
        ]);
        res.status(200).json(polo);
    } catch (err) {
        return res.send(err.message);
    }
}

const Rebook = async (req, res) => {
    try {        
        const rebook = await DRESSMODEL.aggregate([
            {
                $match: {
                    $text: {$search: "rebook"},
                    category: "dress"
                }
            }
        ]);
        res.status(200).json(rebook);
    } catch (err) {
        return res.send(err.message);
    }
}

const Converse = async (req, res) => {
    try {        
        const converse = await DRESSMODEL.aggregate([
            {
                $match: {
                    $text: {$search: "converse, конверс, Конверсы"},
                    category: "dress"
                }
            }
        ]);
        res.status(200).json(converse);
    } catch (err) {
        return res.send(err.message);
    }
}

const Adidas = async (req, res) => {
    try {        
        const adidas = await DRESSMODEL.aggregate([
            {
                $match: {
                    $text: {$search: "adidas"},
                    category: "dress"
                }
            }
        ]);
        res.status(200).json(adidas);
    } catch (err) {
        return res.send(err.message);
    }
}


const Cofee = async (req, res) => {
    try {        
        const cofee = await FOODMODEL.aggregate([
            {
                $match: {
                    $text: {$search: "cofee, kofe, кофе"},
                    category: "food", type: 'cofee'
                }
            }
        ]);
        res.status(200).json(cofee);
    } catch (err) {
        return res.send(err.message);
    }
}

const Fries = async (req, res) => {
    try {        
        const fries = await FOODMODEL.aggregate([
            {
                $match: {
                    $text: {$search: "fries, картошка фри, french fries, картофель фри"},
                    category: "food", type: 'fries'
                }
            }
        ]);
        res.status(200).json(fries);
    } catch (err) {
        return res.send(err.message);
    }
}

const Pizza = async (req, res) => {
    try {        
        const pizza = await FOODMODEL.aggregate([
            {
                $match: {
                    $text: {$search: "pizza, пицца, pitsa"},
                    category: "food", type: 'pizza'
                }
            }
        ]);
        res.status(200).json(pizza);
    } catch (err) {
        return res.send(err.message);
    }
}

const Kebab = async (req, res) => {
    try {        
        const kebab = await FOODMODEL.aggregate([
            {
                $match: {
                    $text: {$search: "kebab, шашлык, shashlik"},
                    category: "food", type: 'kebab'
                }
            }
        ]);
        res.status(200).json(kebab);
    } catch (err) {
        return res.send(err.message);
    }
}

const Sushi = async (req, res) => {
    try {        
        const sushi = await FOODMODEL.aggregate([
            {
                $match: {
                    $text: {$search: "sushi, суши"},
                    category: "food", type: 'sushi'
                }
            }
        ]);
        res.status(200).json(sushi);
    } catch (err) {
        return res.send(err.message);
    }
}

module.exports = {
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
}