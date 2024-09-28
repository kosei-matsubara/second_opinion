ActiveRecord::Base.transaction do

  # 保険契約者データ
  user1 = User.create!(
    name: "ゲストユーザー",
    email: "guest@example.com",
    password: "guestpassword",
    confirmed_at: Time.current,
    user_division: "insurance_agent",
    sex: "female",
    generation: "thirties",
    family_structure: "couple_with_children",
    prefectures: "沖縄県",
    belong: "テスト昭和生命",
    address: "テスト東京都豊島区南池袋3-16-4",
    self_introduction: "テスト自己紹介-3",
    my_strength: "テストわたしの強み-3",
    career: "テスト経歴-3",
    message: "テスト相談者へのメッセージ-3",
    access: "テストアクセス-3",
    website: "テストホームページ-3",
    inquiry_opening_time: "テスト問い合わせ_受付時間-3",
    inquiry_telephone_number: "テスト問い合わせ_電話番号-3"
  )
  user2 = User.create!(
    name: "吉田 英樹",
    email: "test101@example.com",
    password: "password",
    confirmed_at: Time.current,
    user_division: "policyholder",
    sex: "male",
    generation: "twenties",
    family_structure: "single",
    prefectures: "東京都"
  )
  user3 = User.create!(
    name: "中村 満",
    email: "test102@example.com",
    password: "password",
    confirmed_at: Time.current,
    user_division: "policyholder",
    sex: "male",
    generation: "fifties",
    family_structure: "couple",
    prefectures: "福島県"
  )
  user4 = User.create!(
    name: "佐藤 直美",
    email: "test103@example.com",
    password: "password",
    confirmed_at: Time.current,
    user_division: "policyholder",
    sex: "female",
    generation: "forties",
    family_structure: "couple_with_children",
    prefectures: "和歌山県"
  )
  user5 = User.create!(
    name: "金ヶ崎 絵美",
    email: "test104@example.com",
    password: "password",
    confirmed_at: Time.current,
    user_division: "policyholder",
    sex: "female",
    generation: "thirties",
    family_structure: "single",
    prefectures: "大阪府"
  )

  # 保険営業者データ
  user6 = User.create!(
    name: "網谷 里帆",
    email: "test105@example.com",
    password: "password",
    confirmed_at: Time.current,
    user_division: "insurance_agent",
    belong: "大地生命",
    address: "東京都千代田区紀尾井町9-30 紀尾井町松本ビル2F",
    self_introduction: "私は10年以上にわたって保険業界に携わってきました。ファイナンシャルプランナー資格を活用してお客様の安心と資産形成の両方を強力に支援します。",
    my_strength: "モットーはすぐ行動する（クイックレスポンス）、チャレンジポジティブで高い志を持ち絶対にあきらめないことです。",
    career: "2009年大地生命保険相互会社入社",
    message: "保険は目に見えない、人を信頼して買うのです。お客様から信頼されるパートナーとして日々精進し、お客様と共に成長し続けたいと思います。",
    access: "東京メトロ「麹町」駅・「永田町」駅より徒歩5分",
    website: "https://www.dai-chi-life.co.jp",
    inquiry_opening_time: "平日午前9時30分～午後6時 土日祝日休み",
    inquiry_telephone_number: "03-6299-0024"
  )
  user7 = User.create!(
    name: "小林 健太",
    email: "test106@example.com",
    password: "password",
    confirmed_at: Time.current,
    user_division: "insurance_agent",
    belong: "フロンティア生命",
    address: "東京都北区東十条3-14-1 河内ビル1階",
    self_introduction: "社会人になり一貫して保険営業をしております。営業一筋で培った豊富な商品知識や学生時代に培われた体力で精一杯お客様の日々の生活が安心できるように全力を尽くします。",
    my_strength: "",
    career: "1990年フロンティア生命保険相互会社入社",
    message: "非正規雇用の増加や実力主義が浸透する中、雇用が不安定になりつつあります。また少子高齢化の進行により総人口の減少で我が国における年金や医療などの社会保障は、より一層の不安定化や保障の先細りが懸念されております。その中で増大する不安を解消できるような、安心して日々の暮らしを守れる保険を提案させて頂きます。",
    access: "赤羽駅から徒歩1分",
    website: "https://www.frontier-life.co.jp",
    inquiry_opening_time: "08:00-21:00（土日祝日を除く）",
    inquiry_telephone_number: "03-7629-8975"
  )



  # 15.times do |i|
  #   article1 = Article.create!(categories: "定期保険", title: "テストタイトル1-#{i}", background: "テスト背景1-#{i}", content: "テスト本文質問1-#{i}", status: :published, user: user1)
  #   Answer.create!(content: "テスト本文回答1-#{i}", article: article1, user_id: user1.id)
  #   Answer.create!(content: "テスト本文回答2-#{i}", article: article1, user_id: user2.id)
  #   Answer.create!(content: "テスト本文回答3-#{i}", article: article1, user_id: user3.id)
  #   Answer.create!(content: "テスト本文回答4-#{i}", article: article1, user_id: user4.id)
  #   Answer.create!(content: "テスト本文回答5-#{i}", article: article1, user_id: user5.id)

  #   article2 = Article.create!(categories: "定期保険", title: "テストタイトル2-#{i}", background: "テスト背景2-#{i}", content: "テスト本文質問2-#{i}", status: :published, user: user2)
  #   Answer.create!(content: "テスト本文回答1-#{i}", article: article2, user_id: user1.id)
  #   Article.create!(categories: "定期保険", title: "テストタイトル3-#{i}", background: "テスト背景3-#{i}", content: "テスト本文質問3-#{i}", status: :published, user: user3)
  #   Article.create!(categories: "定期保険", title: "テストタイトル4-#{i}", background: "テスト背景4-#{i}", content: "テスト本文質問4-#{i}", status: :published, user: user4)
  #   Article.create!(categories: "定期保険", title: "テストタイトル5-#{i}", background: "テスト背景5-#{i}", content: "テスト本文質問5-#{i}", status: :published, user: user5)
  # end
end
