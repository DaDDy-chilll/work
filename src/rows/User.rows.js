function createData(id, name, email, password, jobLabel, approvalAmount, _id) {
    return { id, name, email, password, jobLabel, approvalAmount, _id };
}

export const rows = [
    createData('U_1', 'Thae', 'thae@gmail.com', 'test1234', 'admin', 100000, "4817832036845"),
    createData('U_2', 'Nandar', 'nandar@gmail.com', 'test1234', 'executive', "258148631456"),
];