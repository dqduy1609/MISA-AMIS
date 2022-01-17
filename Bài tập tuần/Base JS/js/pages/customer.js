$(document).ready(function () {
    new CustomerJS();

});

class CustomerJS extends BaseJS {
    constructor() {
        super();
        this.loadData();
        this.setApiRouter();
    }

    setApiRouter() {
        this.apiRouter = "/api/v1/Customerss";
    }
    
    PrimaryKey="CustomerId";
}



