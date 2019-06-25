FactoryBot.define do
  factory :message do
    image           {File.open("#{Rails.root}/public/images/S__13402118.jpg")}
    body            {Faker::Lorem.sentence}
    user         
    group      
  end
end