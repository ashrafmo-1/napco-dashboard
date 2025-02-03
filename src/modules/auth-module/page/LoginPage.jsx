import { Button, Form, Input } from "antd";
import bg from "../../../assets/bg-reset.avif";
import { useAuthHook } from "../hooks/useAuthHook.js";

const LoginPage = () => {
  const [from] = Form.useForm();
  const { mutate, isPending } = useAuthHook();

  const OnSubmit = (values) => {
    mutate(values);
  };

  return (
    <section>
      <img
        src={bg}
        className="h-[300px] w-full object-cover"
        alt="Background"
      />
      <div className="flex flex-col items-center border-black border-2 border-solid w-fit mx-auto my-0 px-8 py-3 absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded-xl">
        <h2 className="text-2xl font-bold mb-4">welcome back napco!</h2>
        <Form
          className="w-full max-w-sm"
          layout="vertical"
          form={from}
          onFinish={OnSubmit}
        >
          <Form.Item
            className="mb-4"
            name="username"
            label={"Username"}
            rules={[{ required: true, message: "username is required" }]}
          >
            <Input placeholder="Enter your username" allowClear />
          </Form.Item>
          <Form.Item
            className="mb-4"
            name="password"
            type="password"
            label={"password"}
            rules={[{ required: true, message: "password is required" }]}
          >
            <Input.Password placeholder="Enter your username" allowClear />
          </Form.Item>
          <Button
            loading={isPending}
            disabled={isPending}
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default LoginPage;
