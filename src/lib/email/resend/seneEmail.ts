import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY! as string)


export async function sendEmail({ from, to, subject, html }: {
    from: string,
    to: string,
    subject: string,
    html: string
}) {
    await resend.emails.send({
        from,
        to,
        subject,
        html,
    });
}