export const host = process.env.REACT_APP_BACKEND_API

console.log({host});

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