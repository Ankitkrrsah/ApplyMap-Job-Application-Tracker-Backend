import * as companyService from "../services/company.service.js";

export const createCompany = async (req, res, next) => {
  try {
    const company = await companyService.createCompany(req.body);
    res.status(201).json(company);
  } catch (err) {
    next(err);
  }
};

export const getCompanies = async (req, res, next) => {
  try {
    const companies = await companyService.getCompanies();
    res.json(companies);
  } catch (err) {
    next(err);
  }
};
