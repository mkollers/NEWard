import * as functions from 'firebase-functions';

export const environment = {
    mailjet: {
        apiKey: functions.config().mail.api_key,
        apiSecret: functions.config().mail.api_secret,
        from: {
            email: functions.config().mail.from?.email || 'bodylife@markuskollers.de',
            name: functions.config().mail.from?.name || 'NEWard'
        },
        templates: {
            signin: functions.config().mail.templates.signin
        }
    }
}