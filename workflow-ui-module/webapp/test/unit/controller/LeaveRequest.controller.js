/*global QUnit*/

sap.ui.define([
	"workflow-ui-module/controller/LeaveRequest.controller"
], function (Controller) {
	"use strict";

	QUnit.module("LeaveRequest Controller");

	QUnit.test("I should test the LeaveRequest controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
