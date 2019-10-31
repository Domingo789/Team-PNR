({
    onEnterPress: function(component, event, helper) {
        if(event.keyCode == 13){             
            helper.checkLogin(component, event, helper);
        }
    },
    
    checkLogin : function(component, event, helper) {
        helper.checkLogin(component, event, helper);
    },
    
    clear : function(component){   
        component.find("username").set("v.value", "")
        component.find("password").set("v.value", "")   
    }
})