import { Alert } from '@mui/material';
import React from 'react';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const ErrorTemplate = ({ options, message }) => <Alert severity={options.type}>{capitalizeFirstLetter(message)}</Alert>;

export default ErrorTemplate;
