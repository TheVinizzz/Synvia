import { getAllUsers } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const fetchUsers = () => getAllUsers()

  return useQuery<{id: string, name: string}[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

export default useUsers;