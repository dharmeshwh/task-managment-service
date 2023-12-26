import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { handleHTTPResponse } from "./libs/http-response";
import AdminAuthenticationGuard from "./middlewares/admin-authentication-gaurd";
import AuthenticationGuard from "./middlewares/authentication-gaurd";
import { createTaskContract, updateTaskContract } from "./task.contract";
import { TaskService } from "./task.service";
import { TaskEntity } from "./typeorm/entities/task.entity";
import Vp from "./utils/joi-validation";

@Controller("tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(AdminAuthenticationGuard)
  createTask(@Body(Vp.for(createTaskContract)) task: Partial<TaskEntity>) {
    const res = this.taskService.createTask(task);
    return handleHTTPResponse(res);
  }

  @Put(":id")
  @UseGuards(AdminAuthenticationGuard)
  updateTask(
    @Param("id") id: string,
    @Body(Vp.for(updateTaskContract)) task: Partial<TaskEntity>
  ) {
    const res = this.taskService.updateTask(id, task);
    return handleHTTPResponse(res);
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  getTasks() {
    const res = this.taskService.getTasks("");
    return handleHTTPResponse(res);
  }

  @Put("mark-complete/:id")
  @UseGuards(AuthenticationGuard)
  markComplete(@Param("id") id: string) {
    const res = this.taskService.markCompleted(id, "");
    return handleHTTPResponse(res);
  }
}
