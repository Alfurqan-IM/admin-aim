import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Skeleton } from "@mui/material";
import { useLoginUser, useCurrentUser } from "features/users/userThunk";
import useRegister from "hooks/Register";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Loader1 } from "components copy/Loader";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/eidbackground.jpg";
import Grid from "@mui/material/Grid";
function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // State for form input
  const { email, password } = useSelector((store) => store.users);
  const { loginUser, isLoginIn } = useLoginUser();
  const {
    userDetails,
    status: { TextField },
  } = useRegister();
  const navigate = useNavigate();
  const { refetch, isCheckingCurrentUser } = useCurrentUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("You have not provided your email or password");
      return;
    }
    // Trigger login action
    loginUser({
      email,
      password,
    });
  };
  useEffect(() => {
    if (isLoginIn === "success") {
      refetch();
    }
    if (isCheckingCurrentUser === "success") navigate("/dashboard");
  }, [isLoginIn, isCheckingCurrentUser, navigate]);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="contained"
          bgColor="forest"
          borderRadius="lg"
          coloredShadow="forest"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}></Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>{TextField}</MDBox>
            <MDBox mb={2}>{userDetails[1].TextField}</MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                type="submit"
                disabled={!password}
                variant="contained"
                color="forest"
                fullWidth
              >
                {isLoginIn === "pending" ? <Loader1 /> : "Sign in"}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
