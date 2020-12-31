import React from 'react';
import Card from '@material-ui/core/Card';

const CardContainer =({children, width =485}) =>{
return (<Card style ={{width:width, height:500, overflow:'auto'}}>{children}</Card>);
}
export default CardContainer;