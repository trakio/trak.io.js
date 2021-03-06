// Generated by IcedCoffeeScript 1.7.1-b
describe('Trak', function() {
  beforeEach(function() {});
  afterEach(function() {
    var key, _i, _len, _ref;
    trak.cookie.empty();
    _ref = trak.cookie.utils.getKeys(trak.cookie.all());
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      trak.cookie.set(key, 'a', {
        domain: '.lvh.me',
        expires: -1
      });
    }
    trak.cookie.set('_trak_null_id', 'b', {
      expires: -1
    });
    trak.cookie.set('_trak_null_company_id', 'b', {
      expires: -1
    });
    trak.io._protocol = 'https';
    trak.io._host = 'api.trak.io';
    trak.io._current_context = false;
    trak.io._channel = false;
    trak.io._distinct_id = null;
    trak.io._company_id = null;
    trak.io._root_domain = null;
    return trak.io._should_track = true;
  });
  describe('#initialize', function() {
    it("stores api token", function() {
      trak.io.initialize('api_token_value', {
        auto_track_page_views: false
      });
      return trak.io.api_token().should.equal('api_token_value');
    });
    it("stores protocol option", function() {
      trak.io.initialize('api_token_value', {
        protocol: 'http',
        auto_track_page_views: false
      });
      return trak.io.protocol().should.equal('http://');
    });
    it("stores host option", function() {
      trak.io.initialize('api_token_value', {
        host: 'custom_host.com',
        auto_track_page_views: false
      });
      return trak.io.host().should.equal('custom_host.com');
    });
    it("stores context option", function() {
      trak.io.initialize('api_token_value', {
        context: {
          foo: 'bar'
        },
        auto_track_page_views: false
      });
      return trak.io.current_context().should.eql({
        foo: 'bar'
      });
    });
    it("stores channel option", function() {
      trak.io.initialize('api_token_value', {
        channel: 'custom_channel',
        auto_track_page_views: false
      });
      return trak.io.channel().should.equal('custom_channel');
    });
    it("stores company_id option", function() {
      trak.io.initialize('api_token_value', {
        company_id: 'custom_company_id',
        auto_track_page_views: false
      });
      return trak.io.company_id().should.equal('custom_company_id');
    });
    it("stores company_id option", function() {
      trak.io.initialize('api_token_value', {
        company_id: 'custom_company_id',
        auto_track_page_views: false
      });
      return trak.io.company_id().should.equal('custom_company_id');
    });
    it("stores root domain option", function() {
      trak.io.initialize('api_token_value', {
        root_domain: 'root_domain.co.uk',
        auto_track_page_views: false
      });
      return trak.io.root_domain().should.equal('root_domain.co.uk');
    });
    it("stores alias_on_identify option", function() {
      trak.io.initialize('api_token_value', {
        channel: 'custom_channel',
        alias_on_identify: false
      });
      return trak.io.alias_on_identify().should.equal(false);
    });
    it("set up default options", function() {
      var trak;
      trak = new Trak();
      sinon.stub(trak.io, 'get_root_domain').returns('.lvh.me');
      trak.io.initialize('api_token_value', {
        auto_track_page_views: false
      });
      trak.io.protocol().should.equal('https://');
      trak.io.host().should.equal('api.trak.io/v1');
      trak.io.get_root_domain().should.equal('.lvh.me');
      trak.io.current_context().should.eql({});
      trak.io.channel().should.equal(window.location.hostname);
      trak.io.get_root_domain.restore();
      return trak.io.alias_on_identify().should.equal(true);
    });
    it("calls #on_page_ready", function() {
      sinon.stub(trak.io, 'on_page_ready');
      sinon.stub(trak.io, 'url').returns('page_url');
      sinon.stub(trak.io, 'page_title').returns('A page title');
      trak.io.initialize('api_token_value', {
        auto_track_page_views: false
      });
      trak.io.on_page_ready.should.have.been.calledWith(trak.io.page_ready);
      trak.io.on_page_ready.restore();
      trak.io.page_title.restore();
      return trak.io.url.restore();
    });
    it("should not set up automagic by default", function() {
      var script_name;
      trak.io.initialize('api_token_value', {
        auto_track_page_views: false
      });
      trak.io.automagic.should.equal(false);
      script_name = document.location.pathname === '/test/trak.io.min.html' ? 'trak.io.automagic.min.js' : 'trak.io.automagic.js';
      return $("script[src='//" + document.location.host + "/" + script_name + "']").length.should.equal(0);
    });
    return it("should set up automagic if set to true", function() {
      var script, script_name, trak;
      trak = new Trak();
      trak.io.initialize('api_token_value', {
        auto_track_page_views: false,
        automagic: true
      });
      script_name = document.location.pathname === '/test/trak.io.min.html' ? 'trak.io.automagic.min.js' : 'trak.io.automagic.js';
      script = $("script[src='//d29p64779x43zo.cloudfront.net/v1/" + script_name + "']");
      script.length.should.equal(1);
      return script.remove();
    });
  });
  describe('#page_ready', function() {
    return it("doesn't call #page_view if auto_track_page_views is false", function() {
      var trak;
      trak = new Trak();
      trak.io.initialize('api_token_value', {
        auto_track_page_views: false
      });
      sinon.stub(trak.io, 'page_view');
      trak.io.page_ready();
      trak.io.page_view.should.not.have.been.called;
      return trak.io.page_view.restore();
    });
  });
  describe('#initialise', function() {
    return it("aliases #initialize", function() {
      var arg;
      sinon.stub(trak.io, 'initialize');
      arg = 'a';
      trak.io.initialise(arg);
      trak.io.initialize.should.have.been.calledWith(arg);
      return trak.io.initialize.restore();
    });
  });
  describe('#protocol', function() {
    it("returns https by default", function() {
      return trak.io.protocol().should.equal('https://');
    });
    return it("returns provided value plus :// if set", function() {
      trak.io.protocol('http').should.equal('http://');
      return trak.io.protocol().should.equal('http://');
    });
  });
  describe('#host', function() {
    it("returns api.trak.io by default", function() {
      return trak.io.host().should.equal('api.trak.io');
    });
    return it("allows value to be set", function() {
      trak.io.host('custom.com').should.equal('custom.com');
      return trak.io.host().should.equal('custom.com');
    });
  });
  describe('#alias_on_identify', function() {
    it("returns trak.io._alias_on_identify", function() {
      trak.io._alias_on_identify = false;
      return trak.io.alias_on_identify().should.equal(false);
    });
    return it("allows value to be set", function() {
      trak.io._alias_on_identify = false;
      trak.io.alias_on_identify(true);
      return trak.io._alias_on_identify.should.equal(true);
    });
  });
  describe('#call', function() {
    return it("calls .jsonp.call with arguments", function() {
      var argument1, argument2, jsonp_call;
      jsonp_call = sinon.stub(trak.io.jsonp, 'call');
      argument1 = 'a';
      argument2 = 'b';
      trak.io.call(argument1, argument2);
      jsonp_call.should.have.been.calledWith(argument1, argument2);
      return trak.io.jsonp.call.restore();
    });
  });
  describe('#api_token', function() {
    return it("retuns provided api_token", function() {
      trak.io.initialize('my_api_token');
      return trak.io.api_token().should.equal('my_api_token');
    });
  });
  describe('#distinct_id', function() {
    it("generates custom distinct_id if non provided", function() {
      return trak.io.distinct_id().should.match(/[0-9a-f]{7}\-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}/);
    });
    it("returns the provided value", function() {
      trak.io.distinct_id('my_distinct_id').should.equal('my_distinct_id');
      return trak.io.distinct_id().should.equal('my_distinct_id');
    });
    it("sets value in cookie", function() {
      trak.io.distinct_id('my_distinct_id');
      return cookie.get("_trak_" + (trak.io.api_token()) + "_id").should.equal('my_distinct_id');
    });
    it("gets distinct_id based on cookie", function() {
      cookie.set("_trak_" + (trak.io.api_token()) + "_id", 'distinct_id_value2');
      return trak.io.distinct_id().should.equal('distinct_id_value2');
    });
    it("gets distinct_id from url", function() {
      sinon.stub(trak.io, 'url_params').returns('?a=a&trak_distinct_id=%7Basdfasdf%7D&b=b');
      trak.io.distinct_id().should.equal('{asdfasdf}');
      return trak.io.url_params.restore();
    });
    it("takes an numerical value for id", function() {
      trak.io.distinct_id(1234);
      return trak.io.distinct_id().should.eq('1234');
    });
    return it("sets should_track to true", function() {
      var properties;
      properties = {
        foo: 'bar'
      };
      trak.io.should_track(false);
      trak.io.identify(properties);
      return trak.io.should_track().should.equal(true);
    });
  });
  describe('#company_id', function() {
    it("returns the provided value", function() {
      trak.io.company_id('my_company_id').should.equal('my_company_id');
      return trak.io.company_id().should.equal('my_company_id');
    });
    it("sets value in cookie", function() {
      trak.io.company_id('my_company_id');
      return cookie.get("_trak_" + (trak.io.api_token()) + "_company_id").should.equal('my_company_id');
    });
    it("gets company_id based on cookie", function() {
      cookie.set("_trak_" + (trak.io.api_token()) + "_company_id", 'company_id_value2');
      return trak.io.company_id().should.equal('company_id_value2');
    });
    it("gets company_id from url", function() {
      sinon.stub(trak.io, 'url_params').returns('?a=a&trak_company_id=%7Basdfasdf%7D&b=b');
      trak.io.company_id().should.equal('{asdfasdf}');
      return trak.io.url_params.restore();
    });
    return it("takes an numerical value for id", function() {
      trak.io.company_id(1234);
      return trak.io.company_id().should.eq('1234');
    });
  });
  describe('#context', function() {
    it("returns null ip by default, when we sent null to api.trak.io it will fill it in from request", function() {
      return expect(trak.io.context().ip).to.be["null"];
    });
    it("returns user agent by default", function() {
      return trak.io.context().user_agent.should.equal(navigator.userAgent);
    });
    it("returns current url by default", function() {
      sinon.stub(trak.io, 'url').returns('http://example.com/?a=b&c=d');
      trak.io.context().url.should.equal('http://example.com/?a=b&c=d');
      return trak.io.url.restore();
    });
    it("returns params by default", function() {
      sinon.stub(trak.io, 'url').returns('http://example.com/?a=b&c=d');
      trak.io.context().params.should.eql({
        a: 'b',
        c: 'd'
      });
      return trak.io.url.restore();
    });
    it("returns referer by default", function() {
      sinon.stub(trak.io, 'referer').returns('http://referer.com/?a=b&c=d');
      trak.io.context().referer.should.equal('http://referer.com/?a=b&c=d');
      return trak.io.referer.restore();
    });
    it("returns referer params by default", function() {
      sinon.stub(trak.io, 'referer').returns('http://referer.com/?a=b&c=d');
      trak.io.context().referer_params.should.eql({
        a: 'b',
        c: 'd'
      });
      return trak.io.referer.restore();
    });
    it("allows individual contexts to be set", function() {
      trak.io.context('foo', 'bar').foo.should.equal('bar');
      return trak.io.context().foo.should.equal('bar');
    });
    it("allows contexts to be set", function() {
      var added_to, initial;
      initial = trak.io.context({
        override: 'foo',
        keep: 'foo'
      });
      initial.override.should.equal('foo');
      initial.keep.should.equal('foo');
      added_to = trak.io.context({
        override: 'bar',
        add: 'bar'
      });
      added_to.override.should.equal('bar');
      added_to.keep.should.equal('foo');
      return added_to.add.should.equal('bar');
    });
    it("merges provided with defaults", function() {
      var title;
      sinon.stub(trak.io, 'url').returns('http://example.com/?a=b&c=d');
      sinon.stub(trak.io, 'referer').returns('http://referer.com/?a=b&c=d');
      title = document.location.pathname === '/test/trak.io.min.html' ? 'Tests | trak.io.min.js' : 'Tests | trak.io.js';
      trak.io.context({
        foo: 'bar'
      }).should.eql({
        ip: null,
        user_agent: navigator.userAgent,
        page_title: title,
        url: 'http://example.com/?a=b&c=d',
        referer: 'http://referer.com/?a=b&c=d',
        params: {
          a: 'b',
          c: 'd'
        },
        referer_params: {
          a: 'b',
          c: 'd'
        },
        foo: 'bar'
      });
      trak.io.url.restore();
      return trak.io.referer.restore();
    });
    it("stores any additional contexts in a cookie", function() {
      trak.io.context('foo', 'bar');
      return cookie.get("_trak_" + (trak.io.api_token()) + "_context").should.eql(JSON.stringify({
        foo: 'bar'
      }));
    });
    return it("retrieve any additional contexts in a cookie", function() {
      cookie.set("_trak_" + (trak.io.api_token()) + "_context", JSON.stringify({
        foo: 'bar'
      }));
      return trak.io.context().foo.should.equal('bar');
    });
  });
  describe('#channel', function() {
    it("returns the current hostname by default", function() {
      return trak.io.channel().should.equal(window.location.hostname);
    });
    it("returns provided value if set", function() {
      trak.io.channel('custom_channel').should.equal('custom_channel');
      return trak.io.channel().should.equal('custom_channel');
    });
    it("stores value in cookie", function() {
      trak.io.channel('cookie_channel');
      return cookie.get("_trak_" + (trak.io.api_token()) + "_channel").should.eql('cookie_channel');
    });
    return it("retrieve any additional channel in a cookie", function() {
      cookie.set("_trak_" + (trak.io.api_token()) + "_channel", 'cookie_channel');
      return trak.io.channel().should.equal('cookie_channel');
    });
  });
  describe('#should_track', function() {
    it("is false by default", function() {
      var clean_trak;
      clean_trak = new Trak();
      return clean_trak.should_track().should.equal(false);
    });
    it("returns provided value if set", function() {
      trak.io.should_track(true).should.equal(true);
      return trak.io.should_track().should.equal(true);
    });
    it("stores value in cookie", function() {
      trak.io.should_track(true);
      cookie.get("_trak_" + (trak.io.api_token()) + "_should_track").should.eql('true');
      trak.io.should_track(false);
      return cookie.get("_trak_" + (trak.io.api_token()) + "_should_track").should.eql('false');
    });
    return it("retrieve should_track from a cookie", function() {
      cookie.set("_trak_" + (trak.io.api_token()) + "_should_track", 'true');
      trak.io.should_track().should.equal(true);
      trak.io._should_track = null;
      cookie.set("_trak_" + (trak.io.api_token()) + "_should_track", 'false');
      return trak.io.should_track().should.equal(false);
    });
  });
  describe('#root_domain', function() {
    it("returns the current root domain by default", function() {
      sinon.stub(trak.io, 'get_root_domain').returns('.lvh.me');
      trak.io.root_domain().should.equal('.lvh.me');
      return trak.io.get_root_domain.restore();
    });
    return it("returns provided value if set", function() {
      trak.io.root_domain('custom.lvh.me').should.equal('custom.lvh.me');
      return trak.io.root_domain().should.equal('custom.lvh.me');
    });
  });
  describe('#get_root_domain', function() {
    it("returns ip address", function() {
      sinon.stub(trak.io, 'hostname').returns('127.0.0.1');
      trak.io.get_root_domain().should.equal('127.0.0.1');
      return trak.io.hostname.restore();
    });
    it("returns 'localhost'", function() {
      sinon.stub(trak.io, 'hostname').returns('localhost');
      trak.io.get_root_domain().should.equal('localhost');
      return trak.io.hostname.restore();
    });
    it("returns highest domain that a cookie can be set for", function() {
      sinon.stub(trak.io, 'hostname').returns('a.b.c.d');
      sinon.stub(trak.io, 'can_set_cookie', function(options) {
        return options.domain === 'c.d';
      });
      trak.io.get_root_domain().should.equal('c.d');
      trak.io.hostname.restore();
      return trak.io.can_set_cookie.restore();
    });
    return it("returns provided value if set", function() {
      trak.io.root_domain('custom.lvh.me').should.equal('custom.lvh.me');
      return trak.io.root_domain().should.equal('custom.lvh.me');
    });
  });
  return describe('#sign_out', function() {
    it("resets the distinct_id to a new randomly generate GUID", function() {
      trak.io.distinct_id('my_distinct_id');
      trak.io.sign_out();
      trak.io.distinct_id().should.not.eq('my_distinct_id');
      return cookie.get("_trak_" + (trak.io.api_token()) + "_id").should.not.eq('my_distinct_id');
    });
    it("doesn't call alias", function() {
      sinon.stub(trak.io, 'alias');
      trak.io.sign_out();
      trak.io.alias.should.not.have.been.called;
      return trak.io.alias.restore();
    });
    it("resets the company_id to null", function() {
      trak.io.company_id('my_company_id');
      trak.io.sign_out();
      return setTimeout(function() {
        trak.io.company_id().should.not.eq('my_company_id');
        return cookie.get("_trak_" + (trak.io.api_token()) + "_company_id").should.not.eq('my_company_id');
      }, 50);
    });
    return it("sets should track to false", function() {
      trak.io.should_track(true);
      trak.io.sign_out();
      return trak.io.should_track().should.equal(false);
    });
  });
});
