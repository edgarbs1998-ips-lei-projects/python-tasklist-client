Ext.define('TaskList.store.Tasks', {
    extend: 'Ext.data.Store',
    alias: 'store.tasks',

    model: 'TaskList.model.Task',

    pageSize: 50,
    autoSync: true,

    proxy: {
        type: 'rest',
        reader: {
            rootProperty: 'data'
        },
        writer: {
            writeAllFields: true
        },
        url: Constants.API_ADDRESS + 'api/'
    }
});
