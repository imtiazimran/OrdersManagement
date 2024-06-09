/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    if (data.username === "admin" && data.password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/sale-orders");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input type="text" {...register("username")} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register("password")} />
        </FormControl>
        <Button mt={4} type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
