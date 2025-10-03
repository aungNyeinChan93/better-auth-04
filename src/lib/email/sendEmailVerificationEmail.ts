import { sendEmail } from "./sendEmail"

export async function sendEmailVerificationEmail({ user, url }: {
    user: { name: string, email: string },
    url: string
}) {
    return sendEmail({
        to: user?.email,
        subject: 'Email verification',
        htmlbody: `
            ${user.name} || ${user?.email} || ${url}
             `,
        textbody: `
        this is sample email gfor email verification!`
    })
};
