/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('TaskList.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onProjectSelect: function(rowModel, record, index, eOpts) {
        var taskListPanel = Ext.getCmp('taskListGrid');
        taskListPanel.setTitle('Tasks :: ' + record.get('title'));

        var taskListStore = taskListPanel.getStore();
        if (!isNaN(record.get('id'))) {
            taskListStore.getProxy().setUrl(Constants.API_ADDRESS + 'api/projects/' + record.get('id') + '/tasks/');
            taskListStore.loadPage(1);
            this.lookupReference('addTaskButton').setDisabled(false);
        }

        this.lookupReference('removeProjectButton').setDisabled(false);
        this.lookupReference('editProjectButton').setDisabled(false);
    },

    onProjectDeselect: function(rowModel, records, index, eOpts) {
        var taskListPanel = Ext.getCmp('taskListGrid');
        taskListPanel.setTitle('Tasks');

        var taskListStore = taskListPanel.getStore();
        taskListStore.getProxy().setUrl('');
        taskListStore.loadData([], false);

        this.lookupReference('removeProjectButton').setDisabled(true);
        this.lookupReference('editProjectButton').setDisabled(true);
        this.lookupReference('addTaskButton').setDisabled(true);
        this.lookupReference('editTaskButton').setDisabled(true);
        this.lookupReference('removeTaskButton').setDisabled(true);
    },

    onLogoutButtonClick: function(button, click) {
        var me = this;

        Ext.Ajax.request({
            url: Constants.API_ADDRESS + 'api/user/logout/',
            method: 'POST',

            success: function(response, opts) {
                // Remove the localStorage key/value
                localStorage.removeItem('User');

                // Reload page
                location.reload();
            },

            failure: function(response, opts) {
                Ext.Msg.alert('Failed', 'Server-side failure, impossible to logout');
            }
        });
    },

    onUserButtonClick: function(button, event) {
        // Display user window
        Ext.create({
            xtype: 'user'
        });
    },

    onProjectRecordEdit: function(editor, context, eOpts) {
        var grid = context.grid;
        var store = grid.getStore();
        store.sync({
            success: function(batch, options) {
                store.loadPage(1, {
                    callback: function(records, operation, success) {
                        grid.getSelectionModel().select(0);
                    }
                });
            },
            failure: function(batch, options) {
                if (isNaN(context.record.get('id'))) {
                    context.record.drop();
                }
                else {
                    context.record.reject();
                }

                var error = Ext.decode(batch.operations[0].error.response.responseText).message;
                Ext.Msg.alert('Error', error);
            }
        });
    },

    onRecordCancelEdit: function(editor, context, eOpts) {
        if (isNaN(context.record.get('id'))) {
            context.record.drop();
        }
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
                            store.reload();
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

    onTaskSelect: function (rowModel, record, index, eOpts) {
        this.lookupReference('editTaskButton').setDisabled(false);
        this.lookupReference('removeTaskButton').setDisabled(false);
    },

    onTaskDeselect: function (rowModel, records, index, eOpts) {
        this.lookupReference('editTaskButton').setDisabled(true);
        this.lookupReference('removeTaskButton').setDisabled(true);
    },

    onTaskRecordEdit: function(editor, context, eOpts) {
        var grid = context.grid;
        var store = grid.getStore();
        store.sync({
            success: function(batch, options) {
                if (isNaN(context.record.get('id'))) {
                    store.loadPage(1, {
                        callback: function(records, operation, success) {
                            grid.getSelectionModel().select(0);
                        }
                    });
                }
                else {
                    store.reload();
                    grid.getSelectionModel().select(context.record);
                }
            },
            failure: function(batch, options) {
                if (isNaN(context.record.get('id'))) {
                    context.record.drop();
                }
                else {
                    context.record.reject();
                }

                var error = Ext.decode(batch.operations[0].error.response.responseText).message;
                Ext.Msg.alert('Error', error);
            }
        });
    },

    onAddTaskButtonClick: function (button, opts) {
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
        var store = panel.getStore();
        var selection = panel.getSelection();
        if (selection.length > 0) {
            Ext.Msg.confirm('Remove task', 'Are you sure you want to remove task \'' + selection[0].get('title') + '\'?', function(btn) {
                if (btn === 'yes') {
                    selection[0].drop();
                    store.sync({
                        success: function (batch, options) {
                            store.reload();
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

    onCompletedCheckChange: function(column, rowIndex, checked, record, event, eOpts) {
        var store = column.up('maintasklist').getStore();
        store.sync({
            failure: function (batch, options) {
                record.reject();

                var error = Ext.decode(batch.operations[0].error.response.responseText).message;
                Ext.Msg.alert('Error', error);
            }
        });
    },

    onMoveUpTaskButtonClick: function(view, recIndex, cellIndex, item, e, record) {
        var store = view.getStore();
        var upperRecord = store.getAt(recIndex - 1);

        if (upperRecord !== null) {
            var tempOrder = record.get('order');
            record.set('order', upperRecord.get('order'));
            upperRecord.set('order', tempOrder);

            store.sync({
                success: function (batch, options) {
                    store.reload();
                },
                failure: function (batch, options) {
                    var error = Ext.decode(batch.operations[0].error.response.responseText).message;
                    Ext.Msg.alert('Error', error);
                }
            });
        }
    },

    onMoveDownTaskButtonClick: function(view, recIndex, cellIndex, item, e, record) {
        var store = view.getStore();
        var lowerRecord = store.getAt(recIndex + 1);

        if (lowerRecord !== null) {
            var tempOrder = record.get('order');
            record.set('order', lowerRecord.get('order'));
            lowerRecord.set('order', tempOrder);

            store.sync({
                success: function (batch, options) {
                    store.reload();
                },
                failure: function (batch, options) {
                    var error = Ext.decode(batch.operations[0].error.response.responseText).message;
                    Ext.Msg.alert('Error', error);
                }
            });
        }
    }
});
