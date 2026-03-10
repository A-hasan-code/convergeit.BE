const DepartmentEmail = require('../models/departmentEmailModel');
const Website = require('../models/websiteModel');
const Company = require('../models/companyModel');

const mongoose = require('mongoose');
const sendEmail = require('../utils/sendTestEmail');

// Create a new department
const createDepartment = async (req, res) => {
    try {
        const { emailsTo, emailsCc, emailsBcc, departmentName, websiteId, subjectLine, emailFrom,sendTestEmail,crmIntegration } = req.body;

        if (!mongoose.Types.ObjectId.isValid(websiteId)) {
            return res.status(400).json({ error: 'Invalid website ID' });
        }

        const website = await Website.findById(websiteId).populate({
            path: 'smtp',
            populate: { path: 'smtpConfigs' }
        });
        if (!website) {
            return res.status(404).json({ error: 'Website not found' });
        }

        const department = await DepartmentEmail.create({
            emailsTo,
            emailsCc,
            emailsBcc,
            departmentName,
            website: websiteId,
            subjectLine,
            emailFrom,
            crmIntegration

        });

        website.departments.push(department._id);
        await website.save();

        if (sendTestEmail) {
            const smtpConfig = website?.smtp?.smtpConfigs;

            if (smtpConfig) {
                await sendEmail(smtpConfig, emailFrom, emailsTo, emailsCc, emailsBcc);
            } else {
                console.error('SMTP configuration not found.');
            }
        }

        res.status(201).json({ message: 'Department created successfully', department });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get all departments
// Get all departments
const getAllDepartments = async (req, res) => {
    try {
        const { search, websiteId, page = 1, limit = 10 } = req.query;

        // Construct the query object
        let query = {};
        if (search) {
            query.departmentName = { $regex: search, $options: 'i' };
        }
        if (websiteId) {
            query.website = websiteId;
        }

        const departments = await DepartmentEmail.find(query)
            .populate({
                path: 'website',
                select: 'url company',
                populate: {
                    path: 'company',
                    select: '_id'
                }
            })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalDepartments = await DepartmentEmail.countDocuments(query);
        const totalPages = Math.ceil(totalDepartments / limit);

        res.status(200).json({
            departments,
            totalDepartments,
            totalPages
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// Get a department by ID

const getDepartment = async (req, res) => {
    try {
        const departmentId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(departmentId)) {
            return res.status(400).json({ error: 'Invalid department ID' });
        }

        const department = await DepartmentEmail.findById(departmentId)
            .populate('website', 'url smtp') // Include SMTP config
            .populate({
                path: 'website',
                populate: {
                    path: 'smtp',
                    populate: { path: 'smtpConfigs' }
                }
            });

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        // Fetch the company associated with the website
        const company = await Company.findById(department.website.company);

        res.status(200).json({ ...department.toObject(), company }); // Include the company in the response
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a department
// Update a department

const updateDepartment = async (req, res) => {
    try {
        const departmentId = req.params.id;
        const { emailsTo, emailsCc, emailsBcc, departmentName, websiteId, subjectLine, emailFrom, sendTestEmail, crmIntegration } = req.body;

        if (!mongoose.Types.ObjectId.isValid(departmentId)) {
            return res.status(400).json({ error: 'Invalid department ID' });
        }

        const department = await DepartmentEmail.findById(departmentId);

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        // Update department fields
        department.emailsTo = emailsTo || department.emailsTo;
        department.emailsCc = emailsCc || department.emailsCc;
        department.emailsBcc = emailsBcc || department.emailsBcc;
        department.departmentName = departmentName || department.departmentName;
        department.subjectLine = subjectLine || department.subjectLine;
        department.emailFrom = emailFrom || department.emailFrom;
        department.website = websiteId || department.website;
        department.crmIntegration = crmIntegration || department.crmIntegration;

 
        const website = await Website.findById(department.website).populate({
            path: 'smtp',
            populate: { path: 'smtpConfigs' }
        });

        if (!website) {
            return res.status(404).json({ error: 'Website not found' });
        }

        await department.save();

        if (sendTestEmail) {
            const smtpConfig = website?.smtp?.smtpConfigs;

            if (smtpConfig) {
                await sendEmail(smtpConfig, emailFrom, emailsTo, emailsCc, emailsBcc);
            } else {
                console.error('SMTP configuration not found.');
            }
        }

        res.status(200).json({ message: 'Department updated successfully', department });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Delete a department
const deleteDepartment = async (req, res) => {
    try {
        const departmentId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(departmentId)) {
            return res.status(400).json({ error: 'Invalid department ID' });
        }

        const department = await DepartmentEmail.findById(departmentId);
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        await department.deleteOne();

        // Remove the department from the website's list of departments
        await Website.findByIdAndUpdate(department.website, { $pull: { departments: departmentId } });

        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getWeeklyDepartmentSales = async (req, res) => {
    try {
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        const salesDepartments = await DepartmentEmail.aggregate([
            { 
                $match: { 
                    departmentName: 'Sales',
                    createdAt: { $gte: startOfWeek, $lte: endOfWeek } // Match departments created in the current week
                } 
            },
            {
                $group: {
                    _id: { $dayOfWeek: '$createdAt' }, // Group by the day of the week of department creation
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    dayOfWeek: '$_id',
                    count: 1
                }
            },
            { $sort: { dayOfWeek: 1 } }
        ]);

        const dailySales = Array(7).fill(0);
        salesDepartments.forEach(sale => {
            dailySales[sale.dayOfWeek - 1] = sale.count;
        });

        res.status(200).json(dailySales);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createDepartment,
    getAllDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment,
    getWeeklyDepartmentSales
};
  
module.exports = {
    createDepartment,
    getAllDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment,
    getWeeklyDepartmentSales
};
