import { Info } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteModel } from './note.model';

export class NoteService {
  constructor(
    @InjectRepository(NoteModel)
    private noteRepository: Repository<NoteModel>,
  ) {}
  async getNotes(fields: (keyof NoteModel)[]): Promise<NoteModel[]> {
    const notes = await this.noteRepository.find({
      select: fields,
    });
    console.log(notes);
    return notes;
  }

  createNote(text: string): Promise<NoteModel> {
    return this.noteRepository.save({
      text,
    });
  }
  async updateNote(id: string, text: string) {
    const result = await this.noteRepository.update(id, { text });
    if (result.affected) {
      return 'updated successfully';
    }
    return 'update failed';
  }
  async deleteNote(id: string) {
    const result = await this.noteRepository.delete(id);
    if (result.affected) {
      return 'deleted successfully';
    }
    return 'deleted failed';
  }
}
