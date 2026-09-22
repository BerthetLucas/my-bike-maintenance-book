import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(private readonly repo: AppRepository) {}

  async getHello(): Promise<string> {
    const myWord = 'Hello World';

    await this.repo.insert(myWord);

    const { name } = await this.repo.findByName(myWord);

    return name;
  }
}
