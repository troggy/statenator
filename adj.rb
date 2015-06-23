require 'nokogiri'
require 'open-uri'

doc = Nokogiri::HTML(open('http://publications.europa.eu/code/en/en-5000500.htm'))
rows = doc.xpath('//table[@id="listOfCountriesTable"]//tr')
puts '{ '
rows.each do |row|
    next if (row.css("td").length == 0 || row.css("td")[6].nil?)
    puts ' "' + row.css("td")[1].content + '" : "' + row.css("td")[6].content + '",'
end

puts '}'

