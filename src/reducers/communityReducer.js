import {
    CHANGE_PROFILE_ERROR,
    CHANGE_PROFILE_SUCCESS,
    LOADING_AVATAR_PROFILE, LOADING_BANNER_PROFILE,
    LOADING_PROFILE,
    SET_PROFILE
} from "../types/profileTypes";

const initialState = {
    profile: null,
    loadingProfile: false,
    formProfile: null,
    uploadingAvatar: false,
    uploadingBanner: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PROFILE:
            const profile = action.payload;
            const {displayName, about, showAdultContent, showInSearch, communitiesVisibility, contentVisibility, avatar, banner} = profile;
            const formProfile = {
                displayName,
                about,
                showAdultContent,
                showInSearch,
                communitiesVisibility,
                contentVisibility,
                avatar,
                banner
            }
            return {
                ...state,
                profile: action.payload,
                loadingProfile: false,
                formProfile
            }
        case CHANGE_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload,
                loading: false,
                uploadingAvatar: false,
                uploadingBanner: false,
            }
        case CHANGE_PROFILE_ERROR:
            return {
                ...state,
                loadingProfile: false
            }
        case LOADING_PROFILE:
            return {
                ...state,
                loadingProfile: action.payload,
            }
        case LOADING_AVATAR_PROFILE:
            return {
                ...state,
                uploadingAvatar: action.payload,
            }
        case LOADING_BANNER_PROFILE:
            return {
                ...state,
                uploadingBanner: action.payload,
            }
        default:
            return state;
    }
}