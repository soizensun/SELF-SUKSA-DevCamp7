import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
  });

  const month = [
    { value: '1', label: 'January'},
    { value: '2', label: 'Fabuary'},
    { value: '3', label: 'March'},
    { value: '4', label: 'April'},
    { value: '5', label: 'May'},
    { value: '6', label: 'June'},
    { value: '7', label: 'July'},
    { value: '8', label: 'August'},
    { value: '9', label: 'September'},
    { value: '10', label: 'October'},
    { value: '11', label: 'November'},
    { value: '12', label: 'December'},

  ];
  const day = [
    { value: '1', label: '1'},
    { value: '2', label: '2'},
    { value: '3', label: '3'},
    { value: '4', label: '4'},
    { value: '5', label: '5'},
    { value: '6', label: '6'},
    { value: '7', label: '7'},
    { value: '8', label: '8'},
    { value: '9', label: '9'},
    { value: '10', label: '10'},
    { value: '11', label: '11'},
    { value: '12', label: '12'},
    { value: '13', label: '13'},
    { value: '14', label: '14'},
    { value: '15', label: '15'},
    { value: '16', label: '16'},
    { value: '17', label: '17'},
    { value: '18', label: '18'},
    { value: '19', label: '19'},
    { value: '20', label: '20'},
    { value: '21', label: '21'},
    { value: '22', label: '22'},
    { value: '23', label: '23'},
    { value: '24', label: '24'},
    { value: '25', label: '25'},
    { value: '26', label: '26'},
    { value: '27', label: '27'},
    { value: '28', label: '28'},
    { value: '29', label: '29'},
    { value: '30', label: '30'},
    { value: '31', label: '31'},
  ];

  const currencies = [
    { value: '1989', label: '1989'},
    { value: '1990', label: '1990'},
    { value: '1991', label: '1991'},
    { value: '1992', label: '1992'},
    { value: '1993', label: '1993'},
    { value: '1994', label: '1994'},
    { value: '1995', label: '1995'},
    { value: '1996', label: '1997'},
    { value: '1998', label: '1998'},
    { value: '1999', label: '1999'},
    { value: '2000', label: '2000'},
  ];

class Field extends React.Component {
    state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
      };

        handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
    
    render(){
        const { classes } = this.props;
        return (
        <form className={classes.container} noValidate autoComplete="off">

        <TextField
          id="outlined-with-placeholder"
          label="N A M E"
          placeholder="Your name"
          style={{ width: "100%" }}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-with-placeholder"
          label="N A M E"
          placeholder="Your name"
          style={{ width: "100%" }}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        
        <TextField
          id="outlined-with-placeholder"
          label="N A M E"
          placeholder="Your name"
          style={{ width: "100%" }}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        {/* <div className = "dateOfBirth"> */}
          <TextField
            id="outlined-select-currency"
            select
            label="D A Y"
            className={classes.textField}
            value={this.state.currency}
            onChange={this.handleChange('currency')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText=""
            margin="normal"
            variant="outlined"
            style={{ width: "20%" }}
          >
            {day.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="M O N T H"
            className={classes.textField}
            value={this.state.currency}
            onChange={this.handleChange('currency')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText=""
            margin="normal"
            variant="outlined"
            style={{ width: "41%" }}
          >
            {month.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="Y E A R"
            className={classes.textField}
            value={this.state.currency}
            onChange={this.handleChange('currency')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="AD Born"
            margin="normal"
            variant="outlined"
            style={{ width: "27%" }}
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        {/* </div> */}
        
         </form>
        );
    }
}

export default withStyles(styles)(Field);