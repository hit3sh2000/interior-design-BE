const mongoose = require('mongoose');
const url = 'mongodb+srv://root:1ot0iG6HPpq7CZfo@cluster0.hopsk.mongodb.net/interiordesign?retryWrites=true&w=majority'

//this is for connnecting MongoDB
mongoose.connect(url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

// requiring Schema            
require('./UserModel');
require('./CategoryModel');                         
require('./ProductModel');                         
require('./InteriorDesignerRequest');                         