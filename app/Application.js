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
                Ext.create({
                    xtype: 'app-main'
                });
            },

            failure: function(response, opts) {
                Ext.create({
                    xtype: 'login'
                });
            }
        });

        // // It's important to note that this type of application could use
        // // any type of storage, i.e., Cookies, LocalStorage, etc.
        // var loggedIn;
        //
        // // Check to see the current value of the localStorage key
        // loggedIn = localStorage.getItem("UserLoggedIn");
        //
        // // This ternary operator determines the value of the TutorialLoggedIn key.
        // // If TutorialLoggedIn isn't true, we display the login window,
        // // otherwise, we display the main view
        // Ext.create({
        //     xtype: loggedIn ? 'app-main' : 'login'
        // });
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
