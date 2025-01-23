import {Button, Space, Table} from 'antd';
import {StatusModules} from "../../../../components/StatusModules.jsx";
import {useGetAllUsersHook} from "../hooks/useGetAllUsersHook.js";

export const TableUsers = () => {
    const {
        pageCount,
        isLoading,
        currentPage,
        users,
        setCurrentPage,
    } = useGetAllUsersHook()

    const mappedUsers = users.map((user, index) => ({
        key: user.id || index,
        name: user.name,
        phone: user.phone,
        email: user.email,
        status: user.status,
    }));

    const columns = [
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'phone', dataIndex: 'phone', key: 'phone'},
        {title: 'email', dataIndex: 'email', key: 'email'},
        {
            title: 'status', key: 'tags', dataIndex: 'tags', render: (_, record) => (
                <div>
                    <StatusModules value={record.status} activeText={"active"} inactiveText={"inactive"}/>
                </div>
            ),
        },
        {
            title: 'Action', key: 'action', render: () => (
                <Space size="middle">
                    <Button type={"primary"}>edit</Button>
                    <Button type={"primary"} danger>Delete</Button>
                </Space>
            ),
        },
    ];


    return <Table
        columns={columns}
        dataSource={mappedUsers}
        loading={isLoading}
        pagination={{
            current: currentPage,
            total: pageCount.total,
            pageSize: 10,
            onChange: (page) => setCurrentPage(page),
        }}/>
}