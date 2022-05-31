const db = require("./models");
const date = require("./utils/date");
(async () => {
  console.log("before start");

  try {
    let receipt = await db.receipts.findOne();
    console.log(date(receipt.datenew));
  } catch (error) {
    console.log(error);
  }

  console.log("after start");
})();
