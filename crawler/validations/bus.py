#!/usr/bin/env python
# -*- coding:utf-8 -*-
from schematics.models import Model
from schematics.types import IntType, StringType, BooleanType


class BusCreate(Model):
    key = IntType(required=True)
    h = IntType(required=True)
    m = IntType(required=True)
    _from = StringType(required=True)
    to = StringType(required=True)
    type = StringType(required=True)
    via = StringType()
    twin = BooleanType()
    rotary = BooleanType()
