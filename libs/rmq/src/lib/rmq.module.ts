import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqService } from './rmq.service';

interface RmqModuleOptions {
  name: string;
}

@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync({
          clients:[
            {
              name,
              useFactory: (configService: ConfigService) => {
                
                const url = configService.get<string>('RABBIT_MQ_URI') || '';
                const queue = configService.get<string>(`RABBIT_MQ_${name}_QUEUE`);
                console.log('RabbitMQ module initiated');
                console.log(url);
                console.log(`${`RABBIT_MQ_${name}_QUEUE`}:${queue}`);

                return{
                  transport: Transport.RMQ,
                  options: {
                    urls: [url],
                    queue
                  },
                }
              },
              inject: [ConfigService],
            },
          ],
        }),
      ],
      exports: [ClientsModule],
    };
  }
}