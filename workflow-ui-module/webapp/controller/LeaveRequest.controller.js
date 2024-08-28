sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("workflowuimodule.controller.LeaveRequest", {
      onInit: function () {
          var userInfo = sap.ushell.Container.getService("UserInfo");
          this.employeeName = userInfo.getUser().getFullName();
          this.managerEmail = "suraj.mishra@sumodigitech.com"; 
      },

      onLeaveApply: function () {
          var leaveType = this.byId("leaveTypeId").getSelectedKey();
          var fromDate = this.byId("fromDateId").getDateValue();
          var toDate = this.byId("toDateId").getDateValue();
          var reason = this.byId("reasonId").getValue();

          if (!leaveType || !fromDate || !toDate || !reason) {
              MessageToast.show("Please fill in all fields.");
              return;
          }

          var employeeName = this.employeeName;
          var managerEmail = this.managerEmail;

          $.ajax({
              url: "/LeaveRequests", 
              method: "POST",
              contentType: "application/json",
              data: JSON.stringify({
                  employeeName: employeeName,
                  managerEmail: managerEmail,
                  leaveType: leaveType,
                  startDate: fromDate,
                  endDate: toDate,
                  reason: reason,
                  status: 'Pending'
              }),
              success: function () {
                  MessageToast.show("Leave request submitted successfully.");
              },
              error: function () {
                  MessageToast.show("Error while submitting the leave request.");
              }
          });
      }
  });
});
