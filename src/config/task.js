const periodicity = {
  onePerDay: "0 0 0 * * *",
  onePerHour: "00 59 * * * *",
  onePerMinute: "* * * * *",
  atTwoAm: "0 0 2 * * *",
  everyFiveMinutes: "*/5 * * * *",
  everyTwelve: "0 0 12 * * *",
  everyThirtyMinutes: "30/5 * * * *",
  everyTwentyMinutes: "20/5 * * * *",
  everyFiveSeconds: "*/5 * * * * *",
};

exports.getPeriodicity = () => {
  return periodicity.everyFiveSeconds;
};
exports.getPeriodicityUnCheckAllOrders = () => {
  return periodicity.everyFiveMinutes;
};

exports.getPeriodicityMasters = () => {
  return periodicity.atTwoAm;
};
