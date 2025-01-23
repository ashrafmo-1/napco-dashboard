import {Title} from "../../components/TItle.jsx";
import {Form, Input} from "antd";
import {TableUsers} from "./components/TableUsersControls.jsx";
import {AddUser} from "./components/AddUser.jsx";

export const User = () => {
    return (
        <section>
            <Title moduleTitle={"users"} size={"3xl"}/>

            <section className={"users-filter bg-gray-50 p-2 rounded-lg mb-10"}>
                <Title moduleTitle={"filter"} size={"xl"}/>
                <Form.Item className={"w-2/5 mt-3"}>
                    <Input type={"search"} placeholder={"search"} allowClear/>
                </Form.Item>
            </section>

            <AddUser />

            {/*  user-module-controls-methods  */
            }
            <TableUsers/>
        </section>
    )
}