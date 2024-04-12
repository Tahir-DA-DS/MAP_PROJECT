const customerData = require("../model/customerData");
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs')

const createData = async (req, res) => {
  try {
    const {
      applicationNo,
      customerName,
      customerAddress,
      customerTelephone,
      customerEmail,
      city,
      district,
      zone,
      mapVendorId,
    } = req.body;

    const existingUser = await customerData.findOne({ applicationNo });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Customer Application Data already exists" });
    }
    const mapNumber = generateMapNumber(mapVendorId);
    
    const newCustomerData = new customerData({
      applicationNo,
      customerName,
      customerAddress,
      customerTelephone,
      customerEmail,
      city,
      district,
      zone,
      mapVendorId,
      mapNumber
    });

    const savedUser = await newCustomerData.save();

    let responseData = {
      applicationNo: savedUser.applicationNo,
      mapVendorId: savedUser.mapVendorId,
      mapNumber,
    };
    
    res.status(201).json(responseData);
  } catch (error) {
    res
    .status(500)
    .json({ message: "Error saving customer details", error: error.message });
  }
};

function generateMapNumber(mapVendorId) {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  const timestamp = `${day}${month}${year}`;
  const randomPart = `S${Math.floor(Math.random() * 900) + 100}`;
  return `${mapVendorId}-${timestamp}-${randomPart}`;
}


const getallCustomer = async (req, res) => {
  try {
    const allCustomers = await customerData.find();
    res.status(200).json(allCustomers);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getOneCustomer = async (req, res) => {
  try {
    const customer = await customerData.findOne({
      applicationNo:req.params.applicationNo,
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const customerDownload = async(req, res) =>{
  try {
    const customers = await customerData.find({});

    const csvWriter = createObjectCsvWriter({
        path: './customer_data.csv',
        header: [
            { id: 'applicationNo', title: 'Application No' },
            { id: 'customerName', title: 'Name' },
            { id: 'customerEmail', title: 'Email' },
            { id: 'customerAddress', title: 'Address' },
            { id: 'customerTelephone', title: 'Telephone' },
            { id: 'city', title: 'City' },
            { id: 'district', title: 'District' },
            { id: 'zone', title: 'Zone' },
            { id: 'mapVendorId', title: 'Vendor ID' },
            { id: 'mapNumber', title: 'MAP Number' }
        ]
    });

    await csvWriter.writeRecords(customers);

    res.download('./customer_data.csv', 'customer_data.csv', (err) => {
        if (err) {
            console.error('Error sending file:', err);
        }
      
        fs.unlink('./customer_data.csv', (unlinkErr) => {
            if (unlinkErr) {
                console.error('Error deleting file:', unlinkErr);
            }
        });
    });
} catch (error) {
    console.error('Failed to download customer data:', error);
    res.status(500).json({ message: "Failed to process download request", error: error.message });
}
};


module.exports = { createData, getallCustomer, getOneCustomer, customerDownload};
