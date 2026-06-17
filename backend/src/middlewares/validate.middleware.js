import { z } from "zod";

export const validate = (schema) => {
    return (req, res, next) => {


        

        const testSchema = z.object({
            currentPassword: z.string(),
            newPassword: z.string(),
            confirmPassword: z.string(),
        });


        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                errors: result.error.flatten(),
            });
        }

        // Si pasa la validación, guardamos los datos limpios
        req.validatedData = result.data;
        
        next();
    };
};