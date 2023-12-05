export const DefaultReactSelectStyle = {
    placeholder: (base: any) => ({
        ...base,
        color: "#999999",
        fontSize: 14,
        fontWeight: 300
    }),
    control: (provided: any, state: any) => ({
        ...provided,
        background: '#fff',
        borderColor: '#9e9e9e',
        color: '#000000',
        minHeight: '48px',
        height: '48px',
        fontWeight: 500,
        boxShadow: state.isFocused ? null : null,
        borderRadius: 10,
    }),
    option: (provided: any) => ({
        ...provided,
        fontSize: "14px",
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: '#000000'
    })
};