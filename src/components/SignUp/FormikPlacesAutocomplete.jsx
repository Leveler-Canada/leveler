import React, { Component } from "react";
import PlacesAutocomplete from "react-places-autocomplete";

class FormikPlacesAutoComplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.field.name,
      location: props.value || ""
    };
  }

  handleError = error => {
    this.props.form.setFieldError(this.state.name, error);
  };

  handleChange = location => {
    this.setState(() => {
      this.props.form.setFieldTouched(`${this.state.name}.value`);
      this.props.form.setFieldTouched(`${this.state.name}.location`);
      this.props.form.setFieldValue(this.state.name, { value: location });
      return { location };
    });
  };

  handleSelect = location => {
    console.log(location);
    var payload = {};
    var fragments = location.split(',');
    if (fragments.length === 3) {
      payload.city = fragments[0];
      payload.state = fragments[1];
      payload.country = fragments[2];
    } else {
      payload.city = fragments[0];
      payload.state = "";
      payload.country = fragments[1];
    }
    this.setState(() => {
      this.props.form.setFieldValue(this.state.name, payload);
    });
  };

  render() {
    const {
      field: { name, ...field }, // { name, value, onChange, onBlur }
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      classes,
      label,
      ...props
    } = this.props;

    const error = errors[name];
    const touch = touched[name];
    const searchOptions = {
      types: ['(cities)']
     }
    return (
      <PlacesAutocomplete
        name={name}
        id={name}
        {...props}
        value={this.state.location}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this.handleError}
        searchOptions={searchOptions}
        shouldFetchSuggestions={this.state.location.length > 2}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "search for your city",
                className: "location-search-input form-control"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default FormikPlacesAutoComplete;
