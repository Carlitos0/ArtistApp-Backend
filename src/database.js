const mongoose = require("mongoose");

const { DB_USER,DB_PASSWORD,DB_CLUSTER,DB_NAME } = process.env;

(async () => {
    try {
        const dbURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;
        const db = await mongoose.connect(dbURI)
        console.log(`Connecto to ${db.connection.name}`);
    } catch (error) {
        console.log(error);
    }
})();