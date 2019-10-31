({
    getUserPrivilege : function(cmp, event, helper){
            var url = window.location
            let paramName = this.getParams(decodeURIComponent(url))
            let method = paramName.id
            cmp.set("v.user", method);
            this.getMeds(cmp, event, method)
    },
    getMeds : function(cmp, event,name) {
        let ctr = cmp.get('c.getStocks');
        ctr.setParams({
            "name" : name
        });
        ctr.setCallback(this, function(response) {
            let account = response.getReturnValue()
             /*for (var i = 0; i < account.length; i++) { 
                var row = account[i]; 
                //as data columns with relationship __r can not be displayed directly in data table, so generating dynamic columns 
                if (row.Medicine__r) { 
                    row.BrandName = row.Medicine__r.Brand_Name__c; 
                } 
            } */
            cmp.set("v.medicines", response.getReturnValue())
        }) 
        $A.enqueueAction(ctr); 
    },
    search : function (cmp, event, item){
        alert(item)
        let action = cmp.get("c.searchStocks");
        action.setParams({
            "item" : item
        });
        action.setCallBack(this, function(response){
            alert("search")
            cmp.set("v.medicines", response.getReturnValue())
        })
        $A.enqueueAction(action)
    },
    setColumnDefinitions : function(component, event, helper){  
        let colDef = [];  
        
        colDef.push({label:'Name', fieldName: 'Generic_Brand', type: 'text'});   
        colDef.push({label:'Brand Name', fieldName: 'BrandName', type: 'text'});    
        colDef.push({
            label:'Quantity',
            fieldName: 'Quantity__c',
            type: 'number'
        });        
        component.set("v.columns", colDef); 
        
        let add = {
            gname: '',
            bname: '',
            quanty: ''
        }
	},
    
    submit : function(component, gName, bNAme, quantity) {
        let ctr = component.get("c.addMed")
        ctr.setParams({
            "gname" : gName,
            "bName" : bName,
            "quant" : quantity
        })
        ctr.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS'){
                let account = response.getReturnValue();
                alert("Response" + account)
            }else{
                alert('ERROR!' + JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(ctr); 
    },    
    
    
    getParams : function (url){
        
        // get query string from url (optional) or window
        var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
        
        // we'll store the parameters here
        var obj = {};
        
        // if query string exists
        if (queryString) {
            
            // stuff after # is not part of query string, so get rid of it
            queryString = queryString.split('#')[0];
            // split our query string into its component parts
            var arr = queryString.split('&');
            
            for (var i = 0; i < arr.length; i++) {
                // separate the keys and the values
                var a = arr[i].split('=');
                
                // set parameter name and value (use 'true' if empty)
                var paramName = a[0];
                var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
                // (optional) keep case consistent
                //  paramName = paramName.toLowerCase();
                //   if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
                
                // if the paramName ends with square brackets, e.g. colors[] or colors[2]
                if (paramName.match(/\[(\d+)?\]$/)) {
                    
                    // create key if it doesn't exist
                    var key = paramName.replace(/\[(\d+)?\]/, '');
                    if (!obj[key]) obj[key] = [];
                    
                    // if it's an indexed array e.g. colors[2]
                    if (paramName.match(/\[\d+\]$/)) {
                        // get the index value and add the entry at the appropriate position
                        var index = /\[(\d+)\]/.exec(paramName)[1];
                        obj[key][index] = paramValue;
                    } else {
                        // otherwise add the value to the end of the array
                        obj[key].push(paramValue);
                    }
                } else {
                    // we're dealing with a string
                    if (!obj[paramName]) {
                        // if it doesn't exist, create property
                        obj[paramName] = paramValue;
                    } else if (obj[paramName] && typeof obj[paramName] === 'string'){
                        // if property does exist and it's a string, convert it to an array
                        obj[paramName] = [obj[paramName]];
                        obj[paramName].push(paramValue);
                    } else {
                        // otherwise add the property
                        obj[paramName].push(paramValue);
                    }
                }
            }
        }
        
        return obj; 
    }
})