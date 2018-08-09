import jwt from 'jsonwebtoken';
const secret = process.env.SECRET || 'rawsecret';

export const inputValidator = (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /^\w+([.-_]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send({ message: "Invalid email entered" })
  } else if (password.length < 6) {
    return res.status(400).send({ message: "Invalid password length" })
  }
  next()
}

export const authenticate = (req, res, next) => {
  const jwtToken = req.headers.authorization;
  if (!jwtToken) {
    return res.status(401).send({ message: "Invalid request" })
  }
  jwt.verify(jwtToken, secret, (error, decoded) => {
    if(error) {
      return res.status(401).send({ message: 'Invalid Token' });
    }
    req.decoded = decoded;
  })
  next()
}

export const verifyOwner = (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.decoded;
  if (id === userId) {
    next();
  } else {
    res.status(400).send({
      success: false,
      message: 'Not authenticated as owner'
    });
  }
}
