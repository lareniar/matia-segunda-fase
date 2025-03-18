# Exercise: Form and Grid Implementation

## Overview

Create a form that adds records to a grid/table, all on the same screen.

## Form Requirements

### Fields

- **Name** → input (required)
- **Surname** → input (required)
- **Phone** → input (optional)
- **Email** → input (required, email format validation required)
- **Country** → dropdown list
  - Load data via GET request to: `https://countriesnow.space/api/v0.1/countries/flag/unicode`
  - Only load country names, discard other data
- **Province** → dropdown list
  - Load data via POST request to: `https://countriesnow.space/api/v0.1/countries/states`
  - Request body format: `{ "country": "Spain" }`
  - Only load province names, discard other data
  - Load only after country selection
  - Make new API call each time country changes
- **Add Button** → adds record to table when clicked

## API Documentation

Full API documentation available at: https://documenter.getpostman.com/view/1134062/T1LJjU52

## Grid/Table Requirements

- Display same fields as form in tabular format
- Implementation approach is flexible:
  - Horizontal scroll
  - Show only name and surname columns
  - Transform to card list view
  - Other creative solutions welcome

## Responsive Design Requirements

### Desktop View

- 3 controls per row

### Tablet View

- 2 controls per row

### Mobile View

- 1 control per row

## Technical Notes

- Framework/libraries choice is flexible
- Can be implemented with plain HTML, CSS, and JavaScript
