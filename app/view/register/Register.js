Ext.define('TaskList.view.register.Register', {
    extend: 'Ext.window.Window',
    xtype: 'register',

    requires: [
        'Ext.window.MessageBox',
        'Ext.form.Panel',

        'TaskList.view.register.RegisterController'
    ],

    controller: 'register',

    title: 'Register Window',
    closable: false,
    resizable: false,
    autoShow: true,
    constrain: true,

    width: 500,

    items: {
        xtype: 'form',
        reference: 'form',
        defaults: {
            labelWidth: 150,
            anchor: '100%'
        },
        items: [{
            xtype: 'textfield',
            name: 'name',
            padding: 10,
            fieldLabel: 'Name',
            allowBlank: false,
            minLength: 3
        }, {
            xtype: 'textfield',
            name: 'email',
            padding: 10,
            fieldLabel: 'Email',
            allowBlank: false,
            vtype: 'email'
        }, {
            xtype: 'textfield',
            name: 'username',
            padding: 10,
            fieldLabel: 'Username',
            allowBlank: false,
            minLength: 3
        }, {
            xtype: 'textfield',
            name: 'password',
            itemId: 'password',
            padding: 10,
            inputType: 'password',
            fieldLabel: 'Password',
            allowBlank: false,
            vtype: 'password'
        }, {
            xtype: 'textfield',
            name: 'passwordConfirm',
            padding: 10,
            inputType: 'password',
            fieldLabel: 'Password (Confirm)',
            allowBlank: false,
            validation: false,
            vtype: 'passwordMatch'
        }],
        buttons: [{
            text: 'Back',
            ui: 'default-toolbar',
            handler: 'onBackButtonClick'
        }, '->', {
            text: 'Register',
            formBind: true,
            handler: 'onRegisterButtonClick'
        }]
    }
});
