# coding: utf-8

Gem::Specification.new do |spec|
    spec.name          = "docstrap-theme"
    spec.version       = "v1.0.1"
    spec.authors       = ["Osmar Reyes"]
    spec.email         = ["osmarreyesst@gmail.com"]

    spec.description   = "Metaflux documentation webpage. Powered by Docstrap."
    spec.homepage      = ""
    spec.license       = "MIT"

    spec.files         = git ls-files -z.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }
  end
