import * as appService from "../services/application.service.js";

export const createApplication = async (req, res, next) => {
  try {
    const app = await appService.createApplication(req.user.id, req.body);
    res.status(201).json(app);
  } catch (err) {
    next(err);
  }
};

export const getApplications = async (req, res, next) => {
  try {
    const apps = await appService.getApplicationsByUser(req.user.id);
    res.json(apps);
  } catch (err) {
    next(err);
  }
};

export const getApplication = async (req, res, next) => {
  try {
    const app = await appService.getApplicationById(
      req.user.id,
      req.params.id
    );

    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(app);
  } catch (err) {
    next(err);
  }
};

export const updateApplication = async (req, res, next) => {
  try {
    const app = await appService.updateApplication(
      req.user.id,
      req.params.id,
      req.body
    );

    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(app);
  } catch (err) {
    next(err);
  }
};

export const deleteApplication = async (req, res, next) => {
  try {
    await appService.deleteApplication(req.user.id, req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
