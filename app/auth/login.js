import { useState } from "react";
import { router } from "expo-router";
import { View } from "react-native";
import { useFormik } from "formik";
import { Card, Button, TextInput, HelperText } from "react-native-paper";
import * as yup from "yup";

import useAuth from "../../components/context/auth";
import PageScroll from "../../components/ui/pageScroll";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function LoginScreen() {
  const { login } = useAuth();

  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setErrorMsg(null);
      setLoading(true);

      const { success, message } = await login(values.email, values.password);
      if (success) {
        router.replace("/task/taskList");
        resetForm();
      } else {
        setErrorMsg(message);
        resetForm();
      }

      setLoading(false);
    },
  });

  const { handleChange, handleSubmit, values, errors, touched } = formik;

  function onSignUp() {
    router.replace("/auth/signUp");
  }

  return (
    <PageScroll>
      <View
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: "#fff",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "100%", padding: 20 }}>
          <Card style={{ backgroundColor: "#fff", padding: 20 }} elevation={5}>
            <Card.Title
              title="Login"
              titleStyle={{
                color: "#000",
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
              }}
            />
            <Card.Content style={{ gap: 10 }}>
              {errorMsg && (
                <HelperText type="error" style={{ textAlign: "center" }}>
                  {errorMsg}
                </HelperText>
              )}
              <TextInput
                label="Email"
                mode="outlined"
                left={<TextInput.Icon icon="email" />}
                style={{ backgroundColor: "white" }}
                autoCapitalize="none"
                autoCorrect={false}
                value={values.email}
                autoCompleteType="email" // For Android
                textContentType="emailAddress" // For iOS
                onChangeText={handleChange("email")}
                error={errors.email && touched.email}
              />
              {errors.email && touched.email && (
                <HelperText type="error" visible={errors.email}>
                  {errors.email}
                </HelperText>
              )}
              <TextInput
                label="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                mode="outlined"
                secureTextEntry={secureText}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={secureText ? "eye-off" : "eye"}
                    onPress={() => setSecureText(!secureText)}
                  />
                }
                error={errors.password && touched.password}
                style={{ backgroundColor: "white" }}
              />
              {errors.password && touched.password && (
                <HelperText type="error" visible={errors.password}>
                  {errors.password}
                </HelperText>
              )}
            </Card.Content>
            <Card.Actions style={{}}>
              <View
                style={{
                  paddingVertical: 10,
                  flex: 1,
                  gap: 10,
                }}
              >
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  loading={loading}
                  disabled={loading}
                >
                  Login
                </Button>
                <Button mode="text" onPress={onSignUp} disabled={loading}>
                  Don't have an account? Sign up
                </Button>
              </View>
            </Card.Actions>
          </Card>
        </View>
      </View>
    </PageScroll>
  );
}
