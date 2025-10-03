import { sendEmail } from "./sendEmail"


export async function sendPasswordResetEmail({ user, url }: {
    user: { email: string, name: string },
    url: string
}) {
    return sendEmail({
        to: user.email,
        subject: 'reset password',
        htmlbody: `
            We have send to ${user?.email} ..
            " hello world " 
            Goto ::: ${url}
        `,
        textbody: `Welcome  - ${user.name}`,
    })
}