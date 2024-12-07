import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    findAll(): Promise<Task[]>;
    findOne(id: string): Promise<Task>;
    create(task: Partial<Task>): Promise<Task>;
    update(id: string, task: Partial<Task>): Promise<Task>;
    remove(id: string): Promise<void>;
}
