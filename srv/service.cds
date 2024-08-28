service LeaveService {


entity LeaveRequest {
  key ID : UUID;
  employeeName : String(100);
  managerEmail : String(100);
  purposeOfLeave : String(255);
  startDate : Date;
  endDate : Date;
  status : String(20);
}
  entity LeaveRequests as projection on LeaveRequest;
  action submitLeaveRequest(
    employeeName : String,
    managerEmail : String,
    purposeOfLeave : String,
    startDate : Date,
    endDate : Date
  ) returns Boolean;
}