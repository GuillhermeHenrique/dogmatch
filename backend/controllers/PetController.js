import prisma from "../models/prismaClient.js";

// helpers
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class PetController {
  static async create(req, res) {
    const { name, age, weight, color } = req.body;

    const images = req.files;

    const available = true;

    // validations
    if (!name) {
      res.status(422).json({ message: "Name is required!" });

      return;
    }

    if (!age) {
      res.status(422).json({ message: "Age is required!" });

      return;
    }

    const parsedAge = parseInt(age);

    if (!weight) {
      res.status(422).json({ message: "Weight is required!" });

      return;
    }

    const parsedWeight = parseInt(weight);

    if (!color) {
      res.status(422).json({ message: "Color is required!" });

      return;
    }

    if (!images || images.length === 0) {
      res.status(422).json({ message: "Image is required!" });

      return;
    }

    // get pet owner
    const token = getToken(req);
    const user = await getUserByToken(token);

    // create a pet
    const pet = {
      name,
      age: parsedAge,
      weight: parsedWeight,
      color,
      available,
      userId: user.id,
    };

    try {
      const newPet = await prisma.pet.create({ data: pet });

      await Promise.all(
        images.map((image) => {
          const petImage = {
            url: image.filename,
            petId: newPet.id,
          };

          return prisma.petImage.create({ data: petImage });
        })
      );

      res.status(201).json({ message: "Pet successfully registered!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const pets = await prisma.pet.findMany({
        orderBy: { createdAt: "desc" },
      });

      res.status(200).json({ pets });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllUserPets(req, res) {
    // get user by token
    const token = getToken(req);
    const user = await getUserByToken(token);

    try {
      const pets = await prisma.pet.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      });

      res.status(200).json({ pets });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllUserAdoptions(req, res) {
    // get user by token
    const token = getToken(req);
    const user = await getUserByToken(token);

    try {
      const pets = await prisma.pet.findMany({
        where: { adoptedById: user.id },
      });

      res.status(200).json({ pets });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getPetById(req, res) {
    const id = req.params.id;

    // check if pet exists
    const pet = await prisma.pet.findFirst({ where: { id } });

    if (!pet) {
      res.status(404).json({ message: "Pet not found!" });

      return;
    }

    res.status(200).json({ pet });
  }

  static async removePetById(req, res) {
    const id = req.params.id;

    // check if pet exists
    const pet = await prisma.pet.findFirst({ where: { id } });

    if (!pet) {
      res.status(404).json({ message: "Pet not found!" });

      return;
    }

    // check if logged in user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.userId.toString() !== user.id.toString()) {
      res
        .status(422)
        .json({ message: "There was a problem, please try again later!" });

      return;
    }

    try {
      await prisma.pet.delete({ where: { id } });

      res.status(200).json({ message: "Pet successfully removed!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updatePet(req, res) {
    const id = req.params.id;

    const { name, age, weight, color, available } = req.body;

    const images = req.files;

    // check if pet exists
    const pet = await prisma.pet.findFirst({ where: { id } });

    if (!pet) {
      res.status(404).json({ message: "Pet not found!" });

      return;
    }

    // check if logged in user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.userId.toString() !== user.id.toString()) {
      res
        .status(422)
        .json({ message: "There was a problem, please try again later!" });

      return;
    }

    // validations
    if (!name) {
      res.status(422).json({ message: "Name is required!" });

      return;
    }

    if (!age) {
      res.status(422).json({ message: "Age is required!" });

      return;
    }

    const parsedAge = parseInt(age);

    if (!weight) {
      res.status(422).json({ message: "Weight is required!" });

      return;
    }

    const parsedWeight = parseInt(weight);

    if (!color) {
      res.status(422).json({ message: "Color is required!" });

      return;
    }

    if (!images || images.length === 0) {
      res.status(422).json({ message: "Image is required!" });

      return;
    }

    // create a updated pet
    const updatedPet = {
      name,
      age: parsedAge,
      weight: parsedWeight,
      color,
      available,
    };

    try {
      const newPet = await prisma.pet.update({
        data: updatedPet,
        where: { id },
      });

      await prisma.petImage.deleteMany({ where: { petId: id } });

      await Promise.all(
        images.map((image) => {
          const petImage = {
            url: image.filename,
            petId: newPet.id,
          };

          return prisma.petImage.create({ data: petImage });
        })
      );

      res.status(200).json({ message: "Pet successfully updated!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async schedule(req, res) {
    const id = req.params.id;

    // check if pet exists
    const pet = await prisma.pet.findFirst({
      where: { id },
      include: {
        user: {
          select: {
            phone: true,
            name: true,
          },
        },
      },
    });

    if (!pet) {
      res.status(404).json({ message: "Pet not found!" });

      return;
    }

    // check if user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.userId.toString() === user.id.toString()) {
      res
        .status(422)
        .json({ message: "You cannot schedule a visit with your own pet!" });

      return;
    }

    // check if user has already scheduled a visit
    if (pet.adoptedById) {
      if (pet.adoptedById.toString() === user.id.toString()) {
        res.status(422).json({
          message: "You already have a visit scheduled for this animal!",
        });

        return;
      }
    }

    try {
      await prisma.pet.update({
        data: { adoptedById: user.id },
        where: { id },
      });

      res.status(200).json({
        message: `The visit was successfully scheduled, please contact ${pet.user.name} at ${pet.user.phone}`,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async concludeAdoption(req, res) {
    const id = req.params.id;

    // check if pet exists
    const pet = await prisma.pet.findFirst({ where: { id } });

    if (!pet) {
      res.status(404).json({ message: "Pet not found!" });

      return;
    }

    // check if logged in user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.userId.toString() !== user.id.toString()) {
      res
        .status(422)
        .json({ message: "There was a problem, please try again later!" });

      return;
    }

    try {
      await prisma.pet.update({ data: { available: false }, where: { id } });

      res.status(200).json({
        message:
          "Congratulations! The adoption cycle has been completed successfully.",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
