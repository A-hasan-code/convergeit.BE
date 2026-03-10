const mongoose = require('mongoose');
const User = require('./models/userModel');
const Company = require('./models/companyModel');
const POC = require('./models/pocModel');
const Website = require('./models/websiteModel');
const SMTP = require('./models/smptpModel');
const SMTP_CONFIGS = require('./models/smtpConfigModel');
const DepartmentEmail = require('./models/departmentEmailModel');
// const Lead = require('./models/leadModel');
const Chat = require('./models/chatModel');

const mongoURI = 'mongodb+srv://amoondavid:7MlsnCQWCkS7ow8I@cluster0.145jgzx.mongodb.net/converg_db_test?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const seedData = async () => {
  // Clear existing data
  const websites = await Website.find({ title: { $exists: false } });

  for (const website of websites) {
      website.title = `Default Title ${website._id}`; // You can customize the default title format
      await website.save();
  }

  console.log('Websites updated successfully'); 

  console.log('Sample data inserted');
  mongoose.connection.close();
};

seedData();
