import { Module } from "@nestjs/common";
import { TaskEventListener } from "../events/task-event-listner";

@Module({
  providers: [TaskEventListener],
})
export class EventsModule {}
