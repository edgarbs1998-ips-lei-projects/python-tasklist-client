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

        var form = button.up('form').getForm();

        if (form.isValid()) {
            Ext.Ajax.request({
                url: Constants.API_ADDRESS + 'api/user/login',
                withCredentials: true,
                method: 'POST',
                params: {
                    username: form.findField('username').getValue(),
                    password: form.findField('password').getValue()
                },

                success: function(response, opts) {
                    var data = Ext.decode(response.responseText);

                    // Set the localStorage value to user data
                    localStorage.setItem("User", response.responseText);

                    // Remove Login Window
                    me.getView().destroy();

                    // Add the main view to the viewport
                    Ext.create({
                        xtype: 'app-main'
                    });

                    // Set the username on the profile button
                    Ext.getCmp('mainPanel').down('#userProfile').setText(data.name + ' (' + data.username + ')');
                },

                failure: function(response, opts) {
                    var data = Ext.decode(response.responseText);
                    Ext.Msg.alert('Failed', Ext.encode(data.message));
                }
            });
        } else {
            Ext.Msg.alert('Invalid Data', 'The input data is invalid, please correct form errors.');
        }
    }
});
