Ext.define('TaskList.store.Projects', {
    extend: 'Ext.data.Store',
    alias: 'store.projects',

    requires: [
        'Ext.data.proxy.Rest'
    ],

    model: 'TaskList.model.Project',

    pageSize: 50,
    autoLoad: true,

    proxy: {
        type: 'rest',
        withCredentials: true,
        reader: {
            rootProperty: 'data'
        },
        writer: {
            writeAllFields: true
        },
        url: Constants.API_ADDRESS + 'api/projects'
    }
});
