Ext.define('TaskList.view.user.ChangePassword', {
    extend: 'Ext.window.Window',
    xtype: 'userchangepassword',

    requires: [
        'Ext.window.MessageBox',
        'Ext.form.Panel',

        'TaskList.view.user.UserController'
    ],

    controller: 'user',

    title: 'Change Password',
    closable: true,
    resizable: false,
    autoShow: true,
    constrain: true,

    width: 500,

    items: {
        xtype: 'form',
        reference: 'form',
        method: 'PUT',
        url: Constants.API_ADDRESS + 'api/user/password/',
        defaults: {
            labelWidth: 150,
            anchor: '100%'
        },
        items: [{
            xtype: 'textfield',
            name: 'password',
            itemId: 'password',
            padding: 10,
            inputType: 'password',
            fieldLabel: 'Password',
            allowBlank: false,
            vtype: 'password',
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
        buttons: ['->', {
            text: 'Change Password',
            formBind: true,
            handler: 'onUpdatePasswordButtonClick'
        }]
    }
});
