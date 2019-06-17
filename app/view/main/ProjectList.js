Ext.define('TaskList.view.main.ProjectList', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainprojectlist',
    id: 'projectListGrid',

    requires: [
        'Ext.toolbar.Paging',

        'TaskList.store.Projects'
    ],

    title: 'Projects',
    iconCls: 'x-fa fa-folder-open',
    frame: true,
    sortableColumns: false,

    store: {
        type: 'projects'
    },

    plugins: [{
        ptype: 'rowediting',
        clicksToMoveEditor: 1,
        autoCancel: false
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
            width: 150
        },
        {
            xtype: 'datecolumn',
            text: 'Last Updated',
            dataIndex: 'last_updated',
            format: 'Y-m-d H:i:s',
            width: 150
        }
    ],

    tbar: [{
        text: 'Add Project',
        handler: 'onAddProjectButtonClick'
    }, {
        text: 'Edit Project',
        reference: 'editProjectButton',
        handler: 'onEditProjectButtonClick',
        disabled: true
    }, {
        text: 'Remove Project',
        reference: 'removeProjectButton',
        handler: 'onRemoveProjectButtonClick',
        disabled: true
    }],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Displaying projects {0} - {1} of {2}',
        emptyMsg: "No projects to display"
    },

    listeners: {
        select: 'onProjectSelect',
        deselect : 'onProjectDeselect',
        edit: 'onProjectRecordEdit',
        canceledit: 'onRecordCancelEdit'
    }
});
