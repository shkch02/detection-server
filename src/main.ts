import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() { //비동기 작업 예정 선언
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000); //서버 실행시켜 클라이언트 요청 발을 준비, 기본 포트 3000  
}
bootstrap(); //실행시작
