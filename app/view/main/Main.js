/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('TaskList.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'TaskList.view.main.MainController',
        'TaskList.view.main.ProjectList',
        'TaskList.view.main.TaskList'
    ],

    controller: 'main',

    plugins: 'viewport',

    ui: 'navigation',
    layout: 'border',

    header: {
        layout: {
            align: 'stretchmax'
        },
        iconCls: 'fa-tasks',
        title: {
            text: "TaskList",
            flex: 0
        },
        items: [{
            xtype: 'button',
            text: 'Logout',
            margin: '30 0',
            handler: 'onLogoutButtonClick'
        }]
    },

    items: [{
        xtype: 'mainprojectlist',
        region: 'west',
        split: true,
        width: 600,
        margin: '5 0 0 5',
        collapsible: true,
    }, {
        xtype: 'maintasklist',
        region: 'center',
        margin: '5 5 0 0'
    }]
});
