const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { Email, Username, Password, Total_score, Biodata, City, image_url } =
    req.body;
  try {
    const hashedPassword = await bcrypt.hash(Password, 12);
    const player = await prisma.user.create({
      data: {
        Email,
        Username,
        Password: hashedPassword,
        Total_score,
        Biodata,
        City,
        image_url,
      },
    });
    // validasi body kosong
    if (!Email || !Username) {
      return res.status(404).json({
        result: "Failed",
        message: "username or email cannot empty",
      });
    }
    if (!Password) {
      return res.status(404).json({
        result: "Failed",
        message: "password cannot be empty",
      });
    }
    res.status(200).json({
      message: "success create data !",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

async function getPlayers(req, res, next) {
  try {
    const players = await prisma.user.findMany();

    if (!players) {
      return res.status(400).json({
        result: "error",
        message: "Tidak ada data",
      });
    }
    res.status(200).json({
      result: "Success",
      payload: players,
    });
  } catch (error) {
    next(error);
  }
}

async function getPlayerById(req, res, next) {
  const { id } = req.params;
  try {
    const players = await prisma.user.findUnique({
      where: { id },
    });
    if (!players) {
      return res.status(400).json({
        result: "users not found!",
      });
    }
    res
      .status(200)
      .json({ message: "success get player by id", data: players });
  } catch (error) {
    next(error); // notes res.status(500)
  }
}

async function updatePlayer(req, res, next) {
  try {
    const { id } = req.params;
    const { Email, Username, Password, Total_score, Biodata, City } = req.body;
    //pastiin data yang dikirim objek/
    const updateData = await prisma.user.update({
      where: { id },
      data: {
        Email,
        Username,
        Total_score,
        Biodata,
        City,
      },
    });

    res.status(200).json({
      result: "Success",
      message: `User with id = ${id} berhasil di update`,
      data: updateData,
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateImage(req, res) {
  const { id } = req.params;
  try {
    const { image_url } = req.body;
    const update = await prisma.user.update({
      where: {
        id,
      },
      data: {
        image_url,
      },
    });
    res.status(200).json({ message: "success change profile picture" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function deletePlayer(req, res, next) {
  const { id } = req.params;
  try {
    const players = await prisma.user.delete({
      where: {
        id: +id, //parsing string to number
      },
    });
    if (!players) {
      res.status(400).json({ msg: "cannot delete!" });
    }
    res.status(200).json({ msg: "success delete players!" });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
}

module.exports = {
  getPlayers,
  updatePlayer,
  deletePlayer,
  getPlayerById,
  register,
  updateImage,
};
