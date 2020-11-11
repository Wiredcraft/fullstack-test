import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { UploadModule } from "src/upload.module";
import { MyLogger } from "src/middlewares/logger/logger.service";
import { BizExceptionFilter } from "./filters/biz-exception.filter";
import { NormalizeResponseInterceptor } from "./interceptors/normalize-response.interceptor";

(async () => {
    const app = await NestFactory.create(UploadModule, {
        logger: false,
    });
    const microservice = app.connectMicroservice({
      transport: Transport.TCP,
      options: {
        host: process.env.UPLOAD_MICROSVC_HOST,
        port: process.env.UPLOAD_MICROSVC_PORT
      }
    });

    app.useLogger(app.get(MyLogger));
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new BizExceptionFilter());
    app.useGlobalInterceptors(new NormalizeResponseInterceptor());

    const options = new DocumentBuilder()
      .setTitle('Ligntning Talks Upload Server')
      .setDescription('The Ligntning Talks Upload Server API Test Panel')
      .setVersion('0.0.1')
      .addTag('lightning-talk-upload')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-front', app, document);

    app.startAllMicroservicesAsync();
    await app.listen(process.env.UPLOAD_HTTP_PORT, process.env.UPLOAD_MICROSVC_HOST);
})();
