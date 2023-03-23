const db = require('../config/connection');
const { User, Mod } = require('../models');
const userData = require('./userData.json');
const modData = require('./modData.json');
const bcrypt = require('bcrypt');

async function hashPasswords() {
    const saltRounds = 10;
    for (let user of userData) {
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
}

db.once('open', async () => {
    await User.deleteMany({});
    await Mod.deleteMany({});

    await hashPasswords();

    const users = await User.insertMany(userData);
    const mods = await Mod.insertMany(modData);

    console.table(users);
    console.table(mods);
    console.log('Seeding Complete');
    process.exit(0);
})