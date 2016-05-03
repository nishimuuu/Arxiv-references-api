require 'sinatra'
require 'arxiv/references/myUtil'
require 'sinatra/cross_origin'

get '/' do
  send_file './assets/html/index.html'
end

get '/api' do
  send_file './doc/api/api.html'
end

get '/bundle.js' do
  send_file './assets/js/bundle.js'
end


get '/arxiv-references/api/v0.1.4/fetch' do
  cross_origin
  key = params['type']
  value = params['value']
  begin
    case key
      when 'id'
        return ArxivUtil.fetchFromArxivId value, '/tmp', false
      when 'pdfurl'
        return ArxivUtil.fetchFromPdfUrl value, '/tmp', false
      when 'url'
        return ArxivUtil.fetchFromUrl value, '/tmp', false
      else
        halt 400, 'Type is not found (accept only id/pdfurl/url)'
    end
  rescue
    halt 400, "Your value: #{value} is not found"
  end
end

