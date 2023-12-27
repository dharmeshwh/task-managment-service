import { Module } from "@nestjs/common";
import { databaseProviders } from "../typeorm/configs/data-source";
import { TaskService } from "../task.service";
import { TaskController } from "../task.controller";
import { EventsModule } from "./events.module";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Module({
  imports: [EventsModule],
  controllers: [TaskController],
  providers: [...databaseProviders, TaskService, EventEmitter2],
  exports: [...databaseProviders],
})
export class AppModule {}
