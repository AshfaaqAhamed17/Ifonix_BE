const { MongoClient } = require("mongodb");

let dbConnection;

module.exports = {
  connectToDb: function (cb) {
    MongoClient.connect(
      //   "mongodb://localhost:27017"
      "mongodb+srv://ashfaaqahamed17:MAgVHWNiEdo3Asi5@primarycluster.gzwu4jd.mongodb.net/Ifonix_DB"
    )
      .then((client) => {
        console.log("Connected to MongoDB");
        dbConnection = client.db();

        this.getDb = () => dbConnection;
        return cb();
      })
      .catch((err) => {
        console.log("DB PAGE - ", err);
        return cb(err);
      });
  },
  getDb: function () {
    return dbConnection;
  },
};
