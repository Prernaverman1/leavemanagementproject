
// export var API_BASE_URL: string = 'http://deltauat.aus.amer.dell.com:9090/';

// 13.127.176.207

 //  13.127.176.207

// Role

export var getRoleList: string = 'https://leave-api.hashworks.co/rest/config/role/get';
export var addRole: string = 'https://leave-api.hashworks.co/rest/config/role/add';
export var editRole: string = 'https://leave-api.hashworks.co/rest/config/role/update';

// Policy
export var getPolicyList: string = 'https://leave-api.hashworks.co/rest/config/policy/get';
export var addPolicy: string = 'https://leave-api.hashworks.co/rest/config/policy/add';
export var deletePolicy: string = 'https://leave-api.hashworks.co/rest/config/policy/delete';

// leave
export var getLeaveList: string = 'https://leave-api.hashworks.co/rest/config/leaveType/get';
export var addLeave: string = 'https://leave-api.hashworks.co/rest/config/leaveType/add';
export var editLeave: string = 'https://leave-api.hashworks.co/rest/config/leaveType/edit';

// holiday
export var getHolidayList: string = 'https://leave-api.hashworks.co/rest/config/holiday/get';
export var addHoliday: string = 'https://leave-api.hashworks.co/rest/config/holiday/add';
export var editHoliday: string = 'https://leave-api.hashworks.co/rest/config/holiday/update';

//manager
export var getLeaveStatusByDate: string = 'https://leave-api.hashworks.co/rest/leaveApplication/manager/viewLeavesByDate';
export var getLeaveStatus: string = 'https://leave-api.hashworks.co/rest/leaveApplication/manager/viewLeaves';
export var getEmployeeLeaveList: string = 'https://leave-api.hashworks.co/rest/leaveApplication/employee/viewLeavesStatus';
export var approveLeave: string = 'https://leave-api.hashworks.co/rest/leaveApplication/manager/ApproveLeaves';
export var rejectLeave: string = 'https://leave-api.hashworks.co/rest/leaveApplication/manager/RejectLeaves';
export var getManagerList: string = 'https://leave-api.hashworks.co/rest/config/manager/get';
export var getemployeelistByManager: string = 'https://leave-api.hashworks.co/rest/employees/getEmployeeDetailByManager';

// apply leave
export var applyLeave: string = 'https://leave-api.hashworks.co/rest/leaveApplication/apply';
export var cancelLeave: string = 'https://leave-api.hashworks.co/rest/leaveApplication/employee/LeaveCancellation';
export var editLeaveApplied: string = 'https://leave-api.hashworks.co/rest/leaveApplication/employee/editAppledLeave';

// employee

export var getEmployeeList: string = 'https://leave-api.hashworks.co/rest/employees/getAllNew';

export var withDrawLeave: string = 'https://leave-api.hashworks.co/rest/leaveApplication/employee/withdrawLeaves';
export var disableEmployee: string = 'https://leave-api.hashworks.co/rest/employees/DisableEmployeeByAdmin';
export var exportToExcel: string = 'https://leave-api.hashworks.co/rest/employees/exportToExcel';
export var exportToExcel1: string = 'https://leave-api.hashworks.co/rest/employees/download';


// map role

export var mapRole: string = 'https://leave-api.hashworks.co/rest/employees/mapRole';

// map manager

export var mapManager: string = 'https://leave-api.hashworks.co/rest/employees/mapManager';


export var getEmployeeDetails: string = 'https://leave-api.hashworks.co/rest/employees/getAllEmployeeDetailsOld';
export var getEmployeeDetails1: string = 'https://leave-api.hashworks.co/rest/employees/getAllEmployeeDetails';
export var login: string = 'https://leave-api.hashworks.co/auth/signin';

export var getoneemployee: string = 'https://leave-api.hashworks.co/rest/employees/getEmployeeDetail';


// user leaves

export var getUserLeaves: string = 'https://leave-api.hashworks.co/rest/userLeaves/getUserLeaves';

// change password 

export var changePasswordMail : string = 'https://leave-api.hashworks.co/rest/employees/changePasswordMail';
export var changePasswordByAdmin: string = 'https://leave-api.hashworks.co/rest/employees/changePasswordByAdmin';

//feedback
export var feedBack: string = 'https://leave-api.hashworks.co/rest/employees/EmployeeFeedback';

