import jwt from "jsonwebtoken";

import getToken from "./get-token.js";

// middleware to validate token
const checkToken = (req, res, next) => {
  const secret = process.env.JWT_SECRET;

  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Access denied!" });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Access denied!" });
  }

  try {
    const verified = jwt.verify(token, secret);

    req.user = verified;

    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token!" });
  }
};

export default checkToken;
