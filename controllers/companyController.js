const mongoose = require('mongoose');

const Company = require('../models/companyModel');
const User = require('../models/userModel');
const POC = require('../models/pocModel');
const Website = require('../models/websiteModel');
const { validationResult } = require('express-validator');

// Create a new company
const createCompany = async (req, res) => {
    try {
        const { name, website, phone, mobile, timeZone, address, POCs } = req.body;
        const owner = req.user._id;

        const company = await Company.create({
            name,
            website,
            phone,
            mobile,
            timeZone,
            address,
            owner,
            users: [owner],
            POCs: POCs || [],
            websites: []
        });

        // Add company to the owner's list of companies
        await User.findByIdAndUpdate(owner, { $push: { companies: company._id } });

        res.status(201).json({ message: 'Company created successfully', company });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a company
const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const { name, website, phone, mobile, timeZone, address, POCs } = req.body;

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        // Only the owner can update the company
        // if (company.owner.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ error: 'You are not authorized to update this company' });
        // }

        company.name = name || company.name;
        company.website = website || company.website;
        company.phone = phone || company.phone;
        company.mobile = mobile || company.mobile;
        company.timeZone = timeZone || company.timeZone;
        company.address = address || company.address;
        company.POCs = POCs || company.POCs;

        await company.save();

        res.status(200).json({ message: 'Company updated successfully', company });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all companies, optionally filtered by user ID
const getAllCompanies = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;

        const query = search
            ? { name: { $regex: search, $options: 'i' } }
            : {};

        const companies = await Company.find(query)
            .populate('owner', 'name email')
            .populate('users', 'name email')
            .populate('POCs', 'name email phone mobile')
            .populate({
                path: 'websites',
                populate: {
                    path: 'POCs departments',
                }
            })
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .exec();

        const count = await Company.countDocuments(query);

        res.status(200).json({
            companies,
            totalPages: Math.ceil(count / Number(limit)),
            currentPage: Number(page),
            totalCompanies: count
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateCompanyStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      let company = await Company.findById(id);
      if (!company) {
        return res.status(400).json({ error: "Company not found" });
      }
  
      company.status = status;
      company = await company.save();
  
      res.status(200).json(company);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


// Get company details with associated data
const getCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        const company = await Company.findById(companyId)
            .populate('owner', 'name email')
            .populate('users', 'name email')
            .populate('POCs', 'name email phone mobile designation')
            .populate({
                path: 'websites',
                populate: {
                    path: 'POCs departments',
                    // populate: {
                    //     path: 'smtp'
                    // }
                }
            });

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete a company
const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        // Only the owner can delete the company
        if (company.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You are not authorized to delete this company' });
        }

        await company.remove();

        // Remove the company from the owner's list of companies
        await User.findByIdAndUpdate(company.owner, { $pull: { companies: companyId } });

        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a user to a company
const addUserToCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const { userId } = req.body;

        const company = await Company.findById(companyId);
        const user = await User.findById(userId);

        if (!company || !user) {
            return res.status(404).json({ error: 'Company or user not found' });
        }

        if (company.users.includes(userId)) {
            return res.status(400).json({ error: 'User is already part of this company' });
        }

        company.users.push(userId);
        await company.save();

        user.companies.push(companyId);
        await user.save();

        res.status(200).json({ message: 'User added to company successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// In your companyController.js

const addPocToCompany = async (req, res) => {
    try {
      const companyId = req.params.id;
      const { designation, name, phone, email } = req.body;
  
      const company = await Company.findById(companyId);
  
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }
  
      const newPoc = await POC.create({ designation, name, phone, email, company: companyId });
      company.POCs.push(newPoc._id);
      await company.save();
  
      res.status(201).json({ message: 'POC added successfully', poc: newPoc });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    // other controller functions
    addPocToCompany,
  };
  

module.exports = {
    createCompany,
    getAllCompanies,
    getCompany,
    updateCompany,
    deleteCompany,
    addUserToCompany,
    updateCompanyStatus
};
