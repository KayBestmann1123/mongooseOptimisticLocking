const mongoose = require("mongoose");
const connection = mongoose.createConnection(
  "mongodb://localhost:27017/mycollection"
);

(async () => {

  const houseSchema = new mongoose.Schema({
      name: {type: String ,required: true},
      photos: [String],
      status: {type: String},
    })
    
  const HouseConnection = await connection.model('House', houseSchema);

  const houseName = "house1";

  await HouseConnection.insertMany([
      {
          name: houseName,
          photos: ["photo1", "photo2", "photo3"],
          status: "status1",
      }
  ])

  // copy paste mongoose doc. example
  const house = await HouseConnection.findOne({ houseName });
  if (house.photos.length < 2) {
    throw new Error('House must have at least two photos!');
  }

  const house2 = await HouseConnection.findOne({ houseName });
  house2.photos = [];
  house2.save();

  // Marks the house as 'APPROVED' even though it has 0 photos!
  house.status = 'APPROVED';
  house.save();
})();