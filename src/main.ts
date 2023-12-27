import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    await app.listen(4000);

    Logger.log(`~ Application is running on: ${await app.getUrl()}`);
  } catch (error: any) {
    Logger.error(`~ Ouch, something went wrong: ${error.message}`);
  }
}
bootstrap();
