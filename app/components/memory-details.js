import Ember from 'ember';

export default Ember.Component.extend({
  // We use the bufferedTitle to store the original value of
  // the model's title so that we can roll it back later in the
  // `cancelEditing` action.
  bufferedTitle: Ember.computed.oneWay('title'),

  actions: {
    editMemory: function () {
      this.set('isEditing', true);
      return false;
    },

    doneEditing: function () {
      var bufferedTitle = this.get('bufferedTitle').trim();

      if (Ember.isEmpty(bufferedTitle)) {
        // The `doneEditing` action gets sent twice when the user hits
        // enter (once via 'insert-newline' and once via 'focus-out').
        //
        // We debounce our call to 'removeMemory' so that it only gets
        // made once.
        Ember.run.debounce(this, 'removeMemory', 0);
      } else {
        var memory = this.get('model');
        memory.set('title', bufferedTitle);
        memory.save();
      }

      // Re-set our newly edited title to persist its trimmed version
      this.set('bufferedTitle', bufferedTitle);
      this.set('isEditing', false);
    },

    cancelEditing: function (memory) {
      this.set('bufferedTitle', this.get('title'));
      memory.set('isEditing', false);
    },

    removeMemory: function (memory) {

      memory.deleteRecord();
      memory.save();
      return false;
    }
  },
  didInsertElement: function() {
    this.renderChildTooltips(); // Voila!
  }
});
