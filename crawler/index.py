#!/usr/bin/env python
# -*- coding:utf-8 -*-
import json

from Crawler import Crawler


crawled_data = {}


def save():
    with open('timeTable.json', 'w') as f:
        f.write(json.dumps(crawled_data))
    pass


def add_data(name: str, time_table_data: object) -> None:
    dep, dest = name.split('-')
    print(dep, dest)
    if dep == 'honkan' or dep == 'rotary':
        dep = 'sfc'
    if dep not in crawled_data:
        crawled_data[dep] = {dest: time_table_data}
    else:
        if dest not in crawled_data[dep]:
            crawled_data[dep] = dict(
                {dest: time_table_data}, **crawled_data[dep])
        else:
            crawled_data[dep][dest]["weekday"].extend(
                time_table_data["weekday"])
            crawled_data[dep][dest]["saturday"].extend(
                time_table_data["saturday"])
            crawled_data[dep][dest]["holiday"].extend(
                time_table_data["holiday"])
    pass


def main() -> None:
    urls = None
    with open('./urls.json') as f:
        urls = json.loads(f.read())
    for i in urls:
        crawler = Crawler(i, urls[i])
        crawler.crawl()
        add_data(i, crawler.time_table)
    save()
    return


if __name__ == '__main__':
    main()
