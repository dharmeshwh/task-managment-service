import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { handleHTTPResponse } from "./libs/http-response";
import AdminAuthenticationGuard from "./middlewares/admin-authentication-gaurd";
import AuthenticationGuard from "./middlewares/authentication-gaurd";
import { IVerifyTokenResponse } from "./middlewares/token-handler";
import { createTaskContract, updateTaskContract } from "./task.contract";
import { TaskService } from "./task.service";
import { TaskEntity } from "./typeorm/entities/task.entity";
import { Auth } from "./utils/decorator/auth-decorator";
import Vp from "./utils/joi-validation";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Admin route to create task
  @Post()
  @UseGuards(AdminAuthenticationGuard)
  createTask(@Body(Vp.for(createTaskContract)) task: Partial<TaskEntity>) {
    const res = this.taskService.createTask(task);
    return handleHTTPResponse(res);
  }

  // Admin route to update task
  @Put(":id")
  @UseGuards(AdminAuthenticationGuard)
  updateTask(
    @Param("id") id: string,
    @Body(Vp.for(updateTaskContract)) task: Partial<TaskEntity>
  ) {
    const res = this.taskService.updateTask(id, task);
    return handleHTTPResponse(res);
  }

  // Route to get all tasks assigned to user
  @Get("get-all")
  @UseGuards(AdminAuthenticationGuard)
  getAllTasks(
    @Query("isComplete") isComplete?: boolean,
    @Query("dueDate") dueDate?: string,
    @Query("priority") priority?: string
  ) {
    const res = this.taskService.getAllTasks(isComplete, dueDate, priority);
    return handleHTTPResponse(res);
  }

  // Route to get all tasks assigned to user
  @Get()
  @UseGuards(AuthenticationGuard)
  getTasks(@Auth() auth: IVerifyTokenResponse) {
    const res = this.taskService.getTasks(auth.userId);
    return handleHTTPResponse(res);
  }

  // Route to mark task completed
  @Put("mark-complete/:id")
  @UseGuards(AuthenticationGuard)
  markComplete(@Param("id") id: string, @Auth() auth: IVerifyTokenResponse) {
    const res = this.taskService.markCompleted(id, auth.userId);
    return handleHTTPResponse(res);
  }
}
