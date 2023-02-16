const mongoose = require("mongoose");
const uuid = require('uuid');

const connection = mongoose.createConnection(
  "mongodb://localhost:27017/mycollection"
);

(async () => {

  const houseSchema = new mongoose.Schema({
      name: {type: String ,required: true},
      photos: [String],
      status: {type: String},
    }
     , {optimisticConcurrency: true}
    )
    
  const HouseConnection = await connection.model('House', houseSchema);

  const houseName = uuid.v4();
  mongoose.set('debug', true);

  await HouseConnection.insertMany([
      {
          name: houseName,
          photos: ["photo1", "photo2", "photo3"],
          status: "status1",
      }
  ])

  // copy paste mongoose doc. example
  const house = await HouseConnection.findOne({ name: houseName });
  if (house.photos.length < 2) {
    throw new Error('House must have at least two photos!');
  }

  const house2 = await HouseConnection.findOne({ name: houseName });
  house2.photos = [];
  house2.status = 'DECLINED'; // overwritten 
  await house2.save();

  // Marks the house as 'APPROVED' even though it has 0 photos!
  // btw did not overwrite the empty arrow but still set new field..?
  house.status = 'APPROVED'; // saves it despite condition not being fulfilled
  await house.save();
  console.log("updated everything - no locking issue");
})();