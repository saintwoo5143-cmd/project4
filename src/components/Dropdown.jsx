import { useState } from 'react';

function Dropdown({value, onChange}) {
  return (
    <div>
      <select value={value} onChange={e => onChange(e.target.value)}>
        <option value="">선택하세요</option>
        <option value="low">Low</option>
        <option value="medium">Middle</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}

export default Dropdown;