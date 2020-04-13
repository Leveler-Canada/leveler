import React, { Component } from "react";
import PlacesAutocomplete from "react-places-autocomplete";

const ERROR_MESSAGE = "No places found.";

class FormikPlacesAutoComplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.field.name,
      location: props.value || ""
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.location && nextProps.length === 0) {
      return { location: nextProps.value };
    }
    return null;
  }

  handleError = error => {
    this.props.form.setFieldError(this.state.name, ERROR_MESSAGE);
  };

  handleChange = location => {
    this.setState({ location }, () => {
      this.props.form.setFieldTouched(`${this.state.name}.value`);
      this.props.form.setFieldTouched(`${this.state.name}.location`);
      this.props.form.setFieldValue(this.state.name, location);
    });
  };

  handleSelect = location => {
    var payload = {};
    var fragments = location.split(',');
    if (fragments.length === 3) {
      payload.city = fragments[0].trim();
      payload.state = fragments[1].trim();
      payload.country = fragments[2].trim();
    } else {
      payload.city = fragments[0].trim();
      payload.state = "";
      payload.country = fragments[1].trim();
    }

    this.setState(() => {
      this.props.form.setFieldValue(this.state.name, payload);
      return { location };
    });
  };

  render() {
    const {
      field: { name }, // { name, value, onChange, onBlur }
      classes,
      label,
      ...props
    } = this.props;
    const { location } = this.state;
    const searchOptions = {
      types: ["(cities)"]
    };
    return (
      <PlacesAutocomplete
        name={name}
        id={name}
        {...props}
        value={location}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this.handleError}
        searchOptions={searchOptions}
        shouldFetchSuggestions={location.length >= 2}
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
