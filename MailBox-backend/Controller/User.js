const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postSignUp = (req, res, next) => {
  const body = req.body;
 
  const email = body.email;
  const password = body.password;

  let obj = { email: email, password: password };

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (user) {
        res.status(201).json({ status: "User Already Exist" });
      } else {
        bcrypt.hash(obj.password, 10, async (err, passw) => {
          if (err) console.log(err);
          obj.password = passw;
          User.create(obj)

            .then(async (data) => {
              res.json({ status: "SignUp Successfull" });
            })

            .catch((err) => {
              console.log(err);
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  //res.json({id:2})
};

exports.postLogin = async (req, res, next) => {
  obj = { email: req.body.email, password: req.body.password };
  try {
    const user = await User.findOne({ where: { email: obj.email } });

    if (!user) {
      res.status(404).json({ error: "User don't Exists" });
    } else {
      bcrypt.compare(obj.password, user.password, async (err, response) => {
        if (err) throw new Error("Something went wrong");

        if (response) {
          const token = jwt.sign(
            { name: user.dataValues.name, id: user.dataValues.id },
            process.env.JWT_SECRET_KEY
          );
          //console.log(token)
          res.json({ status: "Login Successfull", token: token });
        } else res.status(401).json({ error: "Invalid Password" });
      });
    }
  } catch (err) {
    console.log(err);
  }
};
