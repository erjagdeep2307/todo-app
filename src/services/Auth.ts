import type {
  LoginFormData,
  SignUpFormData,
} from "../features/todo/types/todo.types";
import { supabase } from "../lib/supabase";

async function signUp(formData: SignUpFormData) {
  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        avatar_url:formData.profileImage,
        full_name: formData.fullName,
      },
    },
  });
 
  if (error) {
    return error;
  }
  return true;
}
async function signIn(formData: LoginFormData) {
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.username,
    password: formData.password,
  });

  if (error) {
    return error;
  }
  return true;
}

export { signUp, signIn };
