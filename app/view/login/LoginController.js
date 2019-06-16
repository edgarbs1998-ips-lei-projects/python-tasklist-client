Ext.define('TaskList.view.login.LoginController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.login',

    onRegisterButtonClick: function(button, event) {
        // Remove Login Window
        this.getView().destroy();

        // Add the register Window
        Ext.create({
            xtype: 'register'
        });
    },

    onLoginButtonClick: function(button, event) {
        var me = this;

        var form = button.up('form');

        if (form.isValid()) {
            form.submit({
                success: function(form, action) {
                    var data = Ext.decode(action.response.responseText);
                    var user = data.user;

                    // Set the localStorage value to user data
                    localStorage.setItem("User", Ext.encode(user));

                    // Remove Login Window
                    me.getView().destroy();

                    // Add the main view to the viewport
                    Ext.create({
                        xtype: 'app-main'
                    });

                    // Set the username on the profile button
                    Ext.getCmp('mainPanel').down('#userProfile').setText(user.name + ' (' + user.username + ')');
                },

                failure: function(form, action) {
                    var data = Ext.decode(action.response.responseText);
                    Ext.Msg.alert('Failed', data.message);
                }
            });
        } else {
            Ext.Msg.alert('Invalid Data', 'The input data is invalid, please correct form errors.');
        }
    }
});
