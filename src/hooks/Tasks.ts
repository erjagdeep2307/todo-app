import { useAuth } from "../context/AuthContext";
import type {
  CreateTaskFormData,
  Task,
} from "../features/todo/types/todo.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
// import { uploadCloudinary } from "../lib/cloudinary";
export const useTasks = () => {
  let { user } = useAuth();
  return useQuery({
    queryKey: ["tasks", user?.id],
    queryFn: async (): Promise<Task[]> => {
      if (!user?.id) return [];
      let { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });
      if (error) {
        throw new Error(error.message);
      }
      return data || [];
    },
    enabled: !!user?.id, // only if user id available
    staleTime: 1000 * 60 * 5,
  });
};
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tid: string) => {
      const { error } = await supabase.from("tasks").delete().eq("id", tid);
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
export const useCreateTask = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateTaskFormData) => {
      if (!user?.id) throw new Error(`User is not Authorized`);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: user?.id,
          title: payload.title,
          objective: payload.objective,
          description: payload.description,
          additional_notes: payload.additional_notes || null,
          priority: payload.priority,
          status: payload.status,
          image_url:payload.taskImage,
          deadline_at: payload.deadline_at
            ? new Date(payload.deadline_at).toISOString()
            : null,
        },
      ]).select().single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["tasks"]});
    }
  });
};
