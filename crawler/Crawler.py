#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
Crawler
"""

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

    def __init__(self, name: str, urls: list):
        self.dep, self.dest = name.split("-")
        self.urls = urls

    def validate(self, data):
        try:
            bus = BusCreate()
            bus.h = data["h"]
            bus.m = data["m"]
            bus._from = data["from"]
            bus.to = data["to"]
            bus.type = data["type"]
            bus.via = data["via"]
            bus.twin = data["twin"]
            bus.rotary = data["rotary"]
            bus.validate()
            return data
        except:
            return False



if __name__ == '__main__':
    ins = Crawler()
    ins.public_class_method()
