Ext.define('TaskList.store.Tasks', {
    extend: 'Ext.data.Store',
    alias: 'store.tasks',

    model: 'TaskList.model.Task',

    pageSize: 0,

    proxy: {
        type: 'rest',
        reader: {
            rootProperty: 'data'
        },
        writer: {
            writeAllFields: true
        },
        url: ''
    }
});
