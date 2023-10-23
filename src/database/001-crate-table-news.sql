CREATE TABLE news(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  subtitle VARCHAR,
  content VARCHAR,
  author VARCHAR,
  news_source VARCHAR,
  url_source VARCHAR,
  url_image VARCHAR,
  image_description VARCHAR,
  status BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
