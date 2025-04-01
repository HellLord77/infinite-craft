#!/usr/bin/env sh
set -e

version=$(jq -r .version package.json)
wget -O data.tar.gz "https://codeberg.org/HellLord77/infinite-craft-data/archive/$version.tar.gz"
tar -xzvf data.tar.gz
mv infinite-craft-data data
rm data.tar.gz

sqlite3 data.sqlite " \
CREATE TABLE element ( \
  id INTEGER PRIMARY KEY AUTOINCREMENT, \
  text TEXT UNIQUE NOT NULL, \
  emoji TEXT NOT NULL \
);
" " \
CREATE TABLE pair ( \
  first_id INTEGER NOT NULL, \
  second_id INTEGER NOT NULL, \
  result_id INTEGER NOT NULL, \
  PRIMARY KEY (first_id, second_id), \
  FOREIGN KEY (first_id) REFERENCES element (id), \
  FOREIGN KEY (second_id) REFERENCES element (id), \
  FOREIGN KEY (result_id) REFERENCES element (id) \
); \
"

tail -n +2 -q data/element/*.csv >> data/element.csv
sqlite3 data.sqlite ".mode csv" ".import data/element.csv element"

tail -n +2 -q data/pair/*.csv >> data/pair.csv
sqlite3 data.sqlite ".mode csv" ".import data/pair.csv pair"

sqlite3 data.sqlite " \
DELETE \
FROM pair \
WHERE result_id = (SELECT id FROM element WHERE text = 'Nothing');
" " \
VACUUM; \
"

mv data.sqlite public
rm -rf data
