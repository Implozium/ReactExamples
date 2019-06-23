const Rules = {
    required(params = {}) {
        return (value) => {
            return !value ? params.message || 'required field' : null;
        }
    }
};

export default Rules;