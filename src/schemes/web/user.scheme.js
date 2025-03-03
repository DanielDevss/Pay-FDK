import { z } from "zod";

// Crear un usuario

export const schemeNewUser = z.object({
  firstName: z
    .string({ message: "Debes ingresar un nombre" })
    .min(3, "Minímo 3 carácteres")
    .max(45, "Máximo 45 carácteres"),
    lastName: z
    .string({ message: "Debes ingresar un apellido" })
    .min(3, "Minímo 3 carácteres")
    .max(45, "Máximo 45 carácteres"),
  rfc: z
    .string({ message: "Debes ingresar un RFC" })
    .length(13, "Ingresa un RFC de 13 dígitos"),
  email: z
    .string({ message: "Debes ingresar un correo" })
    .email("Debes ingresar un correo válido"),
  phone: z
    .string()
    .length(10, "Ingresa un teléfono de 10 dígitos"),
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

// Actualizar usuario

export const schemeUpdateUser = z.object({
  firstName: z
    .string({ message: "Debes ingresar un nombre" })
    .min(3, "Minímo 3 carácteres")
    .max(45, "Máximo 45 carácteres"),
  lastName: z
    .string({ message: "Debes ingresar un apellido" })
    .min(3, "Minímo 3 carácteres")
    .max(45, "Máximo 45 carácteres"),
  rfc: z
    .string({ message: "Debes ingresar un RFC" })
    .length(13, "Ingresa un RFC de 13 dígitos"),
  email: z
    .string({ message: "Debes ingresar un correo" })
    .email("Debes ingresar un correo válido"),
  phone: z
    .string()
    .length(10, "Ingresa un teléfono de 10 dígitos"),
})

// Completar información de stripe

export const schemeUserStripeComplete = z.object({
  address: z.object({
    address: z
      .string({ message: "Debes agregar una dirección" }),
    postalCode: z
      .string({message:"Debes de ingresar un código postal"}),
    state: z.string({message: "El campo estado no debe estar vacío"}),
    city: z.string({ message: "Debes ingresar una ciudad" }),
    country: z.enum(["MX", "US"], { message: "Debes seleccionar un código de País" })
  }),
  dob : z.object({
    day: z
      .number({message: "Ingresa el día en número"})
      .min(1, "El número minimo es 1")
      .max(31, "El número máximo es 31"),
    month: z.number("Ingresa el mes en número")
      .min(1, "El número minimo es 1 (Enero)")
      .max(12, "El número máximo es 12 (Diciembre)"),
    year: z.number("Ingresa el año en 4 digítos")
      .min(1900, "El año minímo es 1900"),
  }),
  business: z.object({
    url: z
      .string("Ingresa la dirección web de tu negocio").url("Solo se admiten URL's")
  })
})
