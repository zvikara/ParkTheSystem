# This file is used by Rack-based servers to start the application.

use Rack::Static, 
  :urls => ["/img", "/js", "/css"],
  :root => "public"

require ::File.expand_path('../config/environment',  __FILE__)
run Rails.application
