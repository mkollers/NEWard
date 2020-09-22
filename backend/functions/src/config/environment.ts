import * as functions from 'firebase-functions';

export const environment = {
    mailjet: {
        apiKey: functions.config().mail.api_key,
        apiSecret: functions.config().mail.api_secret,
        from: {
            email: functions.config().mail.from?.email || 'info@neward.de',
            name: functions.config().mail.from?.name || 'NEWard'
        },
        templates: {
            contact: functions.config().mail.templates.contact,
            signin: functions.config().mail.templates.signin,
            thanks: functions.config().mail.templates.thanks
        }
    },
    contact: {
        recipient: functions.config().contact.recipient,
    }
}