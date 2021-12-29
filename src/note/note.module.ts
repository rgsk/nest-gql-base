import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { NoteModel } from './note.model';
import { NoteService } from './note.service';
import { NoteResolver } from './note.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([NoteModel])],
  providers: [NoteService, NoteResolver],
  exports: [NoteService],
})
export class NoteModule {}
