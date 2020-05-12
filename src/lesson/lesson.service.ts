import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>
    ) { }

    async createLesson(name: string, startDate: string, endDate: string): Promise<Lesson> {
        const lesson = this.lessonRepository.create({
            name,
            startDate,
            endDate,
            id: uuidv4(),
        });

        return this.lessonRepository.save(lesson);
    }
}
