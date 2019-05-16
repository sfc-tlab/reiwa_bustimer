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
    TWIN_URL_LIST = [
        "http://www.kanachu.co.jp/dia/diagram/timetable/cs:0000802604-1/nid:00129893/rt:0/k:%E6%B9%98%E5%8D%97%E5%8F%B0",
        "http://www.kanachu.co.jp/dia/diagram/timetable/cs:0000802603-1/nid:00129986/rt:0/k:%E6%85%B6%E5%BF%9C%E5%A4%A7%E5%AD%A6%E6%9C%AC%E9%A4%A8%E5%89%8D",
        "http://www.kanachu.co.jp/dia/diagram/timetable/cs:0000802605-1/nid:00129985/rt:0/k:%E6%85%B6%E5%BF%9C%E5%A4%A7%E5%AD%A6",
    ]

    def __init__(self, name: str, urls: list):
        self.dep, self.dest = name.split("-")
        self.rotary = True if self.dep == "rotary" else False
        self.urls = urls
        self.time_table = {
            "weekday": [],
            "saturday": [],
            "holiday": []
        }
        self.sorted_time_table = {
            "weekday": [],
            "saturday": [],
            "holiday": []
        }
        self.twin = False

    def validate_bus(self, data: object):
        try:
            bus = BusCreate()
            bus.key = data["key"]
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

    def sort_table_data(self):
        self.sorted_time_table["weekday"] = sorted(self.time_table["weekday"], key=lambda x:x["key"])
        self.sorted_time_table["saturday"] = sorted(self.time_table["saturday"], key=lambda x:x["key"])
        self.sorted_time_table["holiday"] = sorted(self.time_table["holiday"], key=lambda x:x["key"])

    def append_cell2time_table(self, hour, cell, status):
        ruby_list = [ruby.text_content() for ruby in cell.cssselect(".min > .ruby > .vs")]
        min_list = [min.text_content() for min in cell.cssselect(".min > .time > span a")]
        for i, ruby in enumerate(ruby_list):
            if ruby == 'Tラ':
                continue
            if ruby == '笹':
                # print(hour, min_list[i], False, self.rotary, "sasakubo")
                bus = {
                    "key": int(str(hour)+str(min_list[i])),
                    "h": int(hour),
                    "m": int(min_list[i]),
                    "type": "normal" if int(hour) < self.NIGHT_FEE_TIME else "night",
                    "twin": False,
                    "rotary": self.rotary,
                    "via": "sasakubo"
                }
                if bus not in self.time_table[status]:
                    self.time_table[status].append(bus)
            elif ruby == 'T' or self.twin:
                # print(hour, min_list[i], True, self.rotary, "")
                bus = {
                    "key": int(str(hour)+str(min_list[i])),
                    "h": int(hour),
                    "m": int(min_list[i]),
                    "type": "normal" if int(hour) < self.NIGHT_FEE_TIME else "night",
                    "twin": True,
                    "rotary": self.rotary,
                    "via": ""
                }
                if bus not in self.time_table[status]:
                    self.time_table[status].append(bus)
            else:
                bus = {
                    "key": int(str(hour)+str(min_list[i])),
                    "h": int(hour),
                    "m": int(min_list[i]),
                    "type": "normal" if int(hour) < self.NIGHT_FEE_TIME else "night",
                    "twin": False,
                    "rotary": self.rotary,
                    "via": ""
                }
                self.time_table[status].append(bus)
                if bus not in self.time_table[status]:
                    self.time_table[status].append(bus)

    def crawl_data(self, url: str):
        print(self.dep, self.dest)
        print(url)
        self.twin = bool(url in self.TWIN_URL_LIST)
        print(self.twin)
        html = requests.get(url).text
        root = lxml.html.fromstring(html)
        time_table = root.cssselect(
            "#center > div.timetable > table > tbody tr")
        for row in time_table[:-1]:
            hour = row.cssselect("th")[0].text_content()
            # add weekday data
            weekday_cell = row.cssselect("td")[0]
            self.append_cell2time_table(hour, weekday_cell, 'weekday')
            # add saturday data
            saturday_cell = row.cssselect("td")[1]
            self.append_cell2time_table(hour, saturday_cell, 'saturday')
            # add holiday data
            holiday_cell = row.cssselect("td")[2]
            self.append_cell2time_table(hour, holiday_cell, 'holiday')
        return

    def crawl(self):
        for url in self.urls:
            self.crawl_data(url)
            self.validation()
            print(len(self.time_table["weekday"]), len(self.time_table["saturday"]), len(self.time_table["holiday"]))
        self.sort_table_data()
        return


if __name__ == '__main__':
    name = "test-test"
    url = ["http://www.kanachu.co.jp/dia/diagram/timetable/cs:0000801156-1/nid:00129893/rt:0/k:%E6%B9%98%E5%8D%97%E5%8F%B0%E9%A7%85%E8%A5%BF%E5%8F%A3"]
    crawler = Crawler(name, url)
    crawler.crawl()
