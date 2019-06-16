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

        var form = button.up('form');

        if (form.isValid()) {
            form.submit({
                success: function(form, action) {
                    Ext.Msg.alert('Success', 'Your account has been successfully registered. Please enter your credentials and login.', 'onRegisterSuccessAlert', me);
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

    onRegisterSuccessAlert: function() {
        // Remove Register Window
        this.getView().destroy();

        // Add the login Window
        Ext.create({
            xtype: 'login'
        });
    },
});
