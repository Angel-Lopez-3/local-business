import { resend } from "../config/resend.js";


export const sendPasswordResetEmail = async ( token) => {

    const resetLink = `http://localhost:5000/reset-password?token=${token}`;

    await resend.emails.send({

            from:
                "onboarding@resend.dev",

            to: [
                "angelgabriellopez016@gmail.com",
            ],
            // TODO:
            // reemplazar por user.email

            subject:
                "Password Recovery",

            html: `
                <h2>
                    Password Reset
                </h2>

                <p>
                    Click the link below:
                </p>

                <a href="${resetLink}">
                    Reset Password
                </a>
            `,
    });
};