const cds = require('@sap/cds');
const axios = require('axios'); 

module.exports = cds.service.impl(async function () {
  this.on('CREATE', 'LeaveRequests', async (req) => {
    const { employeeName, managerEmail, leaveType, startDate, endDate, reason } = req.data;

    try {
      // Trigger workflow and send an email
      const workflowResponse = await triggerWorkflow(employeeName, managerEmail, leaveType, startDate, endDate, reason);

      // Set initial status
      req.data.status = 'Pending';
      return { workflowId: workflowResponse.id, ...req.data };
    } catch (error) {
      req.error(500, 'Error triggering workflow');
    }
  });
});

async function triggerWorkflow(employeeName, managerEmail, leaveType, startDate, endDate, reason) {
  const workflowContext = {
    employeeName,
    managerEmail,
    leaveType,
    startDate,
    endDate,
    reason
  };

  try {
    const response = await axios.post('https://workflow-api-url/workflow-service/rest/v1/workflow-instances', {
      definitionId: '001', 
      context: workflowContext
    });
    console.log('Workflow triggered successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error triggering workflow:', error);
    throw error;
  }
}
