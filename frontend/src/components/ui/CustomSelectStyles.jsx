export const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: 'var(--input-background)',
    borderColor: state.isFocused ? 'var(--ring)' : 'var(--border)',
    borderRadius: '0.5rem',
    padding: '2px',
    boxShadow: state.isFocused ? '0 0 0 2px var(--ring-offset)' : 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    "&:hover": {
      borderColor: 'var(--ring)'
    }
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    zIndex: 50, 
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected 
      ? 'var(--primary)' 
      : state.isFocused 
        ? 'var(--secondary)' 
        : 'transparent',
    color: state.isSelected 
      ? 'var(--primary-foreground)' 
      : 'var(--foreground)',
    cursor: 'pointer',
    "&:active": {
      backgroundColor: 'var(--primary)',
      color: 'var(--primary-foreground)',
    }
  }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--foreground)',
  }),
  input: (base) => ({
    ...base,
    color: 'var(--foreground)',
  }),
  placeholder: (base) => ({
    ...base,
    color: 'var(--muted-foreground)',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: 'var(--muted-foreground)',
    "&:hover": {
      color: 'var(--foreground)'
    }
  }),
  clearIndicator: (base) => ({
    ...base,
    color: 'var(--muted-foreground)',
    "&:hover": {
      color: 'var(--destructive)'
    }
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: 'var(--border)',
  })
};