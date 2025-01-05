import jwt from "jsonwebtoken";

const decodeKey = (key) => {
  return new Promise((resolve, reject) => {
    jwt.verify(key, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err || !decoded) return reject(false);

      resolve(decoded);
    });
  });
};

export function validateAuthKey(req, res, next) {
  try {
    const bearerHeader = req.headers["authorization"];
    const authToken = bearerHeader.split(" ");
    if (!bearerHeader || authToken.length !== 2 || authToken[0] !== "Bearer")
      return res.status(401).json({ error: "Invalid auth key" });
    const authKey = authToken[1];
    if (!authKey) return res.status(401).json({ error: "No auth key" });
    decodeKey(authKey)
      .then((decoded) => {
        if (!decoded || !decoded.id)
          return res.status(401).json({ error: "Invalid auth key" });
        req.user = decoded;
        next();
      })
      .catch((err) => {
        res.json({ error: "Invalid auth key" });
      });
  } catch (error) {
    return res.json({ error: "Invalid auth key" });
  }
}

export function validateAdmin(req, res, next) {
  try {
    const bearerHeader = req.headers["authorization"];
    const authToken = bearerHeader.split(" ");
    if (!bearerHeader || authToken.length !== 2 || authToken[0] !== "Bearer")
      return res.status(401).json({ error: "Invalid auth key" });
    const authKey = authToken[1];
    if (!authKey) return res.status(401).json({ error: "No auth key" });
    decodeKey(authKey)
      .then((decoded) => {
        if (!decoded || !decoded.id)
          return res.status(401).json({ error: "Invalid auth key" });
        if (!decoded.isAdmin) {
          return res
            .status(401)
            .json({ error: "NOT AUTHORIZED IN THIS ROUTE" });
        }
        req.user = decoded;
        next();
      })
      .catch((err) => {
        res.status(401).json({ error: "Invalid auth key" });
      });
  } catch (e) {
    console.error(e);
    return res.status(401).json({ error: "Invalid auth key" });
  }
}

// middlewares/auth.js

// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     console.log(token);

//     const user = jwt.verify(token, process.env.TOKEN_SECRET);
//     //console.log(user)

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "No token provided" });
//   }
// };
