import { Test, TestingModule } from "@nestjs/testing";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

describe("AppController", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();
  });

  describe("getHello", () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(TaskController);
      // expect(appController.getHello()).toBe("Hello World!");
    });
  });
});
