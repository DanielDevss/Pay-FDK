import { z } from "zod";

export const schemeNewUser = z.object({
  firstName: z
    .string({ message: "Debes ingresar un nombre" })
    .max(45, "Máximo 45 carácteres"),
  lastName: z
    .string({ message: "Debes ingresar un apellido" })
    .max(45, "Máximo 45 carácteres"),
  rfc: z
    .string({ message: "Debes ingresar un RFC" })
    .length(13, "Ingresa un RFC de 13 dígitos"),
  email: z
    .string({ message: "Debes ingresar un correo" })
    .email("Debes ingresar un correo válido"),
  phone: z
    .string()
    .length(10, "Ingresa un teléfono de 10 dígitos")
    .optional(),
  password: z
    .string({ message: "Debes ingresar una contraseña" })
    .min(8, "Mínimo 8 caracteres"),
  confirmPassword: z
    .string({ message: "Debes confirmar la contraseña" })
    .min(8, "Mínimo 8 caracteres"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});
