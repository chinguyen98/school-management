import { InputType, Field, ID } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class AssignStudentsToLessonInput {
    @Field(type => ID)
    @IsUUID()
    lessonId: string;

    @Field(type => [ID])
    @IsUUID("4", { each: true })
    studentIds: string[];
}