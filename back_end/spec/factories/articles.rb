FactoryBot.define do
  factory :article do
    categories { Faker::Commerce.department}
    title { Faker::Lorem.sentence }
    # background { Faker::}
    content { Faker::Lorem.paragraph }
    status { :published }
    user
  end
end
