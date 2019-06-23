import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

function TextMaskField(props) {
    const { inputRef, mask, ...other } = props;

    return (
        <InputMask
            {...other}
            {...mask}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
        />
    );
}

const useRenderTextFieldStyles = makeStyles({
    root: {
        padding: '8px 8px 0 8px',
        boxSizing: 'border-box',
    },
    label: {
        padding: '12px 8px 0 8px',
        color: '#6a7989',
        fontWeight: 400,
    },
    labelShrink: {
        padding: '28px 8px 0 8px',
        fontSize: '14px',
    },
    input: {
        padding: '22px 14px 14px 14px',
    }
});

const RenderTextField = ({
    input,
    label,
    placeholder,
    className = "",
    meta: { touched, invalid, error },
    mask,
    ...other
}) => {
    const classes = useRenderTextFieldStyles({});

    return (
    <div className={className}>
        <FormControl variant="outlined" className={classes.root} fullWidth {...other}>
            <InputLabel className={classes.label} error={touched && invalid} classes={{shrink: classes.labelShrink}}>{label}</InputLabel>
            {mask
                ? <OutlinedInput classes={{input: classes.input}} error={touched && invalid} {...input} inputProps={{mask}} inputComponent={TextMaskField}/>
                : <OutlinedInput classes={{input: classes.input}} error={touched && invalid} {...input}/>
            }
            <FormHelperText error={touched && invalid}>{touched && error}</FormHelperText>
        </FormControl>
    </div>
    );
};

const useRenderRadioGroupStyles = makeStyles({
    root: {
        padding: '8px 8px 0 8px',
        boxSizing: 'border-box',
    },
    radioGroup: {
        flexDirection: 'row',
    },
});

const RenderRadioGroup = ({
    input,
    label,
    options,
    className = "",
    meta: { touched, error, invalid },
    ...other
}) => {
    const classes = useRenderRadioGroupStyles({});

    return (
    <div className={className}>
        <FormControl className={classes.root} fullWidth {...other}>
            <FormLabel component="legend" error={touched && invalid}>{label}</FormLabel>
            <RadioGroup {...input} className={classes.radioGroup}>
                {options.map((option) =>
                    <FormControlLabel key={option.value} {...option} value={option.value} control={<Radio color="primary"/>} label={option.label}/>
                )}
            </RadioGroup>
            <FormHelperText error={touched && invalid}>{touched && error}</FormHelperText>
        </FormControl>
    </div>
    );
};

const useRenderSelectStyles = makeStyles({
    root: {
        padding: '8px 8px 0 8px',
        boxSizing: 'border-box',
    },
    label: {
        padding: '12px 8px 0 8px',
    },
    labelShrink: {
        padding: '28px 8px 0 8px',
    },
    input: {
        padding: '22px 14px 14px 14px',
    }
});

const RenderSelect = ({
    input,
    label,
    options,
    className = "",
    meta: { touched, error, invalid },
    ...other
}) => {
    const classes = useRenderSelectStyles({});

    return (
    <div className={className}>
        <FormControl variant="outlined" className={classes.root} fullWidth {...other}>
            <InputLabel className={classes.label} error={touched && invalid} classes={{shrink: classes.labelShrink}}>{label}</InputLabel>
            <Select {...input} fullWidth error={touched && invalid} input={<OutlinedInput labelWidth={0} classes={{input: classes.input}}/>}>
                {options.map((option) =>
                    <MenuItem key={option.value} {...option} value={option.value}>{option.label}</MenuItem>
                )}
            </Select>
            <FormHelperText error={touched && invalid}>{touched && error || ' '}</FormHelperText>
        </FormControl>
    </div>
    );
};

const useRenderCheckboxStyles = makeStyles({
    root: {
        padding: '8px 8px 0 8px',
        boxSizing: 'border-box',
    },
});

const RenderCheckbox = ({
    input,
    label,
    className = "",
    meta: { touched, error, invalid },
    ...other
}) => {
    const classes = useRenderCheckboxStyles({});

    return (
    <div className={className}>
        <FormControlLabel
            className={classes.root} {...other}
            control={<Checkbox {...input} color="primary"/>}
            label="Primary"
        />
    </div>
    );
};

export {
    RenderTextField as TextField,
    RenderRadioGroup as RadioGroup,
    RenderSelect as Select,
    RenderCheckbox as Checkbox,
};