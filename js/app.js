$(function () {
  'use strict';

  var Service = Backbone.Model.extend({
    defaults: {
      title: 'My Service',
      price: 100,
      checked: false
    },

    toggle: function () {
      this.set('checked', !(this.get('checked')));
    }
  });

  var ServiceList = Backbone.Collection.extend({
    model: Service,

    getChecked: function () {
      return this.where({checked: true});
    }
  });

  var ServiceView = Backbone.View.extend({
    tagName: 'li',

    events: {
      'click': 'toggleService'
    },

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      this.$el.html('<input type="checkbox" value="1" name="' + this.model.get('title') + '" />' + this.model.get('title') + '<span>$' + this.model.get('price') + '</span>');
      this.$('input').prop('checked', this.model.get('checked'));

      return this;
    },

    toggleService: function () {
      this.model.toggle();
    }
  });

  var SERVICES = new ServiceList([
    new Service({ "title": "Web Development", "price": 250 }),
    new Service({ "title": "Web Design", "price": 250 }),
    new Service({ "title": "Photography", "price": 100 }),
    new Service({ "title": "Consultation", "price": 150 }),
    new Service({ "title": "Backend Development", "price": 400 }),
    new Service({ "title": "Content Management", "price": 175 }),
    new Service({ "title": "Web Server Administration", "price": 150 }),
    new Service({ "title": "RESTful Service Creation", "price": 500 })
  ]);

  var APP = Backbone.View.extend({
    el: $('#main'),

    initialize: function () {
      this.total = $('#total span');
      this.list = $('#services');
      // console.log(SERVICES);
      this.listenTo(SERVICES, 'change', this.render);

      SERVICES.each(function (service) {
        var view = new ServiceView({model: service});
        this.list.append(view.render().el);
      }, this);
    },

    render: function () {
      var total = 0;

      _.each(SERVICES.getChecked(), function (element) {
        total += element.get('price');
        // console.log(total);
      });

      this.total.text('$' + total);
      return this;
    }
  });

  new APP();
}());
