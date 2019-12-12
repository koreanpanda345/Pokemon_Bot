const db = require('quick.db');

module.exports = class DbInit{
    run(){
        this.addItem("rare candy", 1000, "Leveling", 1);
    }

    addItem(item, price, section, i){
        db.set(`store_${section}_${i}`, {item : item, price: price});
    }
}