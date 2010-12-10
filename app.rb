require 'rubygems'
require 'sinatra'

configure do
  class << Sinatra::Base
    def options(path, opts={}, &block)
      route 'OPTIONS', path, opts, &block
    end
  end
  Sinatra::Delegator.delegate :options
end

options '/' do
  response.headers["Access-Control-Allow-Origin"] = "*"
  response.headers["Access-Control-Allow-Methods"] = "POST"
end

get '/' do
  erb :index
end

get '/about' do
  erb :about
end

get '/terms' do
  erb :terms
end

get '/new' do
  erb :new
end

post '/' do
  path = params[:path]
  file = params[:file][:tempfile] if params[:file]
  name = params[:file][:filename] if params[:file]
  
  if path and file and name
    
    identifier = `uuidgen`
    extension = File.extname(name)
  
    path = path.gsub(/:identifier/, identifier)
    path = path.gsub(/:extension/, extension)
    
  end
  
  erb :new
end