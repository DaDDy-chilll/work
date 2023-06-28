export const host = process.env.REACT_APP_API_URL
// "https://parami-dev-project.herokuapp.com/api"
// export const host = "https://parami-project.herokuapp.com/api"

// auth api
export const authRoute = `${host}/auth`

// user api
export const userRoute = `${host}/users`

// group api
export const groupRoute = `${host}/reviewer-groups`

// group api
export const departmentRoute = `${host}/departments`

// document api
export const documentRoute = `${host}/documents`

// noti api
export const notiRoute = `${host}/notifications`

// remark api
export const remarkRoute = `${host}/histories`

// revision api
export const revisionRoute = `${host}/revisions`