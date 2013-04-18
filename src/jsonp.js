// Generated by IcedCoffeeScript 1.4.0c

define(['exceptions', 'json2'], function(Exceptions, JSON) {
  var JSONP;
  return JSONP = (function() {

    function JSONP() {}

    JSONP.prototype.count = 0;

    JSONP.prototype.call = function(endpoint, params) {
      return this.jsonp(this.url(endpoint, params));
    };

    JSONP.prototype.url = function(endpoint, params) {
      return trak.io.protocol() + trak.io.host() + '/' + endpoint + this.params(endpoint, params);
    };

    JSONP.prototype.params = function(endpoint, provided_params) {
      var as_array, k, params, v;
      params = this.default_params(endpoint);
      _.merge(params, provided_params, function(a, b) {
        if (_.isArray(a)) {
          return _.uniq(a.concat(b));
        } else {
          return void 0;
        }
      });
      as_array = [];
      for (k in params) {
        v = params[k];
        if (_.isArray(v) || _.isObject(v)) v = JSON.stringify(v);
        as_array.push(k + '=' + encodeURIComponent(v));
      }
      return '?' + as_array.join('&');
    };

    JSONP.prototype.default_params = function(endpoint) {
      switch (endpoint) {
        case 'identify':
          return {
            token: trak.io.api_token(),
            data: {
              distinct_id: trak.io.distinct_id(),
              time: new Date(),
              properties: {}
            }
          };
        case 'alias':
          return {
            token: trak.io.api_token(),
            data: {
              distinct_id: trak.io.distinct_id(),
              time: new Date()
            }
          };
        case 'track':
          return {
            token: trak.io.api_token(),
            data: {
              distinct_id: trak.io.distinct_id(),
              time: new Date(),
              properties: {},
              medium: trak.io.medium(),
              context: trak.io.context()
            }
          };
        default:
          return {};
      }
    };

    JSONP.prototype.callback = function(data) {
      var exception_class;
      if (data && data.status && data.status === 'success') {} else if (data.exception && (exception_class = Exceptions[data.exception.match(/\:\:([a-zA-Z0-9]+)$/)[1]])) {
        throw new exception_class(data.message, data.code, data.details, data);
      } else {
        throw new Exceptions.Unknown(data.message, data.code, data.details, data);
      }
    };

    JSONP.prototype.noop = function() {};

    JSONP.prototype.jsonp = function(url) {
      var cleanup, id, me, script, target, timeout, timer;
      timeout = 10000;
      target = document.getElementsByTagName('script')[0];
      script;
      timer;
      id = this.count++;
      me = this;
      if (timeout) {
        timer = setTimeout(function() {
          cleanup();
          return me.callback({
            status: 'error',
            exception: 'TrakioAPI::Exceptions::Timeout',
            message: "The server failed to respond in time."
          });
        }, timeout);
      }
      cleanup = function() {
        script.parentNode.removeChild(script);
        return window['__trak' + id] = this.noop;
      };
      me = this;
      window['__trak' + id] = function(data) {
        if (timer) clearTimeout(timer);
        cleanup();
        return me.callback(data);
      };
      url += (~url.indexOf('?') ? '&' : '?') + 'callback=' + encodeURIComponent('__trak' + id + '');
      url = url.replace('?&', '?');
      script = document.createElement('script');
      script.src = url;
      return target.parentNode.insertBefore(script, target);
    };

    return JSONP;

  })();
});
