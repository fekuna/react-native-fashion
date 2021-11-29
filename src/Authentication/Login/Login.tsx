import React from "react";
import { StyleSheet, View } from "react-native";
import { Box, Button, Text } from "../../components";
import Container from "../../components/Container";
import SocialLogin from "../../components/SocialLogin";

const Login = () => {
  const footer = (
    <>
      <SocialLogin />
      <Box alignItems="center">
        <Button variant="transparent" onPress={() => {}}>
          <Box flexDirection="row" justifyContent="center">
            <Text variant="button" color="white">
              Don't have an account?
            </Text>
            <Text variant="button" color="primary" marginLeft="s">
              Sign up here
            </Text>
          </Box>
        </Button>
      </Box>
    </>
  );

  return (
    <Container {...{ footer }}>
      <View />
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({});
