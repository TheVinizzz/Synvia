import {Router} from "express"
import { CreateTaskController } from "../modules/tasks/useCases/createTasks/CreateTaskController"
import { GetAllTasksController } from "../modules/tasks/useCases/getAllTasks/GetAllTasksController"
import { EditTasksController } from "../modules/tasks/useCases/editTasks/EditTasksController"
import { DeleteTasksController } from "../modules/tasks/useCases/deleteTasks/DeleteTasksController"

const createTaskController = new CreateTaskController()
const getAllTaskController = new GetAllTasksController()
const editTasksController = new EditTasksController()
const deleteTasksController = new DeleteTasksController()

const tasksRoutes = Router()

tasksRoutes.post('/', createTaskController.handle)
tasksRoutes.get('/', getAllTaskController.handle)
tasksRoutes.put('/', editTasksController.handle)
tasksRoutes.delete('/:id', deleteTasksController.handle)

export {tasksRoutes}