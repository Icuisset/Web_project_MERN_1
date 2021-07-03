/* eslint-disable quotes */
const jwt = require("jsonwebtoken");

const handleAuthError = (res) => {
  res.status(401).send({ message: "Authorisation Error" });
};

const extractBearerToken = (header) => header.replace("Bearer ", "");

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorisation } = req.headers;

  if (!authorisation || !authorisation.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorisation);
  let payload;

  try {
    payload = jwt.verify(token, "super-strong-secret");
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // adding the payload to the Request object

  next(); // passing the request further along
};
