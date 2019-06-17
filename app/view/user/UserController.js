Ext.define('TaskList.view.user.UserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.user',

    onUserWindowBeforeShow: function(component, eOpts) {
        var panel = Ext.getCmp('mainUserWindow');

        var user = Ext.decode(localStorage.getItem("User"));

        panel.down('#fieldName').setValue(user.name);
        panel.down('#fieldEmail').setValue(user.email);
        panel.down('#fieldUsername').setValue(user.username);
    },

    onChangePasswordButtonClick: function(button, event) {
        // Display change password window
        Ext.create({
            xtype: 'userchangepassword'
        });
    },

    onEditButtonClick: function(button, event) {
        var form = button.up('form').getForm();

        if (form.isValid()) {
            Ext.Ajax.request({
                url: Constants.API_ADDRESS + 'api/user',
                withCredentials: true,
                method: 'PUT',
                params: {
                    name: form.findField('name').getValue(),
                    email: form.findField('email').getValue(),
                    username: form.findField('username').getValue()
                },

                success: function(response, opts) {
                    var data = Ext.decode(response.responseText);

                    // Set the localStorage value to user data
                    localStorage.setItem("User", response.responseText);

                    // Set the username on the profile button
                    Ext.getCmp('mainPanel').down('#userProfile').setText(data.name + ' (' + data.username + ')');

                    Ext.Msg.alert('Success', 'Your account has been successfully edited.');
                },

                failure: function(response, opts) {
                    var data = Ext.decode(response.responseText);
                    Ext.Msg.alert('Failed', Ext.encode(data.message));
                }
            });
        } else {
            Ext.Msg.alert('Invalid Data', 'The input data is invalid, please correct form errors.');
        }
    },

    onUpdatePasswordButtonClick: function(button, event) {
        var me = this;

        var form = button.up('form').getForm();

        if (form.isValid()) {
            Ext.Ajax.request({
                url: Constants.API_ADDRESS + 'api/user/password',
                withCredentials: true,
                method: 'PUT',
                params: {
                    password: form.findField('password').getValue()
                },

                success: function(response, opts) {
                    Ext.Msg.alert('Success', 'Your password has been successfully changed.', 'onChangePasswordSuccessAlert', me);
                },

                failure: function(response, opts) {
                    var data = Ext.decode(action.response.responseText);
                    Ext.Msg.alert('Failed', Ext.encode(data.message));
                }
            });
        } else {
            Ext.Msg.alert('Invalid Data', 'The input data is invalid, please correct form errors.');
        }
    },

    onChangePasswordSuccessAlert: function() {
        // Remove Change Password Window
        this.getView().destroy();
    },
});
