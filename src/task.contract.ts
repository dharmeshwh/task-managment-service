import Joi from "@hapi/joi";
import { EPriortyTypes } from "./utils/common-constant";

const createTaskContract = Joi.object({
  userId: Joi.string().uuid().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string()
    .valid(EPriortyTypes.LOW, EPriortyTypes.MED, EPriortyTypes.HIGH)
    .required(),
  dueDate: Joi.date().required(),
});

const updateTaskContract = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string().valid(
    EPriortyTypes.LOW,
    EPriortyTypes.MED,
    EPriortyTypes.HIGH
  ),
  dueDate: Joi.date(),
  userId: Joi.string().uuid(),
});

export { createTaskContract, updateTaskContract };
