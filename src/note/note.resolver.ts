import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Info } from '@nestjs/graphql';
import { getProjection } from 'src/helpers/utils';
import { NoteModel } from './note.model';
import { NoteService } from './note.service';

@Resolver(() => NoteModel)
export class NoteResolver {
  constructor(@Inject(NoteService) private notesService: NoteService) {}

  @Query(() => [NoteModel])
  async getNotes(@Info() info): Promise<NoteModel[]> {
    const fields = getProjection(info);
    console.log(fields)
    return this.notesService.getNotes(fields);
  }

  @Mutation(() => NoteModel)
  async createNote(@Args('text') text: string): Promise<NoteModel> {
    return await this.notesService.createNote(text);
  }
  @Mutation(() => String)
  async updateNote(@Args('id') id: string, @Args('text') text: string) {
    return this.notesService.updateNote(id, text);
  }
  @Mutation(() => String)
  async deleteNote(@Args('id') id: string) {
    return this.notesService.deleteNote(id);
  }
}
