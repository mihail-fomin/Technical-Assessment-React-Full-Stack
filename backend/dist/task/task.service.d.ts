import { Repository } from 'typeorm';
import { Task } from './entities/task.entity.js';
export declare class TaskService {
    private taskRepository;
    constructor(taskRepository: Repository<Task>);
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task>;
    create(task: Partial<Task>): Promise<Task>;
    update(id: number, task: Partial<Task>): Promise<Task>;
    remove(id: number): Promise<void>;
}
