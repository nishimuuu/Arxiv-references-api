require 'sinatra'
require 'arxiv/references/myUtil'
require 'sinatra/cross_origin'


get '/arxiv-references/api/v0.1.4/fetch' do
  cross_origin
  key = params['type']
  value = params['value']
  begin
    case key
      when 'id'
        return ArxivUtil.fetchFromArxivId value, './'
      when 'pdfurl'
        return ArxivUtil.fetchFromPdfUrl value, './'
      when 'url'
        return ArxivUtil.fetchFromUrl value, './'
      else
        halt 400, 'Type is not found (accept only id/pdfurl/url)'
    end
  rescue
    halt 400, "Your value: #{value} is not found"
  end
end

