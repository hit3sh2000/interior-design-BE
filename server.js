require("dotenv").config();
require('./models/db');                       //import MONGODB connction files
const express = require('express');                      // import  express
const cors = require('cors')

const authRoute = require('./routes/authRoute');    // import  userController                        
const productRoute = require('./routes/productRoute');    // import  userController                        
const app = express()                                    //Asigning express    

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');                        //simple route for hello World
});


//  setting router 
app.use('/auth', authRoute);
app.use('/product', productRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Port is running on http://localhost:${PORT}`));
