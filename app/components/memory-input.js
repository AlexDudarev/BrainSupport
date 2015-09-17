import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    createMemory: function () {
      var title, memory;

      // Get the memory title set by the "New Memory" text field
      title = this.get('newTitle').trim();
      if (!title) {
        return;
      }

      // Create the new Memory model
      memory = this.store.createRecord('memo', {
        title: title
      });
      memory.save();

      // Clear the "New Memory" text field
      this.set('newTitle', '');
    }
  },
  focusOnInsert: function () {
    // Re-set input value to get rid of a reduntant text selection
    this.$().val(this.$().val());
    this.$().focus();
  }.on('didInsertElement')
});
