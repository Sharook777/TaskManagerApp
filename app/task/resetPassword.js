import { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput, HelperText } from "react-native-paper";
import { router } from "expo-router";
import { useFormik } from "formik";
import * as yup from "yup";

import PageScroll from "../../components/ui/pageScroll";
import useToastHook from "../../components/hooks/useToast";
import { resetPassword } from "../../components/services/user";

const validationSchema = yup.object().shape({
  currentPasword: yup.string().required("Current Password is required"),
  newPassword: yup
    .string()
    .min(8, "New Password must be at least 8 characters")
    .required("New Password is required"),
  confirmPassword: yup
    .string()
    .min(8, "Confirm Password must be at least 8 characters")
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords should match"),
});

export default function ResetPassword() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [secureText1, setSecureText1] = useState(true);
  const [secureText2, setSecureText2] = useState(true);
  const [secureText3, setSecureText3] = useState(true);

  const { successToast } = useToastHook();

  const formik = useFormik({
    initialValues: {
      currentPasword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setErrorMsg(null);
      setLoading(true);

      const { success, message } = await resetPassword(values);
      if (success) {
        successToast("Password reset successfull");
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f7f2f2",
        padding: 20,
        position: "relative",
      }}
    >
      <PageScroll>
        <View style={{ flex: 1, gap: 20 }}>
          {errorMsg && (
            <HelperText type="error" style={{ textAlign: "center" }}>
              {errorMsg}
            </HelperText>
          )}
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              Current Passowrd
            </Text>
            <TextInput
              value={values.currentPasword}
              onChangeText={handleChange("currentPasword")}
              mode="outlined"
              secureTextEntry={secureText1}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={secureText1 ? "eye-off" : "eye"}
                  onPress={() => setSecureText1(!secureText1)}
                />
              }
              error={errors.currentPasword && touched.currentPasword}
              style={{ backgroundColor: "white" }}
            />
            {errors.currentPasword && touched.currentPasword && (
              <HelperText type="error" visible={errors.currentPasword}>
                {errors.currentPasword}
              </HelperText>
            )}
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              New Passowrd
            </Text>
            <TextInput
              value={values.newPassword}
              onChangeText={handleChange("newPassword")}
              mode="outlined"
              secureTextEntry={secureText2}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={secureText2 ? "eye-off" : "eye"}
                  onPress={() => setSecureText2(!secureText2)}
                />
              }
              error={errors.newPassword && touched.newPassword}
              style={{ backgroundColor: "white" }}
            />
            {errors.newPassword && touched.newPassword && (
              <HelperText type="error" visible={errors.newPassword}>
                {errors.newPassword}
              </HelperText>
            )}
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              Confirm Passowrd
            </Text>
            <TextInput
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              mode="outlined"
              secureTextEntry={secureText3}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={secureText3 ? "eye-off" : "eye"}
                  onPress={() => setSecureText3(!secureText3)}
                />
              }
              error={errors.confirmPassword && touched.confirmPassword}
              style={{ backgroundColor: "white" }}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <HelperText type="error" visible={errors.confirmPassword}>
                {errors.confirmPassword}
              </HelperText>
            )}
          </View>

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
              Reset
            </Button>
            <Button
              mode="outlined"
              onPress={() => router.back()}
              disabled={loading}
            >
              Cancel
            </Button>
          </View>
        </View>
      </PageScroll>
    </View>
  );
}
