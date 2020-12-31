export const PojoArrayToJsonArraySelObj = pojoArray =>{
   return pojoArray.map(item => ({
      objName : item.objName,
      objLocatorMethod: item.objLocatorMethod,
      objProperty : item.objProperty,
      pageName : item.pageName
      
   })
   );
}