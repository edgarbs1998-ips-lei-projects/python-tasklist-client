/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('TaskList.Application', {
    extend: 'Ext.app.Application',

    name: 'TaskList',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    controllers: [
        'VTypes'
    ],

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {
        Ext.Ajax.request({
            url: Constants.API_ADDRESS + 'api/user/',
            method: 'GET',

            success: function(response, opts) {
                var data = Ext.decode(response.responseText);
                var user = data.user;

                // Set the localStorage value to user data
                localStorage.setItem("User", Ext.encode(user));

                // Display main panel
                Ext.create({
                    xtype: 'app-main'
                });

                // Set the username on the profile button
                Ext.getCmp('mainPanel').down('#userProfile').setText(user.name + ' (' + user.username + ')');
            },

            failure: function(response, opts) {
                // Remove the localStorage key/value
                localStorage.removeItem('User');

                // Display login window
                Ext.create({
                    xtype: 'login'
                });
            }
        });
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
