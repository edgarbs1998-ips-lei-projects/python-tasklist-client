Ext.define('TaskList.view.main.TaskList', {
    extend: 'Ext.grid.Panel',
    xtype: 'maintasklist',
    id: 'taskListGrid',

    requires: [
        'Ext.toolbar.Paging',

        'TaskList.store.Tasks'
    ],

    title: 'Tasks',
    iconCls: 'x-fa fa-file-text',
    frame: true,
    sortableColumns: false,

    store: {
        type: 'tasks'
    },

    plugins: [{
        ptype: 'rowediting',
        clicksToMoveEditor: 1,
        autoCancel: false
    }],

    viewConfig: {
        getRowClass: function(record, index, rowParams, store){
            if (record.get('completed') === true ) {
                return "x-grid-row-task-done";
            } else if (record.get('due_date') !== null && new Date() > record.get('due_date')) {
                return "x-grid-row-task-expired";
            }
            return "";
        }
    },

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
            stopSelection: true,
            listeners: {
                checkchange: 'onCompletedCheckChange'
            }
        },
        {
            xtype: 'actioncolumn',
            text: 'Actions',
            width: 70,
            sortable: false,
            menuDisabled: true,
            align: 'center',
            items: [{
                iconCls: 'x-fa fa-arrow-up',
                tooltip: 'Move Up',
                handler: 'onMoveUpTaskButtonClick',
                getClass: function(value, meta, record) {
                    var store = Ext.getCmp('taskListGrid').getStore();
                    var index = store.indexOf(record);
                    return (index > 0) ?
                        'x-fa fa-arrow-up': //Show the action icon
                        'x-hidden-display';  //Hide the action icon
                }
            }, {
                iconCls: 'x-fa fa-arrow-down',
                tooltip: 'Move Down',
                handler: 'onMoveDownTaskButtonClick',
                getClass: function(value, meta, record) {
                    var store = Ext.getCmp('taskListGrid').getStore();
                    var total = store.getTotalCount();
                    var index = store.indexOf(record);
                    return (index < total - 1) ?
                        'x-fa fa-arrow-down': //Show the action icon
                        'x-hidden-display';  //Hide the action icon
                }
            }]
        }
    ],

    tbar: [{
        text: 'Add Task',
        reference: 'addTaskButton',
        handler: 'onAddTaskButtonClick',
        disabled: true
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

    listeners: {
        select: 'onTaskSelect',
        deselect : 'onTaskDeselect',
        edit: 'onTaskRecordEdit',
        canceledit: 'onRecordCancelEdit'
    }
});
