require ['trak', 'lodash','cookie'], (Trak, _, cookie) ->

  trak = new Trak()

  # Loop through the interim analytics queue and reapply the calls to their
  # proper analytics.js method.
  queue = window.trak
  window.trak = trak
  while queue and queue.length > 0
    item = queue.shift()
    method = item.shift()
    trak.io[method].apply(trak.io, item) if trak.io[method]

  cookie.defaults.expires = 3650;
  cookie.defaults.path = '/';
  window.cookie = cookie
