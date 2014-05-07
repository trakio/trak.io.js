// Generated by IcedCoffeeScript 1.7.1-b
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['trakio/lodash'], function(_) {
  var Identify;
  return Identify = (function() {
    function Identify() {
      this.map_properties = __bind(this.map_properties, this);
      this.distinct_id = __bind(this.distinct_id, this);
      this.form_submitted = __bind(this.form_submitted, this);
      this.page_ready = __bind(this.page_ready, this);
      this.initialize = __bind(this.initialize, this);
    }

    Identify.prototype.initialize = function(automagic, options) {
      this.automagic = automagic;
      this.options = options;
    };

    Identify.prototype.page_ready = function() {};

    Identify.prototype.form_submitted = function(event, callback) {
      var form, has_all, has_any, properties;
      try {
        event.preventDefault();
        form = event.srcElement || event.target;
        callback || (callback = function() {
          return form.submit();
        });
        if (_.matches(form, this.options.form_selector)) {
          properties = this.map_properties(form);
          has_any = _.filter(properties, (function(_this) {
            return function(value, key) {
              return _.contains(_this.options.has_any_fields, key);
            };
          })(this)).length > 0;
          has_all = _.filter(properties, (function(_this) {
            return function(value, key) {
              return _.contains(_this.options.has_all_fields, key);
            };
          })(this)).length >= this.options.has_all_fields.length;
          if (has_any && has_all) {
            trak.io.identify(this.distinct_id(form), properties, callback);
          } else {
            callback();
          }
        } else {
          callback();
        }
        return false;
      } catch (_error) {
        return callback();
      }
    };

    Identify.prototype.distinct_id = function(form) {
      var index, key, property, r, value, _ref;
      r = {};
      _ref = this.map_properties(form);
      for (property in _ref) {
        value = _ref[property];
        if ((index = _.indexOf(this.options.distinct_ids, property)) > -1) {
          r[index] = value;
        }
      }
      for (key in r) {
        value = r[key];
        if (value && value !== "") {
          return value;
        }
      }
      return trak.io.distinct_id();
    };

    Identify.prototype.map_properties = function(form) {
      var field, input, inputs, name, property, r, value, _i, _len, _ref;
      inputs = _.find("input", form);
      r = {};
      for (_i = 0, _len = inputs.length; _i < _len; _i++) {
        input = inputs[_i];
        if (!_.matches(input, this.options.excluded_field_selector)) {
          name = _.attr(input, 'name');
          _ref = this.options.property_map;
          for (property in _ref) {
            field = _ref[property];
            if (typeof field === 'string' && field === name || typeof field.test === 'function' && field.test(name)) {
              value = input.value;
              if (value && value !== "") {
                r[property] = value;
              }
              break;
            }
          }
        }
      }
      return r;
    };

    return Identify;

  })();
});