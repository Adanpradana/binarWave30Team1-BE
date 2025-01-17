const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function login(req, res) {
  const { Username, Password } = req.body;
  try {
    if (!Username)
      return res.status(401).json({ msg: "user cannot be empty!" });
    if (!Password)
      return res.status(401).json({ msg: "password cannot be empty!" });
    const user = await prisma.user.findUnique({
      where: {
        Username,
      },
    });
    if (!user) return res.status(401).json({ msg: "user not found ea kaka !" });
    const compare = await bcrypt.compare(Password, user.Password);
    if (!compare)
      return res
        .status(200)
        .json({ auth: false, message: "password doesnt match" });
    const token = jwt.sign(
      {
        id: user.id,
        Username: user.Username,
        Biodata: user.Biodata,
        City: user.City,
      },
      process.env.TOKEN,
      {
        expiresIn: "7d",
      },
      (err, token) => {
        res.status(200).json({
          auth: true,
          status: "authorized",
          token,
        });
      }
    );
  } catch (error) {
    res.send(error.message);
  }
}
module.exports = login;
