const http = require("http");
const url = require("url");
const usersControl = require("./usersControl.js");
const productsControl = require("./productsControl.js");

const port = process.env.PORT || 3030;

const handleError = (res, code) => {
  res.statusCode = code;
  res.end(`{error: "${http.STATUS_CODES[code]}"}`);
};

// --------------------------------------
// handle users requests
// --------------------------------------
const handleUsersRequest = (req, res) => {
  const method = req.method;
  switch (method) {
    case "GET": {
      return usersControl.getUsers(req, res);
    }
    case "POST": {
      return usersControl.addUser(req, res);
    }
    case "PUT": {
      return usersControl.updateUser(req, res);
    }
    case "DELETE": {
      return usersControl.deleteUser(req, res);
    }
    default:
      return res.end(`we are in server ${method} which has no handle function`);
  }
};
// --------------------------------------
// handle products requests
// --------------------------------------
const handleProductsRequest = (req, res) => {
  const method = req.method;
  switch (method) {
    case "GET": {
      return productsControl.getProducts(req, res);
    }
    case "POST": {
      return productsControl.addProduct(req, res);
    }
    default:
      return res.end(`we are in server ${method} which has no handle function`);
  }
};
// --------------------------------------
// send requests to the relevant handler
// --------------------------------------
const handleServerRequest = (req, res) => {
  const { path } = url.parse(req.url);
  if (path.startsWith("/user")) {
    return handleUsersRequest(req, res);
  } else if (path.startsWith("/product")) {
    return handleProductsRequest(req, res);
  } else {
    return handleError(res, 404);
  }
};

const server = http.createServer(handleServerRequest);

server.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
