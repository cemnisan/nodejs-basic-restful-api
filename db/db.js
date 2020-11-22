const mongoose = require('mongoose'); // --> Mongoose kütüphanesini import etme

module.exports = () =>{
    mongoose.connect(
        'mongodb+srv://cem:adsadsads1@saye.meex4.mongodb.net/saye?retryWrites=true&w=majority',
        {useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false}
    ) //--> MongoDB Atlas'tan aldığımız url
    mongoose.set('useCreateIndex',true)
    mongoose.connection.on('open', () =>{
        console.log('MongoDB: Connected')
    });
    mongoose.connection.on('error', () =>{
        console.log('MongoDB: Error')
    }); //--> Bağlantı kontrolleri
}