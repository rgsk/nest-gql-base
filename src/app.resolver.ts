import { Inject } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { AppService } from './app.service';

export class AppResolver {
  constructor(@Inject(AppService) private appService: AppService) {}

  @Query(() => String)
  async getHello() {
    return this.appService.getHello();
  }
}
