const connection = require("./connection");

const getAll = () => {
  const list = connection.execute();
};