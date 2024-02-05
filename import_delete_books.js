const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const Book = require("./models/bookModel");

// Connect to DB
const dbURL = process.env.DATABASE_URL;

async function main() {
    await mongoose.connect(dbURL);
    console.log("Database connected");
}
main().catch((err)=>console.log(err.message));
// JSON data
const meals = fs.readFileSync("./dev-data/books.json", "utf-8");

const importData = async () => {
    try {
        await Book.create(JSON.parse(meals));
        console.log("Data imported");
    } catch (err) {
        console.log(err.message);
    }
}

// importData();

const deleteData = async () => {
    try {
        await Book.deleteMany();
        console.log("Data deleted");
    } catch (err) {
        console.log(err.message);
    }
}


if(process.argv[2] === "--import"){
    importData();
}else if(process.argv[2] === "--delete"){
    deleteData();
}