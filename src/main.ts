import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT, 10) || 8080;
  const config = new DocumentBuilder()
    .setTitle('Sprint')
    .setDescription('Sprint 프로젝트를 위한 API 문서')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  Logger.log(`Server is running on http://localhost:${port}`, 'Bootstrap');
  Logger.log(
    `Swagger Document is running on http://localhost:${port}/api`,
    'SwaggerDocument',
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
