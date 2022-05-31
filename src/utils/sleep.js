module.exports = (time) => {
  if (!time) time = 5;
  console.log(`El microservicio dormira por ${time}sg`);

  return new Promise((resolve) => setTimeout(resolve, time));
};
