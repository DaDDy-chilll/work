function createData(id, date, item, description, amount, remark, status, _id) {
    return { id, date, item, description, amount, remark, status, _id };
}

export const rows = [
    createData('D_1', '10 Mar 2023', 'Laptop', "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, quidem quos! Quisquam quibusdam iste earum maxime provident reprehenderit, porro hic quae fugiat dolor, ex qui? Qui necessitatibus beatae corrupti aut!", 100000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, quidem quos", "pending", "562549217148"),

    createData('D_2', '9 Mar 2023', 'Mouse', "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, quidem quos! Quisquam quibusdam iste earum maxime provident reprehenderit, porro hic quae fugiat dolor, ex qui? Qui necessitatibus beatae corrupti aut!", 5000, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, quidem quos", "completed", "4712892171"),
];