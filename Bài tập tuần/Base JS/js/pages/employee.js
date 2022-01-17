$(document).ready(function () {
    new EmployeeJS();

});

class EmployeeJS extends BaseJS {
    constructor() {
        super();
        this.loadData();
        this.setApiRouter();
    }

    setApiRouter() {
        this.apiRouter = "/api/v1/Employees";
    }
    
    PrimaryKey="EmployeeId";
}









