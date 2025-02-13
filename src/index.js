const express = require('express');
const { PrismaClient } = require('./generated/client');
const bodyParser = require('body-parser');
const app = express();
const prisma = new PrismaClient();
const apiRoutes = require('./routes/api');
const cors = require('cors')


app.use(cors({
    origin: 'http://localhost:5173'
}));
//   Xử lý JSON data
app.use(bodyParser.json());
//  // Xử lý x-www-form-urlencoded data
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', apiRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
