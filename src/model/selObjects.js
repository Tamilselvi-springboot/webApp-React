class SelObjects {
    objName;
    objLocatorMethod;
    objProperty;
    pageName;
    constructor(ObjName,ObjLocatorMethod,ObjProperty,PageName){
        if (ObjName === undefined){
            this.objName = '';
        } else{
            this.objName = ObjName;
        }

        if (ObjLocatorMethod === undefined){
            this.objLocatorMethod ='';
        } else{
            this.objLocatorMethod =ObjLocatorMethod;
        }
        
        if (ObjProperty === undefined){
            this.objProperty ='';
        } else{
            this.objProperty =ObjProperty;
        }

        if (PageName === undefined){
            this.pageName ='';
        } else{
            this.pageName =PageName;
        }
      
      
    }


} export default SelObjects;