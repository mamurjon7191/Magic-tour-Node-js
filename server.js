const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app.js');

const port = process.env.PORT;
app.listen(port, '127.0.0.1');

// console.log(app.get('env')); //-->qaysi environmentdagiligino korsatadi
// console.log(process.env); //-->glabal ozgaruvchilar royhati
