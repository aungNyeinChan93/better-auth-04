import { sendEmail } from "./resend/seneEmail"

export async function sendEmailVerificationEmail({ user, url }: {
    user: { name: string, email: string },
    url: string
}) {
    return sendEmail({
        from: process.env.RESEND_FROM_EMAIL!,
        to: user.email,
        html: `
            Welcome - ${user.name} 
            Link - ${url}
        `,
        subject: 'email verification sample'

    })
};
