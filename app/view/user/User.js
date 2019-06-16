Ext.define('TaskList.view.user.User', {
    extend: 'Ext.window.Window',
    xtype: 'user',
    id: 'mainUserWindow',

    requires: [
        'Ext.window.MessageBox',
        'Ext.form.Panel',

        'TaskList.view.user.UserController'
    ],

    controller: 'user',

    title: 'Edit User',
    closable: true,
    resizable: false,
    autoShow: true,
    constrain: true,

    width: 400,

    items: {
        xtype: 'form',
        reference: 'form',
        method: 'PUT',
        url: Constants.API_ADDRESS + 'api/user/',
        defaults: {
            anchor: '100%'
        },
        items: [{
            xtype: 'textfield',
            name: 'name',
            padding: 10,
            fieldLabel: 'Name',
            allowBlank: false,
            minLength: 3,
            itemId: 'fieldName'
        }, {
            xtype: 'textfield',
            name: 'email',
            padding: 10,
            fieldLabel: 'Email',
            allowBlank: false,
            vtype: 'email',
            itemId: 'fieldEmail'
        }, {
            xtype: 'textfield',
            name: 'username',
            padding: 10,
            fieldLabel: 'Username',
            allowBlank: false,
            minLength: 3,
            itemId: 'fieldUsername'
        }],
        buttons: [{
            text: 'Change Password',
            ui: 'default-toolbar',
            handler: 'onChangePasswordButtonClick'
        }, '->', {
            text: 'Edit',
            formBind: true,
            handler: 'onEditButtonClick'
        }]
    },

    listeners: {
        beforeshow: 'onUserWindowBeforeShow'
    }
});
