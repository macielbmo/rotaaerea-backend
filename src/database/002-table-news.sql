ALTER TABLE news
ADD COLUMN category UUID,
ADD COLUMN tags VARCHAR(500),
ADD COLUMN schedule TIMESTAMP,
ADD CONSTRAINT fk_categories_news FOREIGN KEY (category) REFERENCES categories_news(id);

ALTER TABLE news
DROP COLUMN tags;

ALTER TABLE news
ADD COLUMN tags text[];
