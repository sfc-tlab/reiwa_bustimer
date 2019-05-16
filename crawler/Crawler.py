#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
Crawler
"""
import requests
import lxml.html

from validations.bus import BusCreate


class Crawler(object):
    """The summary line for a class docstring should fit on one line.

    If the class has public attributes, they may be documented here
    in an ``Attributes`` section and follow the same formatting as a
    function's ``Args`` section. Alternatively, attributes may be documented
    inline with the attribute's declaration (see __init__ method below).

    Properties created with the ``@property`` decorator should be documented
    in the property's getter method.

    Attributes:
        attr1 (str): Description of `attr1`.
        attr2 (:obj:`int`, optional): Description of `attr2`.

    """
    NIGHT_FEE_TIME = 23

    def __init__(self, name: str, urls: list):
        self.dep, self.dest = name.split("-")
        self.rotary = True if self.dep == "rotary" else False
        self.urls = urls
        self.time_table = {
            "weekday": [],
            "saturday": [],
            "holiday": []
        }

    def validate_bus(self, data: object):
        try:
            bus = BusCreate()
            bus.h = data["h"]
            bus.m = data["m"]
            bus.type = data["type"]
            bus.via = data["via"]
            bus.twin = data["twin"]
            bus.rotary = data["rotary"]
            bus.validate()
            return data
        except:
            return False

    def validation(self):
        pass

    def get_data(self, url: str):
        html = requests.get(url).text
        root = lxml.html.fromstring(html)
        time_table = root.cssselect("#center > div.timetable > table > tbody tr")
        for row in time_table[:-1]:
            hour = row.cssselect("th")[0].text_content()
            weekday = row.cssselect("td")[0]
            weekday_ruby = [ruby.text_content() for ruby in weekday.cssselect(".min > .ruby > .vs")]
            weekday_min = [ruby.text_content() for ruby in weekday.cssselect(".min > .time > span a")]
            for i, ruby in enumerate(weekday_ruby):
                if ruby == '':
                    self.time_table["weekday"].append({
                       "h": int(hour),
                       "m": int(weekday_min[i]),
                       "type": "normal" if int(hour) < self.NIGHT_FEE_TIME else "night",
                       "twin": False,
                       "rotary": self.rotary,
                       "via": ""
                    })

            saturday = row.cssselect("td")[1]
            holiday = row.cssselect("td")[2]
            print(self.time_table)

    def crawl(self):
        for url in self.urls:
            self.get_data(url)
            self.validation()
        pass


if __name__ == '__main__':
    name = "test-test"
    url = ["http://www.kanachu.co.jp/dia/diagram/timetable/cs:0000801156-1/nid:00129893/rt:0/k:%E6%B9%98%E5%8D%97%E5%8F%B0%E9%A7%85%E8%A5%BF%E5%8F%A3"]
    crawler = Crawler(name, url)
    crawler.crawl()
