import Form from "../components/Form";

const Login = () => {
  return (
    <div>
      <Form route="users/userapi/token/" method="login" />
    </div>
  );
};

export default Login;
