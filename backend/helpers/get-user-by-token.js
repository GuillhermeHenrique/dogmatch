import jwt from "jsonwebtoken";

import prisma from "../models/prismaClient.js";

// get user by jwt token
const getUserByToken = async (token) => {
  const secret = process.env.JWT_SECRET;

  if (!token) {
    return res.status(401).json({ message: "Acess denied!" });
  }

  const decoded = jwt.verify(token, secret);

  const userId = decoded.id;

  const user = await prisma.user.findFirst({ where: { id: userId } });

  return user;
};

export default getUserByToken;
