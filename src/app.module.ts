import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Form, FormSchema } from './app.entity';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          uri: `mongodb+srv://sonlele2000:wherefuture@kgm-qr.6nlzq.mongodb.net/
`,
        };
      },
    }),
    MongooseModule.forFeature([{ name: Form.name, schema: FormSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
