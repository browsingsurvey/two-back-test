
export get_num_days_with_browsing = (callback) ->
  data <- getFieldsFromExtensionUncached ['chrome_history_num_days_with_browsing']
  callback data.chrome_history_num_days_with_browsing

export get_eligibility = (callback) ->
  num_days_with_browsing <- get_num_days_with_browsing!
  callback num_days_with_browsing > 20 # have at least 20 days

post_json = (url, data, callback) ->  
  $.ajax {
    type: 'POST'
    url: url
    contentType: 'application/json'
    data: JSON.stringify(data)
    error: (err) ->
      console.log 'had error while posting data'
      console.log err
    complete: ->
      callback?!
  }

post_history_pages_compressed = (history_pages, hid, callback) ->
  post_json '/log_history_pages', {
    data: history_pages
    user: username
    hid
    time: hid
    timeloc: new Date(hid).toString()
  }, callback

post_history_visits_compressed_parts = (history_visits_parts, hid, callback) ->
  num_parts = history_visits_parts.length
  <- async.forEachOfSeries history_visits_parts, (history_visits, idx, donecb) ->
    post_json '/log_history_visits', {
      data: history_visits
      user: username
      hid
      time: hid
      timeloc: new Date(hid).toString()
      idx
      totalparts: num_parts
    }, donecb
  callback?!

post_history = (data, callback) ->
  <- post_history_pages data.chrome_history_pages
  <- post_history_visits data.chrome_history_visits
  callback?!

export submit_browsing_history = (callback) ->
  #start_spinner!
  console.log 'submit_browsing_history'
  data1 <- getFieldsFromExtensionUncached ['chrome_history_pages_compressed']
  data2 <- getFieldsFromExtensionUncached ['chrome_history_visits_compressed_parts']
  hid = Date.now()
  <- post_history_pages_compressed data1.chrome_history_pages_compressed, hid
  <- post_history_visits_compressed_parts data2.chrome_history_visits_compressed_parts, hid
  #end_spinner!
  callback!
