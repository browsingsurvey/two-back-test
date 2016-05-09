history_pages = require './Schema/history_pages'
history_visits = require './Schema/history_visits'
LZString = require 'lz-string'

uncompress_data_field = (doc) ->
  if not doc? or not doc.data? or typeof(doc.data) != 'string'
    return doc
  doc.data = JSON.parse LZString.decompressFromBase64 doc.data
  return doc

exports = module.exports = (app) ->
  
  app.get '/view_history_pages', (req, res) ->
    history_pages.find!lean!exec (err, docs) ->
      res.type 'text/plain'
      res.send JSON.stringify [uncompress_data_field(doc) for doc in docs]

  app.get '/view_history_visits', (req, res) ->
    history_visits.find!lean!exec (err, docs) ->
      res.type 'text/plain'
      res.send JSON.stringify [uncompress_data_field(doc) for doc in docs]

  app.get '/view_history_pages_first', (req, res) ->
    history_pages.findOne!lean!exec (err, doc) ->
      res.type 'text/plain'
      res.send JSON.stringify uncompress_data_field(doc)

  app.get '/view_history_visits_first', (req, res) ->
    history_visits.findOne!lean!exec (err, doc) ->
      res.type 'text/plain'
      res.send JSON.stringify uncompress_data_field(doc)
