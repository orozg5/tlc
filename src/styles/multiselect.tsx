export const multiSelectStyle = {
  control: (provided: any, state: { isFocused: any }) => ({
    ...provided,
    backgroundColor: "#93B1A6",
    border: state.isFocused ? "1px solid #040D12" : "1px solid #040D12",
    borderRadius: "8px",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid #5C8374",
    },
    width: "264px",
  }),

  placeholder: (provided: any) => ({
    ...provided,
    color: 'black',
  }),

  option: (provided: any, state: { isFocused: any }) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#93B1A6" : "transparent",
    "&:hover": {
      backgroundColor: "#93B1A6",
    },
  }),

  multiValueLabel: (provided: any) => ({
    ...provided,
    backgroundColor: "#183D3D",
    color: "#eeeeee",
  }),

  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "black",
    backgroundColor: "#eeeeee",
    "&:hover": {
      color: "black",
      backgroundColor: "#FAE392",
    },
  }),

  indicatorSeparator: (provided: any) => ({
    ...provided,
    backgroundColor: "black",
  }),

  clearIndicator: (provided: any) => ({
    ...provided,
    color: "black",
    "&:hover": {
      color: "#183D3D",
    },
  }),

  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "black",
    "&:hover": {
      color: "#183D3D",
    },
  }),
};
