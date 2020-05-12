import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>
    ) { }

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate } = createLessonInput;
        const lesson = this.lessonRepository.create({
            name,
            startDate,
            endDate,
            id: uuidv4(),
        });

        return this.lessonRepository.save(lesson);
    }

    async getLesson(id: string): Promise<Lesson> {
        return this.lessonRepository.findOne({ id });
    }

    async getLessons(): Promise<Lesson[]> {
        return this.lessonRepository.find();
    }
}
