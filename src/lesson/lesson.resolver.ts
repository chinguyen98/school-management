import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { LessonType } from "./lesson.type";
import { LessonService } from "./lesson.service";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { StudentService } from "src/student/student.service";

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService,
    ) { }

    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string,
    ): Promise<Lesson> {
        return this.lessonService.getLesson(id);
    }

    @Query(returns => [LessonType])
    lessons() {
        return this.lessonService.getLessons();
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput
    ): Promise<Lesson> {
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput
    ) {
        return this.lessonService.assignStudentsToLesson(assignStudentsToLessonInput);
    }

    @ResolveField()
    students(@Parent() lesson: Lesson) {
        return this.studentService.getManyStudents(lesson.students);
    }
}