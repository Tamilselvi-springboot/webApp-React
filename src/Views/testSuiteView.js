import React , {useState} from "react";
//import PropTypes from "prop-types";
//import clsx from "clsx";
import {  makeStyles } from "@material-ui/core/styles";
import CardContainer from '../containers/cardContainer'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Button from "@material-ui/core/Button";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
//import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
//import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
//import IconButton from "@material-ui/core/IconButton";
//import Tooltip from "@material-ui/core/Tooltip";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Switch from "@material-ui/core/Switch";
//import DeleteIcon from "@material-ui/icons/Delete";
//import FilterListIcon from "@material-ui/icons/FilterList";

const TestSuiteView = ({ testSuite, setSelectedTestSuites,columns, processed,handleExport }) => {
  const rows =  testSuite ;
const [isRunDisabled, setIsRunDisabled] = useState(false);
   const headCells = columns;
  // console.log("ccccccccccccccccccc" + headCells);

  function EnhancedTableHead(props) {
    const {
      classes,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      
    } = props;
   

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all scenarios" }}
            />
            {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
            <Typography
            style={{
              fontSize: 12,
            }}
              id="tableTitle"
              component="div"
            >
              Select All
            </Typography>
          )}
          </TableCell>
          { headCells.map((headCell, i) => (
            <TableCell
              key={i}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                
              >
                {headCell.label}
               
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

 

  // const useToolbarStyles = makeStyles((theme) => ({
  //   root: {
  //     paddingLeft: theme.spacing(2),
  //     paddingRight: theme.spacing(1),
  //   },
  //   highlight:
  //     theme.palette.type === "light"
  //       ? {
  //         color: theme.palette.secondary.main,
  //         backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  //       }
  //       : {
  //         color: theme.palette.text.primary,
  //         backgroundColor: theme.palette.secondary.dark,
  //       },
  //   title: {
  //     flex: "1 1 100%",
  //   },
  // }));

  // const EnhancedTableToolbar = (props) => {
  //   const classes = useToolbarStyles();
  //   const { numSelected } = props;

  //   return (
  //     <Toolbar
  //       className={clsx(classes.root, {
  //         [classes.highlight]: numSelected > 0,
  //       })}
  //     >
  //       {numSelected > 0 ? (
  //         <Typography
  //           className={classes.title}
  //           color="inherit"
  //           variant="subtitle1"
  //           component="div"
  //         >
  //           {numSelected} selected
  //         </Typography>
  //       ) : (
  //           <Typography
  //             className={classes.title}
  //             variant="h6"
  //             id="tableTitle"
  //             component="div"
  //           >
  //             TestSuites
  //           </Typography>
  //         )}
  //     </Toolbar>
  //   );
  // };

 
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  }));

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Scenario_No");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  //const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(property);
  // };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.scenario_No);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleRunClick =() =>{
      //document.getElementById('run').disabled = true;
      setIsRunDisabled(true);
      setSelectedTestSuites(selected);
    }
    var padding = 10 + 'px';  
    var top = 1000+ 'px';
  return (
    <div>
       <h1>Test Suites </h1>
      <Button id ='run' disabled = {isRunDisabled} style={{float: 'right',bottom:'10px', padding:padding }} variant="contained" color="primary" onClick= {handleRunClick}>
 Run
</Button>
{processed && < Button id ='export' style={{ left: '480px', bottom:'10px', padding:padding }} variant="contained" color="primary" onClick= {handleExport}>
 Export
</Button>
}
    <CardContainer width='100%' style ={{marginBottom:20, top:top }}>
    <div className={classes.root} style ={{marginBottom:20, top:top} }>
    
      
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"small"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
             
              rowCount={rows.length}
            />
            <TableBody>
            
             
              {testSuite!==undefined && !processed && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.scenario_No);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.scenario_No)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.scenario_No}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.scenario_No}
                      </TableCell>
                     
                      <TableCell align="left">
                        {row.scenario_Description}
                      </TableCell>
                      <TableCell align="left">{row.precondition}</TableCell>
                      <TableCell>
                        <ul>
                        
                          {row.step_Number.map((eachstep, i) => (
                            <li key={i} >{eachstep}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <ul>
                        
                          {row.step_Description.map((eachstep,i) => (
                            <li key={i}>{eachstep}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <ul>
                          
                          {row.step_ExpectedResult.map((eachstep,i) => (
                            <li key={i}>{eachstep}</li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  );
                })}
                 {testSuite!==undefined && processed && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.scenario_No);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.scenario_No)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.scenario_No}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.scenario_No}
                      </TableCell>
                     
                      <TableCell align="left">
                        {row.scenario_Description}
                      </TableCell>
                      <TableCell align="left">{row.precondition}</TableCell>
                      <TableCell>
                        <ul>
                        
                          {row.step_Number.map((eachstep, i) => (
                            <li key={i} >{eachstep}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <ul>
                        
                          {row.step_Description.map((eachstep,i) => (
                            <li key={i}>{eachstep}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <ul>
                          
                          {row.step_ExpectedResult.map((eachstep,i) => (
                            <li key={i}>{eachstep}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <ul>
                          
                          {row.step_ActualResult.map((eachstep,i) => (
                            <li key={i}>{eachstep}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <ul>
                          
                          {row.step_Status.map((eachstep,i) => (
                            <li key={i}>{eachstep}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell align="left">
                        {row.tcStatus}
                      </TableCell>
                      <TableCell align="left">
                       Export to view full logs
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
   
     
    </div>
 </CardContainer>
 
</div>
  );
 
};
export default TestSuiteView;
