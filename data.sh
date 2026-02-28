#!/usr/bin/env sh
set -e

version=$(curl -s https://codeberg.org/api/v1/repos/HellLord77/infinite-craft-data/tags | jq -r '.[0].name')
wget -O data.tar.gz "https://codeberg.org/HellLord77/infinite-craft-data/archive/$version.tar.gz"
tar -xzvf data.tar.gz
mv infinite-craft-data data
rm data.tar.gz

sqlite3 data.sqlite "
CREATE TABLE element (id INTEGER, text TEXT, emoji TEXT);
CREATE TABLE pair (first_id INTEGER, second_id INTEGER, result_id INTEGER);
CREATE INDEX idx_element_id ON element (id);
CREATE INDEX idx_element_id_text ON element (id, text);
CREATE INDEX idx_pair_first_id_second_id_result_id ON pair (first_id, second_id, result_id);
"

tail -n +2 -q data/element/*.csv >> data/element.csv
sqlite3 data.sqlite ".mode csv" ".import data/element.csv element"

tail -n +2 -q data/pair/*.csv >> data/pair.csv
sqlite3 data.sqlite ".mode csv" ".import data/pair.csv pair"

sqlite3 data.sqlite "
DELETE FROM pair WHERE result_id = (SELECT id FROM element WHERE text = 'Nothing');
VACUUM;
"

mv data.sqlite public
rm -rf data
