const mongoose = require("mongoose");
const connection = mongoose.createConnection(
  "mongodb://localhost:27017/mycollection"
);

const house = new mongoose.Schema({
    name: {type: String ,required: true},
    photos: [String],
    status: {type: String},
  })
  
  const House = connection.model('House', house);

const houseName = "house1";

House.insertMany([
    {
        name: houseName,
        photos: ["photo1", "photo2", "photo3"],
        status: "status1",
    }
])

// const house = await House.findOne({ houseName });
// if (house.photos.length < 2) {
//   throw new Error('House must have at least two photos!');
// }

// console.log("test");

// const house2 = await House.findOne({ houseName });
// house2.photos = [];
// house2.save();

// // Marks the house as 'APPROVED' even though it has 0 photos!
// house.status = 'APPROVED';
// house.save();