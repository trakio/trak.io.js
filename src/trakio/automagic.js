// Generated by IcedCoffeeScript 1.7.1-b
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

define(['trakio/lodash', 'trakio/automagic/identify', 'trakio/automagic/track'], function(_, Identify, Track) {
  var Automagic, instance, _i, _len, _ref, _results;
  Automagic = (function() {
    function Automagic() {
      this.event_fired = __bind(this.event_fired, this);
      this.emulated_event_fired = __bind(this.emulated_event_fired, this);
      this.bind_events = __bind(this.bind_events, this);
      this.submit_bubbles = __bind(this.submit_bubbles, this);
      this.page_ready = __bind(this.page_ready, this);
      this.page_body = __bind(this.page_body, this);
      this.merge_options = __bind(this.merge_options, this);
    }

    Automagic.prototype.default_options = {
      test_hooks: [],
      bind_events: true,
      selector: 'form',
      identify: {
        selector: 'form',
        excluded_field_selector: '[type=password]',
        property_map: {
          username: /.*username.*/,
          name: /^(?!(.*first.*|.*last.*|.*user|.*f.?|.*l.?)name).*name.*/,
          first_name: /.*(first.*|f.?)name.*/,
          last_name: /.*(last.*|l.?)name.*/,
          email: /.*email.*/,
          position: /.*position.*/,
          company: /.*company.*/,
          organization: /.*organi(z|s)ation.*/,
          industry: /.*industry.*/,
          location: /.*location.*/,
          latlng: /.*latl(ng|on).*/,
          birthday: /.*(birthday|dob|date.*of.*birth).*/
        },
        has_any_fields: ['username', 'name', 'first_name', 'last_name', 'email'],
        has_all_fields: [],
        distinct_ids: ['username', 'email'],
        should_identify: function(element, event) {
          return this.identify.should_identify(element, event);
        }
      },
      track: {
        selector: 'form',
        should_track: function(element, event) {
          return this.track.should_track(element, event);
        },
        should_track_events: {
          signed_in: function(element, event) {
            return this.track.should_track_events.signed_in.call(this.track, element, event);
          },
          signed_up: function(element, event) {
            return this.track.should_track_events.signed_up.call(this.track, element, event);
          },
          subscribed_with_email: function(element, event) {
            return this.track.should_track_events.subscribed_with_email.call(this.track, element, event);
          },
          submitted_form: function(element, event) {
            return this.track.should_track_events.submitted_form.call(this.track, element, event);
          }
        }
      }
    };

    Automagic.prototype.initialize = function(options) {
      var e;
      if (options == null) {
        options = {};
      }
      try {
        this.options = _.cloneDeep(this.default_options);
        _.merge(this.options, options, this.merge_options);
        this.identify = new Identify();
        this.identify.initialize(this, this.options.identify);
        this.track = new Track();
        this.track.initialize(this, this.options.track);
        if (trak.io.page_ready_event_fired) {
          this.page_ready();
        }
        return this;
      } catch (_error) {
        e = _error;
        return trak.io.debug_error(e);
      }
    };

    Automagic.prototype.merge_options = function(a, b) {
      if (_.isArray(a)) {
        return b;
      } else {
        return void 0;
      }
    };

    Automagic.prototype.page_body = function() {
      return _.find('body')[0];
    };

    Automagic.prototype.page_ready = function() {
      _.attr(this.page_body(), 'data-trakio-automagic', '1');
      this.identify.page_ready();
      this.track.page_ready();
      if (this.options.bind_events) {
        return this.bind_events();
      }
    };

    Automagic.prototype.submit_bubbles = function() {
      return __indexOf.call(window, 'onsubmit') >= 0;
    };

    Automagic.prototype.bind_events = function() {
      var body;
      try {
        body = document.body || document.getElementsByTagName('body')[0];
        if (this.submit_bubbles()) {
          return _.addEvent(body, 'submit', this.event_fired);
        } else {
          _.addEvent(body, 'click', this.emulated_event_fired);
          return _.addEvent(body, 'keypress', this.emulated_event_fired);
        }
      } catch (_error) {}
    };

    Automagic.prototype.emulated_event_fired = function(event, callback) {
      var form, keycode, parent, target;
      target = event.srcElement || event.target;
      if (target.nodeName === 'INPUT' || target.nodeName === 'BUTTON') {
        if (target.form) {
          form = target.form;
        } else {
          parent = target.parentNode;
          while (parent && parent.nodeName !== 'FORM') {
            parent = target.parentNode;
          }
          if (parent.nodeName === 'FORM') {
            form = parent;
          }
        }
      }
      if (!(form && event.type)) {
        return;
      }
      if (event.type === 'click' && target.type === 'submit') {
        return this.event_fired(event, callback);
      } else if (event.type === 'keypress') {
        keycode = event.keyCode || event.which;
        if (keycode === 13) {
          return this.event_fired(event, callback);
        }
      }
    };

    Automagic.prototype.event_fired = function(event, provided_callback) {
      var automagic_ready, callback, e, element, timeout;
      try {
        element = event.srcElement || event.target;
        event.preventDefault();
        automagic_ready = {
          identify: false,
          track: false
        };
        timeout = setTimeout(function() {
          if (provided_callback) {
            return provided_callback();
          } else {
            return element.submit();
          }
        }, 1000);
        callback = function() {
          clearTimeout(timeout);
          if (automagic_ready.identify && automagic_ready.track) {
            if (provided_callback) {
              provided_callback();
            } else {
              element.submit();
            }
            return true;
          }
        };
        this.identify.event_fired(element, event, callback, automagic_ready);
        this.track.event_fired(element, event, callback, automagic_ready);
        return false;
      } catch (_error) {
        e = _error;
        trak.io.debug_error(e);
        event.automagic_ready = {
          identify: true,
          track: true
        };
        event.callback();
        return true;
      }
    };

    return Automagic;

  })();
  Trak.Automagic = Automagic;
  Trak.Automagic.Identify = Identify;
  Trak.Automagic.Track = Track;
  _ref = Trak.instances;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    instance = _ref[_i];
    _results.push(instance.loaded_automagic());
  }
  return _results;
});
