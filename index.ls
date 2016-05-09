display_page = (pagename) ->
  $('.toplevel').hide!
  if pagename?
    $('#' + pagename).show!

extension_not_installed = ->
  display_page 'please_install_extension'
  once_extension_installed ->
    extension_is_installed!

not_enough_browsing_history = ->
  display_page 'not_enough_browsing_history'

start_survey = ->
  display_page 'survey'

export submit_survey = ->
  display_page 'submitting_please_wait'
  start_spinner!
  data1 <- getFieldsFromExtensionUncached ['chrome_history_pages_compressed']
  data2 <- getFieldsFromExtensionUncached ['chrome_history_visits_compressed_parts']
  console.log data1
  console.log data2
  hid = Date.now()
  <- post_history_pages_compressed data1.chrome_history_pages_compressed, hid
  <- post_history_visits_compressed_parts data2.chrome_history_visits_compressed_parts, hid
  survey_finished()

survey_finished = ->
  end_spinner!
  display_page 'finished'

extension_is_installed = ->
  eligible <- get_eligibility!
  if eligible
    start_survey!
  else
    not_enough_browsing_history!

get_username = ->
  params = getUrlParameters()
  if params.user?
    return params.user
  if params.username?
    return params.username
  return 'guest' + [Math.floor(10*Math.random()) for i from 0 to 10].join('')

$(document).ready ->
  export username = get_username()
  display_page null
  is_installed <- is_extension_installed!
  if is_installed
    extension_is_installed()
  else
    extension_not_installed()
