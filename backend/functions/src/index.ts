import { Contact } from './functions/contact';
import { OnAccessTokenWrite } from './functions/on-access-token-write';
import { OnRegistrationWrite } from './functions/on-registration-write';
import { initialize } from './initialize';

initialize();

exports.OnAccessTokenWrite = OnAccessTokenWrite;
exports.OnRegistrationWrite = OnRegistrationWrite;
exports.contact = Contact;