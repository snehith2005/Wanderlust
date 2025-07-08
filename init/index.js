const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
const initDB = async () => {
  await Listing.deleteMany({});

  const updatedData = initData.data.map((obj) => ({
    ...obj,
    owner: '686421e652e7555954e8d159'
  }));

  await Listing.insertMany(updatedData);

  console.log("✅ Data was initialized with owner field.");
};


initDB();