const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ashfaaqahamed17:MAgVHWNiEdo3Asi5@primarycluster.gzwu4jd.mongodb.net/Ifonix_DB"
  )
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
