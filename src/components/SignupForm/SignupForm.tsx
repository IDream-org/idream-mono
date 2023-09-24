"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import { useAppDispatch } from "@/app/redux/hooks";
import { errorSnackbar } from "@/app/redux/features/snackbarSlice";

const SignupForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!data.firstName) return setError({ ...error, firstName: true });
    if (!data.lastName)
      return setError({ ...error, lastName: false, firstName: true });
    if (!data.email)
      return setError({
        ...error,
        lastName: false,
        firstName: false,
        email: true,
      });
    if (!data.password)
      return setError({
        ...error,
        lastName: false,
        firstName: false,
        email: false,
        password: true,
      });
    setError({
      lastName: false,
      firstName: false,
      email: false,
      password: false,
    });

    const { firstName, lastName, email, password } = data;

    try {
      await axios.post("/api/auth/register", {
        headers: {
          "Content-Type": "application/json",
        },
        body: { firstName, lastName, email, password },
      });

      router.push("/");
    } catch (error) {
      console.error((error as AxiosError).response!.data);
      dispatch(
        errorSnackbar({
          message: (error as AxiosError).response!.data as string,
        })
      );
    }
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            value={data.firstName}
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            error={error.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={data.lastName}
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            error={error.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={data.email}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={error.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={data.password}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            error={error.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            href=""
            onClick={(e) => {
              e.preventDefault();
              router.push("/");
            }}
            variant="body2"
          >
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignupForm;
