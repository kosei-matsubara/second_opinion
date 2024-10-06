ActiveRecord::Base.transaction do

  # 保険契約者データ
  user1 = User.create!(
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
  user2 = User.create!(
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
  user3 = User.create!(
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
  user4 = User.create!(
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
  belong_companies = %w[大地生命保険相互会社 フロンティア生命保険相互会社 未来創造生命保険株式会社 安心の絆生命保険株式会社 新星生命保険株式会社 あんしんライフ保険株式会社 未来保障生命保険株式会社 セーフティ保険株式会社 ライフパートナー生命保険株式会社 光の森生命保険株式会社]
  addresses = %w[千代田区大手町 新宿区代々木 品川区芝浦 渋谷区神宮前 港区浜松町 文京区本郷 台東区浅草 墨田区吾妻橋 江東区有明 目黒区目黒]
  careers = %w[大地生命保険相互会社 フロンティア生命保険相互会社 未来創造生命保険株式会社 安心の絆生命保険株式会社 新星生命保険株式会社 あんしんライフ保険株式会社 未来保障生命保険株式会社 セーフティ保険株式会社 ライフパートナー生命保険株式会社 光の森生命保険株式会社]
  accesses = %w[東京メトロ大手町 JR代々木 東京メトロ芝浦 東京メトロ神宮前 東京メトロ浜松町 東京メトロ本郷 東京メトロ浅草 東京メトロ吾妻橋 東京メトロ有明 JR目黒]
  websites = %w[dai-chi-life frontier-life mirai-souzou-life ansin-kizuna-life shinsei-life ansin-life mirai-hoshou-life safety-life life-partner hikari-life]

  20.times do |i|
    User.create!(
      name: "#{%w[山田 佐藤 高橋 鈴木 伊藤 田中 渡辺 中村].sample} #{%w[太郎 花子 健太 真央 美優 裕子 明子].sample}",
      email: "test#{105 + i}@example.com",
      password: "password",
      confirmed_at: Time.current,
      user_division: "insurance_agent",
      belong: belong_companies[i % belong_companies.length],
      address: "東京都#{addresses[i % addresses.length]}#{rand(1..10)}-#{rand(1..30)} #{%w[ビル タワー センター].sample}#{rand(1..30)}F",
      self_introduction: "入社して#{rand(1..5)}ヶ月間はマナー研修や営業、保険商品について学びました。研修終了後、#{%w[京都 大阪 名古屋 東京].sample}支社に配属されました。それ以来、担当企業や一般のお客様に対するライフサイクルに応じた商品提案を行い、既存のお客様に対して定期的なアフターフォローも行っています。配属当初は提案内容について試行錯誤しながら、提案書やパンフレットの作成に奮闘していました。結果的にはお客様へのご提案書やパンフレットの準備も作業的になってしまっていました。しかし、あるお客様から『この提案書って僕のために作ってくれているんだね。ありがとう。』と言われ、はっとしました。それ以降は、ただ目の前のことに忙殺されることなく、お客様の大切な日々の生活のことを思い浮かべて、最適な#{%w[生涯設計プラン あんしんの100年計画 みらいのしあわせ計画].sample}を考えたり、ライフイベントに合わせた情報提供をさせていただき、大切な時間をいただくお客様のお役に立てるように丁寧な準備を心がけるようにしています。",
      my_strength: "社会人になり一貫して保険営業をしております。保険営業一筋で、商品知識と学生時代における#{%w[ラグビー フルマラソン テニス].sample}で培った体力で全力を尽くします。#{%w[レスポンスの速さ コミュニケーション 商品知識の深さ].sample}には自信があります。",
      career: "#{rand(1985..2015)}年#{careers[i % careers.length]}入社",
      message: "#{%w[非正規雇用の増加や実力主義が浸透する中 数十年に渡る日本経済低迷の中 物価高や円安の進行による経済的な悪影響によって].sample}、雇用が不安定になりつつあります。また、#{%w[医療の高度化による医療費の増加や後期高齢者医療制度の該当者が急激に増加する2025年問題 少子高齢化の進行による総人口の減少 異常気象や大規模災害の度重なる発生による災害対策や安全保障政策の転換などにより財政赤字の拡大].sample}で我が国における年金や医療などの社会保障は、より一層の不安定化や保障の先細りが懸念されております。その中で増大する不安を解消できるような、安心して日々の暮らしを守れる#{%w[家族の未来計画 生涯設計プラン あんしんの100年計画 みらいのしあわせ計画 一生涯あんしん計画 終身安心プラン].sample}を提案させて頂きます。また、保険とは目に見えない商品で多種多様の商品があり、内容も複雑であることが多いです。そのため、提案する側はお客様のライフサイクルや潜在的なリスクの明確化に努め、明確化したリスクやニーズに対する最適な保障内容を備えた商品を選択する幅広いかつ深い商品知識をもって、お客様に最適な提案をして大切な日々の生活をお守りしていきます。",
      access: "#{accesses[i % accesses.length]}駅より徒歩#{rand(1..10)}分",
      website: "https://#{websites[i % websites.length]}.co.jp",
      inquiry_opening_time: "平日午前#{rand(8..10)}時〜午後#{rand(5..7)}時 土日祝日休み",
      inquiry_telephone_number: "03-#{rand(1000..9999)}-#{rand(1000..9999)}"
    )
  end

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
