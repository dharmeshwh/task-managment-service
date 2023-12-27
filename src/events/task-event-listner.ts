import { Injectable, OnModuleInit } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";

@Injectable()
export class TaskEventListener implements OnModuleInit {
  onModuleInit() {
    this.listenToTaskCompletedEvent();
  }

  @EventPattern("task.completed")
  handleTaskCompletedEvent(payload: { taskId: string; userId: string }) {
    // Handle the task completed event
    console.log(`Task ${payload.taskId} completed for user ${payload.userId}`);
  }

  private listenToTaskCompletedEvent() {
    // Additional logic for handling the task completed event
  }
}
