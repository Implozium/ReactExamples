
/**
 * Возвращает свойства (props) поля из стейта (state) или пустой объект если его нет
 * 
 * @param {{fields: {}}} state стейт
 * @param {string} name имя поля
 * @return {{}} свойства (props) поля
 */
function getFieldProps(state, name) {
    return state && state.fields && state.fields[name] || {};
}

/**
 * Возвращает функцию для обновления поля новыми свойствами в стейте (state)
 * 
 * @param {string} name имя поля
 * @param {{}} fieldProps свойства (props) поля
 * @return {function ({fields: {}}, {}): {}} функция для обновления стейта (state)
 */
function updateFieldProps(name, fieldProps) {
    return (state, props) => {
        const oldField = state && state.fields && state.fields[name] || {};
        return {
            fields: {
                ...state.fields,
                [name]: {
                    ...oldField,
                    ...fieldProps,
                },
            }
        };
    };
}

/**
 * Возвращает функцию для установки (перезаписи) свойств поля в стейте (state)
 * 
 * @param {string} name имя поля
 * @param {{}} fieldProps свойства (props) поля
 * @return {function ({fields: {}}, {}): {}} функция для установки стейта (state)
 */
function setFieldProps(name, fieldProps) {
    return (state, props) => {
        return {
            fields: {
                ...state.fields,
                [name]: {
                    ...fieldProps,
                },
            }
        };
    };
}

/**
 * Инициализирует поля в стейте (state), напрямую модифицирует стейт
 * 
 * @param {{fields?: {}}} state стейт (state)
 * @param {string} name имя поля
 * @param {{}} fieldProps свойства (props) поля
 */
function initFieldProps(state, name, fieldProps) {
    if (!state.fields) {
        state.fields = {};
    }
    state.fields = {
        ...state.fields,
        [name]: {
            ...fieldProps,
        },
    };
}

export {
    getFieldProps,
    updateFieldProps,
    setFieldProps,
    initFieldProps,
}