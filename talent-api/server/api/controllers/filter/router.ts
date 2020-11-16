import express from 'express';
import candidateFiler from './controller';

export default express.Router().get('/', candidateFiler.filter);
