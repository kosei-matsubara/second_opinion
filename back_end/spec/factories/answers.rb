FactoryBot.define do
  factory :answer do
    content { Faker::Lorem.sentence(word_count: 10) }
    association :user
    association :article
  end
end
