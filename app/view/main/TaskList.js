Ext.define('TaskList.view.main.TaskList', {
    extend: 'Ext.grid.Panel',
    xtype: 'maintasklist',
    id: 'taskListGrid',

    requires: [
        'Ext.toolbar.Paging',

        'TaskList.store.Tasks'
    ],

    title: 'Tasks',
    iconCls: 'fa fa-file-text',
    frame: true,
    sortableColumns: false,

    store: {
        type: 'tasks'
    },

    plugins: [{
        ptype: 'rowediting',
        clicksToMoveEditor: 1,
        autoCancel: false,
        removeUnmodified: true
    }],

    columns: [
        {
            text: 'Title',
            dataIndex: 'title',
            flex: 1,
            editor: {
                allowBlank: false
            }
        },
        {
            xtype: 'datecolumn',
            text: 'Creation Date',
            dataIndex: 'creation_date',
            format: 'Y-m-d H:i:s',
            width: 150,
        },
        {
            xtype: 'datecolumn',
            text: 'Due Date',
            dataIndex: 'due_date',
            format: 'Y-m-d H:i:s',
            width: 150,
            editor: {
                xtype: 'datefield',
                format: 'Y-m-d H:i:s'
            }
        },
        {
            xtype: 'checkcolumn',
            text: 'Completed',
            dataIndex: 'completed',
            width: 90,
            headerCheckbox: true,
            stopSelection: false
        },
        {
            xtype: 'actioncolumn',
            width: 60,
            sortable: false,
            menuDisabled: true,
            items: [{
                iconCls: 'x-fa fa-arrow-up',
                tooltip: 'Move Up',
                handler: 'onMoveUpTaskButtonClick'
            }, {
                iconCls: 'x-fa fa-arrow-down',
                tooltip: 'Move Down',
                handler: 'onMoveDownTaskButtonClick'
            }]
        }
    ],

    tbar: [{
        text: 'Add Task',
        handler: 'onAddTaskButtonClick'
    }, {
        text: 'Edit Task',
        reference: 'editTaskButton',
        handler: 'onEditTaskButtonClick',
        disabled: true
    }, {
        text: 'Remove Task',
        reference: 'removeTaskButton',
        handler: 'onRemoveTaskButtonClick',
        disabled: true
    }],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Displaying project\'s tasks {0} - {1} of {2}',
        emptyMsg: "Selected project does not contain any task"
    }
});
