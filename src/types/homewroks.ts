import type { GroupsType } from "./groups";
import type { HomeworkSubmissionsType } from "./homework-submissions";
import type { TeachersType } from "./teachers";

export interface HomeworksType{
    id?: number;
    teacher: TeachersType;
    group: GroupsType;
    description: string;
    deadline: string;
    homework_submission: HomeworkSubmissionsType;
    created_at: string;
    updated_at: string;
}