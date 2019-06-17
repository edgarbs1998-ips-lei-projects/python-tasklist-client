Ext.define('TaskList.store.Tasks', {
    extend: 'Ext.data.Store',
    alias: 'store.tasks',

    requires: [
        'Ext.data.proxy.Rest'
    ],

    model: 'TaskList.model.Task',

    pageSize: 0,

    proxy: {
        type: 'rest',
        withCredentials: true,
        reader: {
            rootProperty: 'data'
        },
        writer: {
            writeAllFields: true
        },
        url: ''
    }
});
