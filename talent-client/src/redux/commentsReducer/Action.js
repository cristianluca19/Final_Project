import axios from 'axios';
import * as actions from './Constants.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function addNewComment(datas) {
  let URL = `${BACKEND_URL}/comments/folder/${datas.folderId}/${datas.userId}`;
  if (datas.recruiterId) URL = URL.concat(`?recruiterId=${datas.recruiterId}`);
  return async (dispatch) => {
    const addComment = await axios.post(URL, { content: datas.content });
    dispatch({
      type: actions.ADD_NEW_COMMENT,
      payload: addComment.data,
    });
  };
}

export function getCommentsByFolderId(folderId) {
  return async (dispatch) => {
    const comments = await axios.get(
      `${BACKEND_URL}/comments/folder/${folderId}`
    );
    dispatch({
      type: actions.GET_COMMENTS_BY_FOLDER_ID,
      payload: comments.data,
    });
  };
}

export function editComment(datas) {
  return async (dispatch) => {
    await axios.put(`${BACKEND_URL}/comments/${datas.commentId}`, {
      content: datas.content,
    });
    dispatch({
      type: actions.EDIT_COMMENT,
      payload: datas,
    });
  };
}

export function deleteComment(datas) {
  return async (dispatch) => {
    await axios.delete(`${BACKEND_URL}/comments/${datas}`);
    dispatch({
      type: actions.DELETE_COMMENT,
      payload: datas,
    });
  };
}
