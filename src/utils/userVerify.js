import jwt from "jsonwebtoken";

const userVerify = (req, res, next) => {
  try {
    const value =
      req.cookies.accessToken || req.headers.authorization.split(" ")[1];

    if (!value) {
      res.send("Invalid Access Token");
    }

    var decoded = jwt.verify(value, process.env.accees_token_secrat);
    req.user = decoded._id;
    next();
  } catch (error) {
    res.send("error occure user verify");
  }
};

export { userVerify };
