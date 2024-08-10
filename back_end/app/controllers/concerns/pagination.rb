module Pagination
  extend ActiveSupport::Concern

  def pagination(records)
    {
      current_page: records.current_page, # 現在のページ数を返す
      total_pages: records.total_pages, # 全体のページ数を返す
      total_count: records.total_count, # 全体のレコード件数を返す
    }
  end
end
