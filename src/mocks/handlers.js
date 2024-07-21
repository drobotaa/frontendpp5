import { rest } from "msw"

const baseURL = 'https://pp5-drobota-bd94aa0a3e49.herokuapp.com/'

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json(
            {
                "pk": 9,
                "username": "drobotaa",
                "email": "",
                "first_name": "",
                "last_name": "",
                "profile_id": 9,
                "profile_image": "https://res.cloudinary.com/dvbu7yreb/image/upload/v1/media/images/guy-image_gc73c3"
            }
        ));
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    })
]