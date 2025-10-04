import { sendEmail } from "./resend/seneEmail"


export async function sendPasswordResetEmail({ user, url }: {
    user: { email: string, name: string },
    url: string
}) {
    return sendEmail({
        from: process.env.RESEND_FROM_EMAIL!,
        to: user.email,
        html: `
                Welcome - ${user.name} 
                Link - ${url}
            `,
        subject: 'password reset sample'

    })
}