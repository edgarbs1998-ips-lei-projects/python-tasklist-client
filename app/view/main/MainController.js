/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('TaskList.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onProjectSelect: function (rowModel, record, index, eOpts) {
        var taskListPanel = Ext.getCmp('taskListGrid');
        taskListPanel.setTitle('Tasks :: ' + record.get('title'));

        var taskListStore = taskListPanel.getStore();
        taskListStore.getProxy().setUrl(Constants.API_ADDRESS + 'api/projects/' + record.get('id') + '/tasks/');
        taskListStore.loadPage(1);

        this.lookupReference('removeProjectButton').setDisabled(false);
        this.lookupReference('editProjectButton').setDisabled(false);
    },

    onProjectDeselect: function (rowModel, records, index, eOpts) {
        var taskListPanel = Ext.getCmp('taskListGrid');
        taskListPanel.setTitle('Tasks');

        var taskListStore = taskListPanel.getStore();
        taskListStore.loadData([], false);

        this.lookupReference('removeProjectButton').setDisabled(true);
        this.lookupReference('editProjectButton').setDisabled(true);
    },

    onLogoutButtonClick: function () {
        var me = this;

        Ext.Ajax.request({
            url: Constants.API_ADDRESS + 'api/user/logout/',
            method: 'POST',

            success: function(response, opts) {
                // Remove the localStorage key/value
                //localStorage.removeItem('UserLoggedIn');

                // Remove Main View
                me.getView().destroy();

                // Add the Login Window
                Ext.create({
                    xtype: 'login'
                });
            },

            failure: function(response, opts) {
                Ext.Msg.alert('Failed', 'Server-side failure, impossible to logout');
            }
        });
    },

    onProjectRecordEdit: function(editor, event) {
        var panel = Ext.getCmp('projectListGrid');
        var store = panel.getStore();
        store.sync({
            success: function(batch, options) {
                store.loadPage(1, {
                    callback: function(records, operation, success) {
                        panel.getSelectionModel().select(0);
                    }
                });
            },
            failure: function(batch, options) {
                if (store.getAt(0).phantom === true) {
                    store.removeAt(0);
                }
                else {
                    var selection = panel.getSelection();
                    if (selection.length > 0) {
                        selection[0].reject();
                    }
                }

                var error = Ext.decode(batch.operations[0].error.response.responseText).message;
                Ext.Msg.alert('Error', error);
            }
        });
    },

    onAddProjectButtonClick: function (button, opts) {
        var panel = button.up('mainprojectlist');
        var record = new TaskList.model.Project({});
        panel.getStore().insert(0, record);
        panel.findPlugin('rowediting').startEdit(record);
    },

    onEditProjectButtonClick: function(button, event) {
        var panel = button.up('mainprojectlist');
        var selection = panel.getSelection();
        if (selection.length > 0) {
            panel.findPlugin('rowediting').startEdit(selection[0]);
        }
    },

    onRemoveProjectButtonClick: function(button, event) {
        var me = this;

        var panel = button.up('mainprojectlist');
        var store = panel.getStore();
        var selection = panel.getSelection();
        if (selection.length > 0) {
            Ext.Msg.confirm('Remove project', 'Are you sure you want to remove project \'' + selection[0].get('title') + '\'?', function(btn) {
                if (btn === 'yes') {
                    selection[0].drop();
                    store.sync({
                        success: function (batch, options) {
                            store.load();
                        },
                        failure: function (batch, options) {
                            var error = Ext.decode(batch.operations[0].error.response.responseText).message;
                            Ext.Msg.alert('Error', error);
                        }
                    });
                }
            }, me);
        }
    },

    onAddTaskButtonClick: function (button, opts) {
        // TODO First add gives error
        var panel = button.up('maintasklist');
        var record = new TaskList.model.Task({});
        panel.getStore().insert(0, record);
        panel.findPlugin('rowediting').startEdit(record);
    },

    onEditTaskButtonClick: function(button, event) {
        var panel = button.up('maintasklist');
        var selection = panel.getSelection();
        if (selection.length > 0) {
            panel.findPlugin('rowediting').startEdit(selection[0]);
        }
    },

    onRemoveTaskButtonClick: function(button, event) {
        var me = this;

        var panel = button.up('maintasklist');
        var selection = panel.getSelection();
        if (selection.length > 0) {
            Ext.Msg.confirm('Remove task', 'Are you sure you want to remove task \'' + selection[0].get('title') + '\'?', function(btn) {
                if (btn === 'yes') {
                    selection[0].drop();
                }
            }, me);
        }
    },

    // TODO Still not fully working...
    onMoveUpTaskButtonClick: function(view, recIndex, cellIndex, item, e, record) {
        var store = view.getStore();
        var upperRecord = store.getAt(recIndex - 1);

        if (upperRecord !== null) {
            var tempOrder = record.get('order');
            record.set('order', upperRecord.get('order'));
            upperRecord.set('order', tempOrder);
        }
    },

    onMoveDownTaskButtonClick: function(view, recIndex, cellIndex, item, e, record) {
        var store = view.getStore();
        var lowerRecord = store.getAt(recIndex + 1);

        if (lowerRecord !== null) {
            var tempOrder = record.get('order');
            record.set('order', lowerRecord.get('order'));
            lowerRecord.set('order', tempOrder);
        }
    }
});
