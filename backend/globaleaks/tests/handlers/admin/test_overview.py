# -*- coding: utf-8 -*-
import json

from twisted.internet.defer import inlineCallbacks

from globaleaks.handlers.admin import overview
from globaleaks.jobs.delivery_sched import DeliverySchedule
from globaleaks.rest import requests
from globaleaks.tests import helpers


class TestTipsOverviewDesc(helpers.TestHandlerWithPopulatedDB):
    _handler = overview.Tips

    @inlineCallbacks
    def setUp(self):
        yield helpers.TestHandlerWithPopulatedDB.setUp(self)
        yield self.perform_full_submission_actions()
        yield DeliverySchedule().run()

    @inlineCallbacks
    def test_get(self):
        handler = self.request({}, role='admin')
        response = yield handler.get()

        self.assertEqual(len(response), self.population_of_submissions)
        self._handler.validate_message(json.dumps(response), requests.TipsOverviewDesc)


class TestFilesOverviewDesc(helpers.TestHandlerWithPopulatedDB):
    _handler = overview.Files

    @inlineCallbacks
    def setUp(self):
        yield helpers.TestHandlerWithPopulatedDB.setUp(self)
        yield self.perform_full_submission_actions()
        yield DeliverySchedule().run()

    @inlineCallbacks
    def test_get(self):
        handler = self.request({}, role='admin')
        response = yield handler.get()

        self._handler.validate_message(json.dumps(response), requests.FilesOverviewDesc)
