import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import HttpResponse from "./libs/http-response";
import { IVerifyTokenResponse } from "./middlewares/token-handler";
import { TaskEntity } from "./typeorm/entities/task.entity";

@Injectable()
export class TaskService {
  constructor(
    private readonly eventEmitter: EventEmitter2 // Inject the EventEmitter
  ) {}

  async createTask(task: Partial<TaskEntity>) {
    try {
      await TaskEntity.save(task);

      return HttpResponse.created("task created");
    } catch (error: any) {
      return HttpResponse.error(error.message);
    }
  }

  async updateTask(id: string, task: Partial<TaskEntity>) {
    try {
      await TaskEntity.update(id, task);

      return HttpResponse.success("task updated");
    } catch (error: any) {
      return HttpResponse.error(error.message);
    }
  }

  async getTasks(userId: string) {
    try {
      const tasks = await TaskEntity.find({
        where: {
          userId,
        },
        select: [
          "id",
          "priority",
          "isComplete",
          "description",
          "dueDate",
          "title",
        ],
        order: {
          dueDate: "DESC",
        },
      });

      return HttpResponse.success(tasks);
    } catch (error: any) {
      return HttpResponse.error(error.message);
    }
  }

  async getAllTasks(isComplete?: boolean, dueDate?: string, priority?: string) {
    try {
      const where: any = {};

      if (isComplete !== undefined) {
        where.isComplete = isComplete;
      }

      if (dueDate) {
        where.dueDate = dueDate;
      }

      if (priority) {
        where.priority = priority;
      }

      const tasks = await TaskEntity.find({
        where,
      });

      return HttpResponse.success(tasks);
    } catch (error: any) {
      return HttpResponse.error(error.message);
    }
  }

  async markCompleted(id: string, userId: string) {
    try {
      const task = await TaskEntity.findOne({
        where: {
          id,
          userId,
        },
      });

      if (!task) {
        return HttpResponse.notFound("not task found");
      }

      if (task.isComplete) {
        return HttpResponse.error("task is already marked as completed");
      }

      task.isComplete = true;

      // Emmiting event so that user can consume it.
      this.eventEmitter.emit("task.completed", {
        taskId: task.id,
        userId,
      });

      await task.save();

      return HttpResponse.success("marked as completed");
    } catch (error: any) {
      return HttpResponse.error(error.message);
    }
  }
}
