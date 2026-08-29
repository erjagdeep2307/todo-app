import * as z from "zod";
const loginFormSchema = z.object({
  username: z
    .email("Provide a valid Email Address")
    .trim()
    .max(30, { message: "Email Should not be exceeded above 30 Chars" }),
  password: z
    .string()
    .min(6, { message: "Password Must be at least 6 char long." })
    .max(10, { message: "Password must be less than 30 chars." }),
});

const signUpFormScheama = z.object({
  email: z.email({ message: "Email should be a valid Email id." }),
  fullName: z
    .string()
    .trim()
    .min(5, { message: "Name must be at least 5 Chars." })
    .max(30, { message: "Name should be not be exceeds 30 Chars." }),
  password: z
    .string()
    .min(5, { message: "Password should be at least 5 chars long." })
    .max(20, {
      message: "Password should not exceeds the max length 20 chars.",
    }),
  confirmPassword: z
    .string()
    .min(1, { message: "Please confirm the Password" }),
  profileImage: z.string().nullable(),
});


export type LoginFormData = z.infer<typeof loginFormSchema>;
export type SignUpFormData = z.infer<typeof signUpFormScheama> 
export { loginFormSchema,signUpFormScheama };
