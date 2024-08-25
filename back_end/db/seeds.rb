ActiveRecord::Base.transaction do
  user1 = User.create!(name: "テスト保険契約者-1", email: "test101@example.com", password: "password", confirmed_at: Time.current, user_division: "policyholder", sex: "male", generation: "twenties", family_structure: "single", prefectures: "東京都")
  user2 = User.create!(name: "テスト保険契約者-2", email: "test102@example.com", password: "password", confirmed_at: Time.current, user_division: "policyholder", sex: "female", generation: "thirties", family_structure: "couple_with_children", prefectures: "沖縄県")
  user3 = User.create!(name: "テスト保険営業者-1", email: "test103@example.com", password: "password", confirmed_at: Time.current, user_division: "insurance_agent", belong: "テスト大地生命", address: "テスト東京都豊島区南池袋1-16-4", self_introduction: "テスト自己紹介-1", my_strength: "テストわたしの強み-1", career: "テスト経歴-1", message: "テスト相談者へのメッセージ-1", access: "テストアクセス-1", website: "テストホームページ-1", inquiry_opening_time: "テスト問い合わせ_受付時間-1", inquiry_telephone_number: "テスト問い合わせ_電話番号-1")
  user4 = User.create!(name: "テスト保険営業者-2", email: "test104@example.com", password: "password", confirmed_at: Time.current, user_division: "insurance_agent", belong: "テスト令和生命", address: "テスト東京都豊島区南池袋2-16-4", self_introduction: "テスト自己紹介-2", my_strength: "テストわたしの強み-2", career: "テスト経歴-2", message: "テスト相談者へのメッセージ-2", access: "テストアクセス-2", website: "テストホームページ-2", inquiry_opening_time: "テスト問い合わせ_受付時間-2", inquiry_telephone_number: "テスト問い合わせ_電話番号-2")
  user5 = User.create!(name: "ゲストユーザー", email: "guest@example.com", password: "guestpassword", confirmed_at: Time.current, user_division: "insurance_agent", sex: "female", generation: "thirties", family_structure: "couple_with_children", prefectures: "沖縄県", belong: "テスト昭和生命", address: "テスト東京都豊島区南池袋3-16-4", self_introduction: "テスト自己紹介-3", my_strength: "テストわたしの強み-3", career: "テスト経歴-3", message: "テスト相談者へのメッセージ-3", access: "テストアクセス-3", website: "テストホームページ-3", inquiry_opening_time: "テスト問い合わせ_受付時間-3", inquiry_telephone_number: "テスト問い合わせ_電話番号-3")

  15.times do |i|
    User.create!(name: "テスト保険営業者-#{i}", email: "test#{i}@example.com", password: "password", confirmed_at: Time.current, user_division: "insurance_agent", belong: "テスト大地生命", address: "テスト東京都豊島区南池袋1-16-#{i}", self_introduction: "テスト自己紹介-#{i}", my_strength: "テストわたしの強み-#{i}", career: "テスト経歴-#{i}", message: "テスト相談者へのメッセージ-#{i}", access: "テストアクセス-#{i}", website: "テストホームページ-#{i}", inquiry_opening_time: "テスト問い合わせ_受付時間-#{i}", inquiry_telephone_number: "テスト問い合わせ_電話番号-#{i}")
  end

  15.times do |i|
    article1 = Article.create!(categories: "定期保険", title: "テストタイトル1-#{i}", background: "テスト背景1-#{i}", content: "テスト本文質問1-#{i}", status: :published, user: user1)
    Answer.create!(content: "テスト本文回答1-#{i}", article: article1, user_id: user1.id)
    Answer.create!(content: "テスト本文回答2-#{i}", article: article1, user_id: user2.id)
    Answer.create!(content: "テスト本文回答3-#{i}", article: article1, user_id: user3.id)
    Answer.create!(content: "テスト本文回答4-#{i}", article: article1, user_id: user4.id)
    Answer.create!(content: "テスト本文回答5-#{i}", article: article1, user_id: user5.id)
    article2 = Article.create!(categories: "定期保険", title: "テストタイトル2-#{i}", background: "テスト背景2-#{i}", content: "テスト本文質問2-#{i}", status: :published, user: user2)
    Answer.create!(content: "テスト本文回答1-#{i}", article: article2, user_id: user1.id)
    Article.create!(categories: "定期保険", title: "テストタイトル3-#{i}", background: "テスト背景3-#{i}", content: "テスト本文質問3-#{i}", status: :published, user: user3)
    Article.create!(categories: "定期保険", title: "テストタイトル4-#{i}", background: "テスト背景4-#{i}", content: "テスト本文質問4-#{i}", status: :published, user: user4)
    Article.create!(categories: "定期保険", title: "テストタイトル5-#{i}", background: "テスト背景5-#{i}", content: "テスト本文質問5-#{i}", status: :published, user: user5)
  end
end
