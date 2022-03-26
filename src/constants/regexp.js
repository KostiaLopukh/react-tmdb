export const regexp = {
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,128})/),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    PHONE_REGEXP: new RegExp('^(?:\\+38)?(0(50|66|67|68|95|96|97|98|99)\\d{7})$'),
};
