import prisma from "../models/prismaClient.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

// helpers
import createUserToken from "../helpers/create-user-token.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    // validations
    if (!name) {
      res.status(422).json({ message: "Name is required!" });

      return;
    }

    if (!email) {
      res.status(422).json({ message: "E-mail is required!" });

      return;
    }

    if (!phone) {
      res.status(422).json({ message: "Phone is required!" });

      return;
    }

    if (!password) {
      res.status(422).json({ message: "Password is required!" });

      return;
    }

    if (!confirmpassword) {
      res.status(422).json({ message: "Confirm passoword is required!" });

      return;
    }

    if (password !== confirmpassword) {
      res.status(422).json({ message: "Passwords do not match" });

      return;
    }

    // check if user exists
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      res.status(422).json({ message: "This email already exists!" });

      return;
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user object
    const user = {
      name,
      email,
      phone,
      password: passwordHash,
    };

    try {
      // create user on database
      const newUser = await prisma.user.create({
        data: user,
        select: {
          id: true,
          name: true,
        },
      });

      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "E-mail is required" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "Password is required!" });
      return;
    }

    // check if user exist
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      res.status(422).json({ message: "User not found!" });
      return;
    }

    // check if password match with db password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ message: "Invalid password!" });
      return;
    }

    await createUserToken(user, res, res);
  }

  static async checkUser(req, res) {
    const secret = process.env.JWT_SECRET;

    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, secret);

      currentUser = await prisma.user.findFirst({
        where: { id: decoded.id },
      });

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    const user = await prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(422).json({ message: "User not found!" });

      return;
    }

    res.status(200).json({ user });
  }

  static async editUser(req, res) {
    const id = req.params.id;

    // check if user exists
    const token = getToken(req);
    const user = await getUserByToken(token);

    const { name, email, phone, password, confirmpassword } = req.body;

    if (req.file) {
      user.image = req.file.filename;
    }

    // validations
    if (!name) {
      res.status(422).json({ message: "Name is required!" });

      return;
    }

    user.name = name;

    if (!email) {
      res.status(422).json({ message: "E-mail is required!" });

      return;
    }

    // check if email has already taken
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (user.email !== email && userExists) {
      res.status(422).json({ message: "This email is already registered!" });

      return;
    }

    user.email = email;

    if (!phone) {
      res.status(422).json({ message: "Phone is required!" });

      return;
    }

    user.phone = phone;

    if (password !== confirmpassword) {
      res.status(422).json({ message: "Passwords do not match" });

      return;
    } else if (password === confirmpassword && password != null) {
      // create password
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      user.password = passwordHash;
    }

    try {
      // return user updated data
      await prisma.user.update({ data: user, where: { id } });

      res.status(200).json({ message: "User seccessfully updated!" });
    } catch (error) {
      res.status(500).json({ message: error });

      return;
    }
  }
}
