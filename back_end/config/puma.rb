# スレッド数を設定する
threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }.to_i
threads threads_count, threads_count

# 動作環境を設定する
environment ENV.fetch("RAILS_ENV") { "development" }

plugin :tmp_restart

# ルートディレクトリを取得する
app_root = File.expand_path("..", __dir__)

# UNIXソケットを使用してPumaを接続待機に設定する
bind "unix://#{app_root}/tmp/sockets/puma.sock"
