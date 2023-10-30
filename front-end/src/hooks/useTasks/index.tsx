import { getAllTasks } from "@/services/tasks";
import { ITask } from "@/services/tasks/types";
import { useQuery } from "@tanstack/react-query";

const useTasks = () => {
  const fetchTasks = () => getAllTasks()

  return useQuery<ITask[], Error>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
};

export default useTasks;