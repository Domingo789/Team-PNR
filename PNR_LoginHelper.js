({
    checkLogin : function(cmp, event, helper) {
        let username = document.getElementById('username').value
        let password = document.getElementById('password').value
        let toastContent = ""
        let action = cmp.get('c.fetchAcct')
        action.setParams({
            "username" : username,
            "password" : password
        });
        action.setCallback(this, function(response) {
            let state = action.getState()
            let privilege = response.getReturnValue().privilege
            if(privilege != null){
                cmp.find('Helper')
                .ShowToast(cmp, 
                           "Success!", //Title
                           "success", //Type
                           "Hello!") //Message
                if(privilege === '1'){
					window.open('https://teampnr-developer-edition.ap15.force.com/InventorySystem/s?id=' + encodeURI(username))
                } else if(privilege === '2'){
					//window.open('https://teampnr-developer-edition.ap15.force.com/' + '/s?s=' + encodeURI(username))
                } else{
					alert(3)
                    //window.open('https://teampnr-developer-edition.ap15.force.com/InventorySystem/s?s=' + encodeURI(username))
				}
                                
            }else
                toastContent = "Invalid Password!"
                
                cmp.find('Helper')
                .ShowToast(cmp, 
                           "Login Failed!", //Title
                           "warning", //Type
                           toastContent) //Message   
        });
        
        $A.enqueueAction(action)
    },
    
})