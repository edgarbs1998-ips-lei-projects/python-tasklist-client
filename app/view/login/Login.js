Ext.define('TaskList.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',

    requires: [
        'Ext.window.MessageBox',
        'Ext.form.Panel',

        'TaskList.view.login.LoginController'
    ],

    controller: 'login',

    title: 'Login Window',
    closable: false,
    resizable: false,
    autoShow: true,
    constrain: true,

    width: 400,

    items: {
        xtype: 'form',
        reference: 'form',
        url: Constants.API_ADDRESS + 'api/user/login/',
        defaults: {
            anchor: '100%'
        },
        items: [{
            xtype: 'textfield',
            name: 'username',
            padding: 10,
            fieldLabel: 'Username',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'password',
            padding: 10,
            inputType: 'password',
            fieldLabel: 'Password',
            allowBlank: false
        }],
        buttons: [{
            text: 'Register',
            ui: 'default-toolbar',
            handler: 'onRegisterButtonClick'
        }, '->', {
            text: 'Login',
            formBind: true,
            handler: 'onLoginButtonClick'
        }]
    }
});
