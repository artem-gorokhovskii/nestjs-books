import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    providers: [
        {
            provide: APP_PIPE,
            useFactory: () => new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
                transformOptions: {
                    enableImplicitConversion: true
                }
            })
        },
        {
            provide: APP_GUARD,
            useClass: ApiKeyGuard
        }
    ],
    imports: [
    TypeOrmModule.forRootAsync({
        useFactory: () => ({
            type: 'postgres', // type of our database
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadEntities: true, // models will be loaded automatically 
            synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
        })
      }),
      ConfigModule.forRoot({
          validationSchema: Joi.object({
            DATABASE_USER: Joi.string().required(),
            DATABASE_PASSWORD: Joi.string().required(),
            DATABASE_NAME: Joi.string().required(),
            DATABASE_PORT: Joi.number().required(),
            DATABASE_HOST: Joi.string().required(),
            API_KEY: Joi.string().required(),
            STATIC_PATH_FOR_FILES: Joi.string().required(),
            RELATIVE_WEB_PATH_FOR_FILES: Joi.string().required()
          })
      }),
      ServeStaticModule.forRoot({
        rootPath: process.env.STATIC_PATH_FOR_FILES,
        serveRoot: "/src",
      }),
    ]
})
export class CommonModule {}
