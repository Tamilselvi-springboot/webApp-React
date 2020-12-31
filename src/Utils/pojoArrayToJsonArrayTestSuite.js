export const PojoArrayToJsonArrayTestSuite = pojoArray =>{
   return pojoArray.map(item => ({
      scenario_No : item.scenario_No,
      scenario_Description : item.scenario_Description,
      precondition : item.precondition,
      step_Number : item.step_Number,
      step_Description : item.step_Description,
      step_ExpectedResult : item.step_ExpectedResult
   })
   );
}