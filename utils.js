//Body Parser
exports.parseBody = (req, callback) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const parsedBody = JSON.parse(body);
    callback(parsedBody);
  });
};
