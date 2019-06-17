Ext.define('TaskList.model.Project', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'title', idProperty: 'title', type: 'string'},
        {name: 'creation_date', idProperty: 'creation_date', type: 'date'},
        {name: 'last_updated', idProperty: 'due_date', type: 'date'},
    ]
});