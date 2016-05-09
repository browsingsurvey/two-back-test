history_pages = require './Schema/history_pages'
history_visits = require './Schema/history_visits'

exports = module.exports = (app) ->
  
  app.post '/log_history_pages', (req, res) ->
    {body} = req
    history_pages.create body, (err, res2) ->
      res.send ''

  app.post '/log_history_visits', (req, res) ->
    {body} = req
    history_visits.create body, (err, res2) ->
      res.send ''