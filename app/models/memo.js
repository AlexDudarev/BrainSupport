import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  tags: DS.attr('string'),
  category: DS.belongsTo('category')
});
