class Api::V1::SearchController < ApplicationController
  def posts
    posts_per_page = 6
    posts = Post.where("title ILIKE ? OR body ILIKE ?", "%#{params[:q]}%", "%#{params[:q]}%").order(created_at: :desc)
    posts_with_images = paginate_posts(posts, posts_per_page)
    total_posts_count = posts.count

    render json: {
      posts: posts_with_images,
      total_count: total_posts_count,
      per_page: posts_per_page
    }
  end
end
