require("dotenv").config();
let express = require("express");
const {transporter,mailOption} = require("./services/emailServices");
require("./config/modelConfig");
const mainRouter = require("./routes/mainRoutes")
const logger=require("./utils/logger");

let app = express();
const PORT = process.env.PORT || 7000;
const HOST = "localhost";


app.get("/send", async (req, res) => {
  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent succesfully" + info.response);
    }
  });
});

app.use(express.json());
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port:${process.env.PORT}`);
  logger.info(`Server staterd and running on http://${HOST}:${PORT}`);
});
