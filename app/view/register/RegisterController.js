Ext.define('TaskList.view.register.RegisterController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.register',

    onBackButtonClick: function(button, event) {
        // Remove Register Window
        this.getView().destroy();

        // Add the login Window
        Ext.create({
            xtype: 'login'
        });
    },

    onRegisterButtonClick: function(button, event) {
        var me = this;

        var form = button.up('form').getForm();

        if (form.isValid()) {
            Ext.Ajax.request({
                url: Constants.API_ADDRESS + 'api/user/register',
                withCredentials: true,
                method: 'POST',
                params: {
                    name: form.findField('name').getValue(),
                    email: form.findField('email').getValue(),
                    username: form.findField('username').getValue(),
                    password: form.findField('password').getValue()
                },

                success: function(response, opts) {
                    Ext.Msg.alert('Success', 'Your account has been successfully registered. Please enter your credentials and login.', 'onRegisterSuccessAlert', me);
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

    onRegisterSuccessAlert: function() {
        // Remove Register Window
        this.getView().destroy();

        // Add the login Window
        Ext.create({
            xtype: 'login'
        });
    },
});
