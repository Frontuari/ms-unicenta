const { execSync } = require("child_process");

module.exports = (time) => {
  if (!time) time = 5;
  console.log(`El microservicio dormira por ${time}sg`);
  execSync(`sleep 30`);
  console.log(`El microservicio desperto despues de ${time}sg`);
};
