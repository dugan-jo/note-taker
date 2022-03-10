const uuid = require('./uuid');
const note = require('./note')




// MIDDLEWARE - - - - - - - - - - - - - - - -
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
// MIDDLEWARE - - - - - - - - - - - - - - - -


module.exports = {
    uuid,
    note,
}