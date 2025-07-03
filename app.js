require('dotenv').config();
const express= require('express');
const app = express();
const path = require('path');
const { logger, logEvents } = require('./middleware/logger');
const { successResponse, errorResponse } = require('./middleware/apiResponse');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3050;
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

app.use(logger);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/",express.static(path.join(__dirname,"/public")));

app.use("/",require("./routes/root"));
app.use((req, res) => {
  if (req.accepts('html')) {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.status(404).json({ error: '404 Not Found' });
  } else {
    res.status(404).type('txt').send('404 Not Found');
  }
});
app.use(errorResponse);

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));