import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.resource('memories', {path: '/'}, function () {
    this.route('active');
    this.route('archive');
  });

  this.route('photos');
});

BrainSupport.MemoriesRoute = Ember.Route.extend({
  model() {
    return this.store.findAll('memo');
    //  .then(function (items)  {
    //  "use strict";
    //  console.log('model loaded');
    //  items.forEach(function(item) {
    //    console.log(item.get('title'));
    //  });
    //  return items;
    //});
  }
});

BrainSupport.MemoriesIndexRoute = BrainSupport.MemoriesRoute.extend({
  controllerName: 'memories-list',
  templateName: 'memories-list'
});

//BrainSupport.MemoriesActiveRoute = BrainSupport.MemoriesIndexRoute.extend({
//  model: function () {
//    return this.store.filter('memory', function (memory) {
//      return !memory.get('isArchive');
//    });
//  }
//});
//
//BrainSupport.MemoiesCompletedRoute = BrainSupport.MemoriesIndexRoute.extend({
//  model: function () {
//    return this.store.filter('memory', function (memory) {
//      return memory.get('isArchive');
//    });
//  }
//});

export default Router;
