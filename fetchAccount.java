public class fetchAccount {
    @AuraEnabled
    public static Map<String, String> fetchAcct(String username, String password){
        Map<String, String> acc = new Map<String, String>();
        Users__c user = [SELECT Name, Username__c, Password__c, User_Privilege__c FROM Users__c WHERE Username__c = :username];
        acc.put('username', user.Username__c);
        acc.put('name', user.Name);
        String privilege = user.User_Privilege__c + '';
        acc.put('privilege', privilege);
        System.debug(acc);
        return acc;
    }  
    @AuraEnabled
    public static List<Stock__c> getStocks(String name){
        Store__c store = [SELECT Name FROM Store__c WHERE User__r.Username__c =:name LIMIT 1];
        String storeName = store.Name;
        List<Stock__c> stocks = [SELECT Medicine__r.Generic_Name__c, Medicine__r.Brand_Name__c, Quantity__c FROM Stock__c WHERE Store__r.Name =: storeName ];
        return stocks;
    }
     @AuraEnabled        
    public static List<Sobject> getRecords(String record, String[] fields, String criteria, String orderBy){
        String desiredFields = String.join(fields, ',');
        String queryString = 'SELECT ' + desiredFields + ' FROM ' + record;
        
        if(criteria != null){
            queryString += ' WHERE ' + criteria; 
        }
        
        if(orderBy != null){
            queryString += ' ORDER BY ' + orderBy;
        }
        
        return Database.query(queryString);
    }
    @AuraEnabled
    public static List<Stock__c> searchStocks(String item){
    	List<Stock__c> stock = [SELECT Medicine__r.Generic_Name__c, Medicine__r.Brand_Name__c, Quantity__c FROM Stock__c WHERE Medicine__r.Brand_Name__c = :item OR Medicine__r.Generic_Name__c =:item];
        return stock;
    }
}



