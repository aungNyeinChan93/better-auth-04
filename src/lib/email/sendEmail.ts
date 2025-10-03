import "dotenv/config";
import { ServerClient } from 'postmark'

const postmarkClient = new ServerClient(process.env.POSTMARK_SERVER_TOKEN!) // sad🥲 i have not doamin and mail blah blah  

export async function sendEmail({ to, subject, htmlbody, textbody }: {
    to: string,
    subject: string,
    htmlbody: string,
    textbody: string
}) {
    postmarkClient.sendEmail({
        From: process.env.POSTMARK_FORM_EMAIL!,
        To: to,
        Subject: subject,
        HtmlBody: htmlbody,
        TextBody: textbody
    })
}



