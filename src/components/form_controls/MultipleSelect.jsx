import Multiselect from 'multiselect-react-dropdown'
import React from 'react'
import { colors } from '../../utils/theme'

const MultipleSelect = ({ users, handleSelect, selectedOptions }) => {  

  const result = users.map((user) => (
    {
      ...user,
      value: user._id,
      label: `${user.name} (${user.department})`,
    }
  ))

  return (
    <Multiselect
      options={result}
      onSelect={handleSelect}
      onRemove={handleSelect}
      displayValue="label"
      placeholder="Select Members"
      showCheckbox={true}
      closeIcon="cancel"
      style={{ chips: { background: colors.paleBlue[800] } }}
      closeOnSelect={false}
      selectedValues={selectedOptions}

    />
  )
}

export default MultipleSelect