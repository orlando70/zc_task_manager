import taskService from '../services/task/Task.service.js';
import { sort, paginate } from '../utils/APIfeatures.js';

export default class TaskController {
  static async create(req, res, next) {
    try {
      // Request validation required

      const result = await taskService.create(req.body);
      return res.send(result.data);
    } catch (error) {
      next(error);
    }
  }

    static async getAllTask(req, res, next) {

        try {
            // Request validation required
            const result = await taskService.getAllTasks();
            if (!result?.data.data) { 
                return res.send({
                    message: "no result found"
                });
            } 
            const data = paginate(result?.data.data, req.query);
            // const sorted_data = sort(data.result, req.query);
            return res.status(200).send({
                message: "Tasks returned successfully",
                total_page: data.no_of_pages,
                current_page: data.page,
                page_limit: data.limit,
                data: data.result
            });
        } catch (error) {
            next(error);
        }
    }

    static async getTaskByMe(req, res, next) {
        try {
            const { user_id } = req.params;

            // Request validation required
            const result = await taskService.getTaskByMe({ task_creator: user_id });
            if (!result?.data.data) { 
                return res.send({
                    message: "no result found"
                });
            }
            const data = paginate(result?.data.data, req.query);
            const sorted_data = sort(data.result, req.query);
            console.log(sorted_data);
            return res.status(200).send({
                message: "Tasks returned successfully",
                total_page: data.no_of_pages,
                current_page: data.page,
                page_limit: data.limit,
                data: sorted_data
            });
        } catch (error) {
  next(error);
        }
    }

    static async createTaskCategory(req, res, next) {
        try {
        // Request validation required
            const result = await taskService.createTaskCategory(req.body);

            return res.send(result?.data);
        } catch (error) {
            next(error);
        }
    }

  static async assign(req, res, next) {
    try {
      // Request validation required
      const id = req.params.task_id;

      const result = await taskService.assign(id, req.body);

      return res.send(result?.data);
    } catch (error) {
      next(error);
    }
  }

  static async reassign(req, res, next) {
    try {
      // Request validation required
      const id = req.params.assigned_task_id;

      const result = await taskService.reassign(id, req.body);

      return res.send(result?.data);
    } catch (error) {
      next(error);
    }
  }
}
