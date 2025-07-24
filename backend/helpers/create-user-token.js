import jwt from "jsonwebtoken";

const createUserToken = async (user, req, res) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({ message: "JWT secret is not defined!" });

    return;
  }

  // create token
  const token = jwt.sign(
    {
      name: user.name,
      id: user.id,
    },
    secret
  );

  // return token
  res.status(200).json({
    message: "You have been authenticated!",
    token: token,
    userId: user.id,
  });
};

export default createUserToken;
