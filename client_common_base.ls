export getUrlParameters = ->
  url = window.location.href
  hash = url.lastIndexOf('#')
  if hash != -1
    url = url.slice(0, hash)
  map = {}
  parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m,key,value) ->
    #map[key] = decodeURI(value).split('+').join(' ').split('%2C').join(',') # for whatever reason this seems necessary?
    map[key] = decodeURIComponent(value).split('+').join(' ') # for whatever reason this seems necessary?
  )
  return map

export once_available = (selector, callback) ->
  current_result = document.querySelectorAll(selector)
  if current_result.length > 0
    callback current_result
  else
    setTimeout ->
      once_available selector, callback
    , 100

export once_extension_installed = (callback) ->
  is_extension_installed (is_installed) ->
    if is_installed
      return callback!
    else
      setTimeout ->
        once_extension_installed callback
      , 1000

export is_extension_installed = (callback) ->
  sendExtension 'is_extension_installed', {}, (response) ->
    callback response == true

export getFieldsFromExtension = (fields_list, callback) ->
  once_extension_installed ->
    sendExtension 'requestfields', {fieldnames: fields_list, pagename: 'something'}, (response) ->
      callback response

export getFieldsFromExtensionUncached = (fields_list, callback) ->
  once_extension_installed ->
    sendExtension 'requestfields_uncached', {fieldnames: fields_list, pagename: 'something'}, (response) ->
      callback response

export start_spinner = ->
  if $('#spinoverlay').length == 0
    $('<div id="spinoverlay" style="width: 100vw; height: 100vh; position: fixed; top: 0px; left: 0px; pointer-events: none"></div>').appendTo('body')
  $('#spinoverlay').spin({scale: 5.0})

export end_spinner = ->
  $('#spinoverlay').spin(false)
