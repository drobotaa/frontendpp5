import { axiosReq } from "../api/axiosDefaults"

export const fetchMoreData = async (resource, setResource) => {
    try {
        const { data } = await axiosReq(resource.next)
        setResource(prevResource => ({
            ...prevResource,
            next: data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some(accResult => accResult.id === cur.id)
                    ? acc : [...acc, cur]
            }, prevResource.results)

        }))
    } catch (err) {

    }
}

export const followHelper = (profile, clickedProfile, following_id) => {
    return profile.id === clickedProfile.id
        ? // Clicked on profile, set following id, update followers count
        {
            ...profile,
            followers_count: profile.followers_count + 1,
            following_id
        }
        : profile.is_owner
            ? //logged in user, update following count
            {
                ...profile,
                following_count: profile.following_count + 1,
            }
            : // the profile not cliecked, unchanged
            profile;
}

export const unfollowHelper = (profile, clickedProfile) => {
    return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count -1,
        following_id: null,
    }
    :profile.is_owner
    ? {
        ...profile, following_count:profile.following_count -1,
    }
    : profile;
}