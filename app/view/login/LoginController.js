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
                    // Set the localStorage value to true
                    //localStorage.setItem("UserLoggedIn", true);

                    // Remove Login Window
                    me.getView().destroy();

                    // Add the main view to the viewport
                    Ext.create({
                        xtype: 'app-main'
                    });
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
