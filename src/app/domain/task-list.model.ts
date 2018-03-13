export interface TaskList {
    id?: string;
    name: string;
    desc: string;
    order: number;
    taskIds: Array<String>;
    projectId: string;
    coverImg: string;
}