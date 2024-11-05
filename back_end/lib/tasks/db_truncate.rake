namespace :db do
  desc "Truncate tables"
  task truncate_tables: :environment do
    tables = ["answers", "articles", "users"]  # トランケートするテーブルを指定する

    # MySQLは外部キー起因でトランケートが失敗するため一時的に外部キーを無効にする
    ActiveRecord::Base.connection.execute("SET FOREIGN_KEY_CHECKS = 0;")

    tables.each do |table|
      if ActiveRecord::Base.connection.table_exists?(table)
        ActiveRecord::Base.connection.execute("TRUNCATE TABLE #{table};")
        puts "Truncated #{table}"
      else
        puts "Table '#{table}' does not exist"
      end
    end

    # 一時的に無効にした外部キーを有効に戻す
    ActiveRecord::Base.connection.execute("SET FOREIGN_KEY_CHECKS = 1;")
  end
end
