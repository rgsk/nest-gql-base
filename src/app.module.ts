import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceModule } from './invoice/invoice.module';
import { CustomerModule } from './customer/customer.module';
import ormconfig from './config/ormconfig';
import { NoteModule } from './note/note.module';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    InvoiceModule,
    CustomerModule,
    NoteModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
