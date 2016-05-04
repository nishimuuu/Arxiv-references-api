require 'sinatra'
require 'arxiv/references/ArxivUtil'
require 'sinatra/cross_origin'

not_found do
    '404 not found'
end

get '/arxiv-references/api/v0.1.4/fetch' do
  cross_origin
  key = params['type']
  value = params['value']
  begin
    case key
      when 'id'
        return ArxivUtil.fetchFromArxivId(value, '/tmp', true, true).to_json
      when 'pdfurl'
        return ArxivUtil.fetchFromPdfUrl(value, '/tmp', true, true).to_json
      when 'url'
        return ArxivUtil.fetchFromUrl(value, '/tmp', true).to_json
      else
        halt 400, 'Type is not found (accept only id/pdfurl/url)'
    end
  rescue => e
    halt 400, "Your value: #{value} is not found. error: #{e.to_s}"
  end
end

