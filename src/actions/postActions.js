import {
    CHANGE_PROFILE_ERROR,
    CHANGE_PROFILE_SUCCESS,
    LOADING_AVATAR_PROFILE, LOADING_BANNER_PROFILE,
    LOADING_PROFILE,
    SET_PROFILE
} from "../types/profileTypes";
import axios from "../config/axios";
import {notification, message} from "antd";
import tokenAuth from "../config/tokenAuth";

const openNotification = (title, message, type) => {
    notification[type]({
        message: title,
        description: message,
        placement: "bottomRight"
    });
};

const showInfo = (text) => {
    message.info(text)
}

const loadingProfile = state => ({
    type: LOADING_PROFILE,
    payload: state
});

export function updateChangeProfileAction(data) {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        try {
            dispatch(loadingProfile(true))
            tokenAuth(token);
            const response = await axios.put('/api/profile/', data);
            if (response.data.profile) {
                dispatch(changeProfileSuccess(response.data.profile))
                showInfo("Cambios Guardados")
                //openNotification("Cambios Guardados", "", "info")
            }
        } catch (e) {
            if (e.response) {
                openNotification("Error", e.response.data.msg, "error")
            } else {
                openNotification("Error", "Ocurrió un error inesperado. Intenta nuevamente más tarde", "error")
            }
            dispatch(changeProfileError())
        }
    }
}

const changeProfileSuccess = profile => ({
    type: CHANGE_PROFILE_SUCCESS,
    payload: profile
});

const changeProfileError = () => ({
    type: CHANGE_PROFILE_ERROR
});

export function getProfileAction() {
    return async (dispatch) => {
        try {
            dispatch(loadingProfile(true))
            const response = await axios.get('/api/profile');
            if (response.data.profile) {
                dispatch(setProfile(response.data.profile))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

const setProfile = profile => ({
    type: SET_PROFILE,
    payload: profile
});

export function uploadFileAction(formData, name) {
    return async (dispatch) => {
        try {
            dispatch(loadingProfile(true))
            let response;
            if (name === 'avatar') {
                loadingAvatarProfile(true)
                response = await axios.put('/api/profile/avatar', formData);
            } else {
                loadingBannerProfile(true)
                response = await axios.put('/api/profile/banner', formData);
            }
            if (response.data.profile) {
                dispatch(setProfile(response.data.profile))
            }
            showInfo("Cambios Guardados")
        } catch (e) {
            console.log(e)
        }
    }
}

const loadingAvatarProfile = state => ({
    type: LOADING_AVATAR_PROFILE,
    payload: state
});

const loadingBannerProfile = state => ({
    type: LOADING_BANNER_PROFILE,
    payload: state
});