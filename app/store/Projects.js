Ext.define('TaskList.store.Projects', {
    extend: 'Ext.data.Store',
    alias: 'store.projects',

    model: 'TaskList.model.Project',

    pageSize: 50,
    autoLoad: true,

    proxy: {
        type: 'rest',
        reader: {
            rootProperty: 'data'
        },
        writer: {
            writeAllFields: true
        },
        url: Constants.API_ADDRESS + 'api/projects/'
    }
});
