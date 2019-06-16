Ext.define('TaskList.controller.VTypes', {
    extend: 'Ext.app.Controller',

    init: function() {
        // custom Vtype for vtype:'password'
        Ext.define('Override.form.field.VTypes', {
            override: 'Ext.form.field.VTypes',

            // vtype validation function
            password: function(value) {
                return this.passwordReg.test(value);
            },
            // RegExp for the value to be tested against within the validation function
            passwordReg: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
            // vtype Text property: The error text to display when the validation function returns false
            passwordText: 'Your password must at least be 8 characters long and contain at least one number.',

            // vtype validation function
            passwordMatch: function(value, field) {
                var password = field.up('form').down('#' + 'password');
                return (value === password.getValue());
            },
            // vtype Text property: The error text to display when the validation function returns false
            passwordMatchText: 'Passwords doesn\'t match.'
        });
    }
});
