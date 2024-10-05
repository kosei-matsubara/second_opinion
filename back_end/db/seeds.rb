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
  # user6 = User.create!(
  #   name: "網谷 里帆",
  #   email: "test105@example.com",
  #   password: "password",
  #   confirmed_at: Time.current,
  #   user_division: "insurance_agent",
  #   belong: "大地生命",
  #   address: "東京都千代田区紀尾井町9-30 紀尾井町松本ビル2F",
  #   self_introduction: "入社して２カ月間はマナー研修などで社会人として基礎的なおよび営業や保険商品に関する事を学びました。研修期間を終えて６月に京都支社に配属されました。それ以来、現在の部署で担当企業に対してライフサイクルの変更に合わせた商品の提案などの営業活動、および既存のお客さまに対する定期的なアフターフォローを行なっています。配属されて間もない頃は提案内容について試行錯誤したり、提案書やパンフレット作成など目の前にある仕事に慣れるのに必死でした。結果的にはお客様へのご提案書やパンフレットの準備も作業的になってしまっていました。しかし、ある時お客様から「この提案書って僕のためにわざわざ作ってくれているのだよね。ありがとう。」と言っていただき、はっとしました。そこからは、ただ目の前のことに忙殺されることなく、お客様の大切な日々の生活のことを思い浮かべて、最適なプランを考えたり、ライフイベントに合わせた情報提供をさせていただき、大切な時間をいただくお客様のお役に立てるように丁寧な準備を心がけるようにしています。",
  #   my_strength: "社会人になり一貫して保険営業をしております。営業一筋で培った豊富な商品知識や学生時代に培われた体力で精一杯お客様の日々の生活が安心できるように全力を尽くします。",
  #   career: "2009年大地生命保険相互会社入社",
  #   message: "非正規雇用の増加や実力主義が浸透する中、雇用が不安定になりつつあります。また少子高齢化の進行により総人口の減少で我が国における年金や医療などの社会保障は、より一層の不安定化や保障の先細りが懸念されております。その中で増大する不安を解消できるような、安心して日々の暮らしを守れる保険を提案させて頂きます。また、保険とは目に見えない商品で多種多様の商品があり、内容も複雑であることが多いです。そのため、提案する側はお客さまのライフサイクルや潜在的なリスクの明確化に努め、明確化したリスクやニーズに対する最適な保障内容を備えた商品を選択する幅広いかつ深い商品知識をもって、お客さまに最適な提案をして大切な日々の生活をお守りしていきます。",
  #   access: "東京メトロ「麹町」駅・「永田町」駅より徒歩5分",
  #   website: "https://www.dai-chi-life.co.jp",
  #   inquiry_opening_time: "平日午前9時30分～午後6時 土日祝日休み",
  #   inquiry_telephone_number: "03-6299-0024"
  # )
  20.times do |i|
    User.create!(
      name: "#{%w[山田 佐藤 高橋 鈴木 伊藤 田中 渡辺 中村].sample} #{%w[太郎 花子 健太 真央 美優 裕子 明子].sample}",
      email: "test#{105 + i}@example.com",
      password: "password",
      confirmed_at: Time.current,
      user_division: "insurance_agent",
      belong: %w[大地生命保険相互会社 フロンティア生命保険相互会社 未来創造生命保険株式会社 安心の絆生命保険株式会社 新星生命保険株式会社 あんしんライフ保険株式会社 未来保障生命保険株式会社 セーフティ保険株式会社 ライフパートナー生命保険株式会社 光の森生命保険株式会社].sample,
      # address: "東京都#{%w[千代田区 新宿区 品川区 渋谷区].sample}#{%w[紀尾井町 代々木 芝浦 神宮前].sample}#{rand(1..10)}-#{rand(1..30)} #{%w[ビル タワー センター].sample}#{rand(1..5)}F",
      # self_introduction: "入社して#{rand(1..5)}ヶ月間はマナー研修や営業、保険商品について学びました。研修終了後、#{%w[京都 大阪 名古屋 東京].sample}支社に配属されました。それ以来、担当企業に対するライフサイクルに応じた商品提案を行い、定期的なアフターフォローも行っています。配属当初は提案内容について試行錯誤しながら、提案書やパンフレットの作成に奮闘していました。あるお客様から『この提案書って僕のために作ってくれているんだね。ありがとう。』と言われ、はっとしました。それ以降は、お客様一人一人の大切な生活を守るために、より丁寧な提案を心がけています。",
      # my_strength: "保険営業一筋で、商品知識と学生時代から培った体力で全力を尽くします。#{%w[リーダーシップ コミュニケーション 知識の深さ チームワーク].sample}には自信があります。",
      career: "#{rand(1985..2015)}年#{%w[大地生命保険相互会社 フロンティア生命保険相互会社 未来創造生命保険株式会社 安心の絆生命保険株式会社 新星生命保険株式会社 あんしんライフ保険株式会社 未来保障生命保険株式会社 セーフティ保険株式会社 ライフパートナー生命保険株式会社 光の森生命保険株式会社].sample}入社",
      # message: "保険とは目に見えない商品であり、提案する側としてお客様のライフサイクルや潜在的なリスクを明確化することが重要です。お客様の不安を取り除き、安心して日々の生活を守るため、最適な保険を提案させていただきます。#{['ライフイベントに合わせた情報提供', '最適な保障内容の提案', '個別のニーズに応じたサポート'].sample}を心がけています。",
      # access: "#{%w[東京メトロ JR 東急].sample}「#{%w[麹町 永田町 渋谷 恵比寿].sample}」駅より徒歩#{rand(1..10)}分",
      website: "https://#{%w[dai-chi-life frontier-life mirai-souzou-life ansin-kizuna-life shinsei-life ansin-life mirai-hoshou-life safety-life life-partner hikari-life].sample}.co.jp",
      inquiry_opening_time: "平日午前#{rand(8..10)}時〜午後#{rand(5..7)}時 土日祝日休み",
      # inquiry_telephone_number: "03-#{rand(1000..9999)}-#{rand(1000..9999)}"
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
