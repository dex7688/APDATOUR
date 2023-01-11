import React from 'react';
import styles from './SelectBox.module.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectBox({ items, label, labelId, selectId, handleOnChange, currentArea }) {
  return (
    <Box className={styles.selectBox}>
      <FormControl fullWidth>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          value={currentArea}
          labelId={labelId}
          id={selectId}
          label={label}
          onChange={(e) => handleOnChange(e.target.value)}
        >
          {items.map((item) => (
            <MenuItem value={item.code} key={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
