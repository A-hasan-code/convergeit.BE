
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connectDB");
const userRoutes = require("./routes/userRoutes")
const companyRoutes = require("./routes/companyRoutes")
const websiteRoutes = require("./routes/websiteRoutes")
const departmentRoutes = require("./routes/departmentRoutes")
const pocRoutes = require('./routes/pocRoutes');
const smtpRoutes = require('./routes/smtpRoutes');
const reportRoutes = require('./routes/reportRoutes');
const emailFromRoutes = require('./routes/emailFromRoutes');

const chatRoutes = require("./routes/chatRoutes")
const { swaggerSpec, swaggerUi } = require('./swaggerConfig');

const cloudinary = require('cloudinary').v2;
const cors = require("cors");



dotenv.config();
const app = express();
const PORT = process.env.PORT;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Corrected key here

  });
  // Allow all origins and handle credentials
const corsOptions = {
  origin: function (origin, callback) {
      callback(null, true);
  },
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};


//Middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());  
app.use(express.urlencoded({extended: true}));



//Routes
// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/website", websiteRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/chat", chatRoutes);
app.use('/api/poc', pocRoutes);
app.use('/api/smtp',smtpRoutes );
app.use('/api/reports',reportRoutes );
app.use('/api/email-from', emailFromRoutes);



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening at port: ${PORT}`)
    });
});



