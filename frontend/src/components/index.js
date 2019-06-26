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
import Button from '@material-ui/core/Button';
import { untouch } from 'redux-form';

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

const useErrorBlockStyles = makeStyles({
    root: {
        position: 'absolute',
        left: '-8px',
        right: '-8px',
        bottom: '100%',
        padding: '18px 10px',
        //minHeight: '55px',
        cursor: 'default',
        border: '1px solid #DF8782',
        borderRadius: '2px',
        backgroundColor: '#F6DEDD',
        boxShadow: '0 3px 4px 0 rgba(51,51,51,0.1)',
        color: '#260A0B',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '18px',
        zIndex: 1,
        '&::before': {
            display: 'block',
            content: "''",
            position: 'absolute',
            left: '50%',
            width: '10px',
            height: '10px',
            border: '10px solid transparent',
            boxSizing: 'border-box',
            
            bottom: '-20px',
            borderTopColor: '#DF8782',
        },
        '&::after': {
            display: 'block',
            content: "''",
            position: 'absolute',
            left: '50%',
            width: '10px',
            height: '10px',
            border: '10px solid transparent',
            boxSizing: 'border-box',

            bottom: '-19px',
            borderTopColor: '#F6DEDD',
        },
        '&$error': {
            color: '#260A0B',
        }
    },
    error: {
    }
});

const ErrorBlock = ({
    error,
    children = '',
    onClick = () => {},
}) => {
    const classes = useErrorBlockStyles({});

    return (
        <FormHelperText error={error} hidden={!error} onClick={onClick} classes={{root: classes.root, error: classes.error}}>{children}</FormHelperText>
    )
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
    meta: { touched, invalid, error, dispatch, form },
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
            <ErrorBlock error={touched && invalid} onClick={() => dispatch(untouch(form, input.name))}>{touched && error}</ErrorBlock>
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
    meta: { touched, error, invalid, dispatch, form },
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
            <ErrorBlock error={touched && invalid} onClick={() => dispatch(untouch(form, input.name))}>{touched && error}</ErrorBlock>
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
    meta: { touched, error, invalid, dispatch, form },
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
            <ErrorBlock error={touched && invalid} onClick={() => dispatch(untouch(form, input.name))}>{touched && error}</ErrorBlock>
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

const useRenderButtonStyles = makeStyles({
    root: {
        boxSizing: 'border-box',
        width: '100%',
        height: '48px',
        minWidth: '144px',
        borderRadius: '2px',
        fontSize: '18px',
        lineHeight: '34px',
        textTransform: 'none',
    },
    primary: {
        backgroundColor: '#2589DE',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#3599EE',
        }
    },
    link: {
        backgroundColor: 'transparent',
        color: '#2589DE',
        '&:hover': {
            color: '#3599EE',
        }
    }
});

const RenderButton = ({
    children,
    color = 'primary',
    className = "",
    ...other
}) => {
    const classes = useRenderButtonStyles({});

    return (
        <Button variant={color === 'link' ? undefined : "contained"} className={classes.root} classes={{root: classes[color] || classes['primary']}} {...other}>
            {children}
        </Button>
    );
};

export {
    RenderTextField as TextField,
    RenderRadioGroup as RadioGroup,
    RenderSelect as Select,
    RenderCheckbox as Checkbox,
    RenderButton as Button,
};