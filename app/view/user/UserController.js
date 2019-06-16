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
        var form = button.up('form');

        if (form.isValid()) {
            form.submit({
                success: function(form, action) {
                    var data = Ext.decode(action.response.responseText);
                    var user = data.user;

                    // Set the localStorage value to user data
                    localStorage.setItem("User", Ext.encode(user));

                    Ext.Msg.alert('Success', 'Your account has been successfully edited.');
                },

                failure: function(form, action) {
                    var data = Ext.decode(action.response.responseText);
                    Ext.Msg.alert('Failed', data.message);
                }
            });
        } else {
            Ext.Msg.alert('Invalid Data', 'The input data is invalid, please correct form errors.');
        }
    },

    onUpdatePasswordButtonClick: function(button, event) {
        var me = this;
        var form = button.up('form');

        if (form.isValid()) {
            form.submit({
                success: function(form, action) {
                    Ext.Msg.alert('Success', 'Your password has been successfully changed.', 'onChangePasswordSuccessAlert', me);
                },

                failure: function(form, action) {
                    var data = Ext.decode(action.response.responseText);
                    Ext.Msg.alert('Failed', data.message);
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
