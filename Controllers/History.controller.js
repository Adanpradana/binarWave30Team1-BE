const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postHistory = async (req, res) => {
  const { user_id, result_game, recent_game, recent_score } = req.body;

  try {
    const create = await prisma.historyGame.create({
      data: {
        user_id,
        result_game,
        recent_game,
        recent_score,
      },
    });
    if (!create) {
      return res.status(400).json({
        meta: {
          code: "400_002",
          message: "failed create data",
        },
      });
    }
    res.status(200).json({
      meta: {
        code: "200_002",
        message: "success create data",
      },
      data: create,
    });
  } catch (error) {
    res.status(500).json({
      meta: {
        code: "400_002",
        message: error.message,
      },
    });
  }
};

const getHistory = async (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    return res
      .status(200)
      .json({ message: "play the game to make history", data: [] });
  }
  try {
    const getHistory = await prisma.historyGame.findMany({
      where: {
        user_id,
      },
    });
    if (!getHistory) {
      return res.status(400).json({
        meta: {
          code: "400_002",
          message: "bad request",
        },
      });
    }
    res.status(200).json({
      meta: {
        code: "200_003",
        message: "succes get data history id",
      },
      data: getHistory,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        code: "500_002",
        message: error.message,
      },
    });
  }
};

module.exports = {
  postHistory,
  getHistory,
};
