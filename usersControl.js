const users = require("./users");
const url = require("url");
const utils = require("./utils");

exports.getUsers = (req, res) => {
  if (!Object.keys(users).length) {
    throw new Error("the users list is empty");
  }
  res.end(JSON.stringify(users));
};

exports.addUser = (req, res) => {
  utils.parseBody(req, (newUser) => {
    if (!newUser.name || !newUser.age || !newUser.id) {
      throw new Error("the data is invalid");
    }

    for (let user in users) {
      if (parseInt(users[user].id) === parseInt(newUser.id)) {
        throw new Error("the user id is taken");
      }
    }

    users["user" + newUser.id] = newUser;

    return res.end(JSON.stringify(users));
  });
};

exports.deleteUser = (req, res) => {
  const query = url.parse(req.url, true).query;
  const userIndex = query.id;
  if (!userIndex || !users["user" + userIndex]) {
    throw new Error("the id is invalid");
  }
  delete users["user" + userIndex];
  res.end(JSON.stringify(users));
};

exports.updateUser = (req, res) => {
  const query = url.parse(req.url, true).query;
  const userId = query.id;
  utils.parseBody(req, (newUser) => {
    if (!newUser.name || !newUser.age || !newUser.id) {
      throw new Error("the data is invalid");
    }

    if (!users["user" + userId] || !users["user" + newUser.id]) {
      throw new Error("the id is invalid");
    }

    users["user" + userId] = newUser;
    return res.end(JSON.stringify(users));
  });
};
