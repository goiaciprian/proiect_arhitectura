import client, { Connection, Channel, ConsumeMessage } from 'amqplib';
import { ILogger } from './logger';
import { Console } from 'inspector';
import { randomUUID } from 'crypto';

export class RabbitMQConnection<I, O> {
    private connection!: Connection;
    private channel!: Channel;
    private connected: boolean = false;

    constructor(private readonly logger: ILogger | Console = console) { }

    async connect(username: string, password: string, host: string, port: number = 5672) {
        if (this.connected && this.channel) return;
        else this.connected = true;

        try {
            this.logger.log(`Se conecteaza la RabbitMq`);
            this.connection = await client.connect(
                `amqp://${username}:${password}@${host}:${port}`
            );

            this.logger.log(`RabbitMq conectat`);

            this.channel = await this.connection.createChannel();

            this.logger.log(`Canalul pentru RabbitMq a fost creat`);
        } catch (error) {
            console.error(error);
            this.logger.error(`Nu s-a putut conecta la RabbitMq`);
        }
    }
    async sendToQueue(queue: string, message: I) {
        try {
          // const uuid = randomUUID();
          if (!this.channel) {
            throw new Error('Channel null');
          }
    
          this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

    private async consume(queue: string, id: string, cb: (response: O) => void) {
      await this.channel.assertQueue(queue, {
        // coada nu o sa se stearga daca rabbit crashes
        durable: true,
      });

      this.channel.consume(queue, (msg) => {
        if(msg) {
          const message = JSON.parse(msg.content.toString());
          cb(message);
          this.channel.ack(msg);
        }
      }, {
        consumerTag: id
      })
    }

    async getMessage(queue: string) {
      const id = randomUUID();
      return await new Promise<O | null>((resolve) => {
        // asteptam pentru 5s pentru primirea mesajului daca nu rezolvam promisiunea cu null
        const timout = setTimeout(() => {
          clearTimeout(timout);
          this.channel.cancel(id);
          resolve(null)
        }, 5_000);
        this.consume(queue, id, (response) => {
          clearTimeout(timout);
          this.channel.cancel(id);
          resolve(response)});
      });
    }

    async close() {
      await this.channel.close();
      await this.connection.close();
    }
}