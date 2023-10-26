import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "@prisma/client";



@Controller('tasks')
export class TaskController {

    constructor(private readonly taskService:TaskService){}


    @Get()
    async getAllTasks(){
        return this.taskService.getAllTasks()
    }

    @Post()
    async createTask(@Body() data:Task){
        return this.taskService.createTask(data)
    }

    @Get(':id')
    async getTaskById(@Param('id') id:string){
        const task = await this.taskService.getTaskById(Number(id))
        if(!task) throw new NotFoundException('Tasks does not exists')
        return task;
    }

    @Delete(':id')
    async deleteTaskById(@Param('id') id:string){
        try {
            return await this.taskService.deleteTask(Number(id))
        } catch (error) {
            throw new NotFoundException("Task could not be deleted")
        }
    }

    @Put(':id')
    async updateTask(@Param('id') id:string, @Body() data:Task){
        return this.taskService.updateTask(Number(id),data)
    }

}