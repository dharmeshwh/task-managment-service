import Joi from "@hapi/joi";
import { EPriortyTypes } from "./utils/common-constant";

const createTaskContract = Joi.object({
  userId: Joi.string().uuid().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string().allow(EPriortyTypes, null),
  dueDate: Joi.date(),
});

const updateTaskContract = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string().allow(EPriortyTypes, null),
  dueDate: Joi.date(),
  userId: Joi.string().uuid(),
});

export { createTaskContract, updateTaskContract };
