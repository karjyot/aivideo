import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './ai/ai.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { VideoModule } from './video/video.module';
import { ScriptModule } from './script/script.module';
import { SceneModule } from './scene/scene.module';
import { ImageModule } from './image/image.module';
import { VoiceModule } from './voice/voice.module';
import { RendererModule } from './renderer/renderer.module';
import { MotionService } from './motion/motion.service';

@Module({
  imports: [AiModule,
        ConfigModule.forRoot(),

    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DB_HOST,
    //   port: 3306,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),

    VideoModule,

    ScriptModule,

    SceneModule,

    ImageModule,

    VoiceModule,

    RendererModule,
  ],
  controllers: [AppController],
  providers: [AppService, MotionService],
})
export class AppModule {}
