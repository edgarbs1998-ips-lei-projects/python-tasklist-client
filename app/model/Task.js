Ext.define('TaskList.model.Task', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'title', idProperty: 'title', type: 'string'},
        {name: 'order', idProperty: 'order', type: 'int'},
        {name: 'creation_date', idProperty: 'creation_date', type: 'date'},
        {name: 'due_date', idProperty: 'due_date', type: 'date'},
        {name: 'completed', idProperty: 'completed', type: 'boolean'}
    ]
});