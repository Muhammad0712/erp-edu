import React from "react";
import { useNavigate } from "react-router-dom";
import { setItem } from "@helpers";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Select, Form } from "antd";
import { useAuth } from "@hooks";
import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@utils";

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const navigate = useNavigate();
  const { mutate } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      role: 'admin'
    },
  });

  const onSubmit = (values: any) => {
    mutate(
      { data: { email: values.email, password: values.password }, role: values.role },
      {
        onSuccess: (res: any) => {
          if (res.status === 201) {
            setItem("access_token", res.data.access_token);
            setItem("role", values.role);
            navigate(`/${values.role}`);
          }
        },
      }
    );
  };

  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center">
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        style={{
          width: 330,
          height: 420,
          borderRadius: 10,
          backgroundColor: "#FAFAFA",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          border: "1px solid #e1e1e1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <span className="font-bold h-[80px] flex items-center mt-[20px]">
          <p className="text-3xl">Sign In</p>
        </span>

        {/* Email */}
        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
          style={{ width: "84%" }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                placeholder="Enter an email..."
                prefix={<UserOutlined />}
              />
            )}
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
          style={{ width: "84%" }}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                size="large"
                placeholder="Enter a password..."
                prefix={<UnlockOutlined />}
                visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
              />
            )}
          />
        </Form.Item>

        {/* Role */}
        <Form.Item label="Role" style={{ width: "84%" }}>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                style={{ width: "100%", height: 38 }}
                options={[
                  {
                    label: <span>Admin</span>,
                    title: "Admins",
                    options: [{ label: <span>Admin</span>, value: "admin" }],
                  },
                  {
                    label: <span>Others</span>,
                    title: "others",
                    options: [
                      { label: <span>Teachers</span>, value: "teacher" },
                      { label: <span>Students</span>, value: "student" },
                      { label: <span>Lids</span>, value: "lids" },
                    ],
                  },
                ]}
              />
            )}
          />
        </Form.Item>

        <Form.Item style={{ width: "84%", display: "flex", justifyContent: "end" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
