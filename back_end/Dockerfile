FROM ruby:3.2.3
RUN apt-get update -qq && apt-get install -y vim

RUN mkdir /back_end
WORKDIR /back_end
COPY Gemfile /back_end/Gemfile
COPY Gemfile.lock /back_end/Gemfile.lock

RUN gem update --system
RUN bundle update --bundler

RUN bundle install
COPY . /back_end

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
