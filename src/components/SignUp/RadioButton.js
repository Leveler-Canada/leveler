import React from 'react';
import classNames from 'classnames';

const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
}) => {
    return (
      <div className="radio-button-group">
        <input
          name={name}
          id={id}
          type="radio"
          value={id} // could be something else for output?
          checked={id === value}
          onChange={onChange}
          onBlur={onBlur}
          className={classNames("radio-button")}
          {...props}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
};

export default RadioButton;