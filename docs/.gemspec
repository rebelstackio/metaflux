# coding: utf-8

Gem::Specification.new do |spec|
    spec.name          = "docstrap-theme"
    spec.version       = "v1.0.1"
    spec.authors       = ["Osmar Reyes"]
    spec.email         = ["osmarreyesst@gmail.com"]

    spec.summary       = %q{Docstrap documentation theme}
    spec.description   = "Docstrap is a open source theme for your documentation"
    spec.homepage      = ""
    spec.license       = "MIT"

    spec.files         = git ls-files -z.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

    spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.6.1"

    spec.add_development_dependency "jekyll", "~> 4.1.1"
    spec.add_development_dependency "bundler", "~> 1.17.2"
  end
