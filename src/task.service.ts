import { Injectable } from "@nestjs/common";
import HttpResponse from "./libs/http-response";
import { TaskEntity } from "./typeorm/entities/task.entity";

@Injectable()
export class TaskService {
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
        return HttpResponse.error("task is already mark as completed");
      }

      task.isComplete = true;
      await task.save();

      return HttpResponse.success("marked as completed");
    } catch (error: any) {
      return HttpResponse.error(error.message);
    }
  }
}
