import express from 'express';
import folderController from './controller';

export default express.Router().post('/', folderController.postFolder);
