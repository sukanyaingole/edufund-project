const jwt = require("jsonwebtoken");
const jwtKey = "sukanyaissmart";
const jwtExpirySeconds = 3000000;

const signIn = (req, res) => {
  const { deviceDetails } = req.body;
  if (!deviceDetails) {
    return res.status(401).end();
  }

  // Create a new token with the device details in the payload
  // and which expires 3000000 seconds after issue
  const token = jwt.sign({ deviceDetails }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });

  // set the cookie as the token string, with a similar max age as the token
  // here, the max age is in milliseconds, so we multiply by 1000
  res.status(201).cookie("access_token", "Bearer " + token, {
    maxAge: jwtExpirySeconds * 1000,
    domain: "localhost:3000",
    path: "/",
  });
  res.status(200).json({ access_token: `Bearer ${token}` });
};

const verifyToken = (req, res) => {
  // We can obtain the session token from the requests cookies, which come with every request
  const token =
    req.cookies.access_token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];

  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return {
      success: false,
      status: 401,
    };
    // return res.status(401).end();
  }

  let payload;
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    const usableToken = token.replace("Bearer ", "");
    payload = jwt.verify(usableToken, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return {
        success: false,
        status: 400,
      };
    }
    // otherwise, return a bad request error
    return {
      success: false,
      status: 400,
    };
  }

  // Finally, return the welcome message to the user, along with their
  // username given in the token
  //   res.send(`Welcome ${payload.deviceDetails}!`);
  return {
    success: true,
    deviceDetails: payload.deviceDetails,
  };
};

module.exports = {
  signIn,
  verifyToken,
};
