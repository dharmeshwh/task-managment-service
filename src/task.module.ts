import { Module } from "@nestjs/common";
import { databaseProviders } from "./typeorm/configs/data-source";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [...databaseProviders, TaskService],
  exports: [...databaseProviders],
})
export class TaskModule {}
