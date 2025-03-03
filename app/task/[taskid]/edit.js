import { useState, useCallback } from "react";
import { View } from "react-native";
import {
  Button,
  Text,
  TextInput,
  HelperText,
  ActivityIndicator,
} from "react-native-paper";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { useFormik } from "formik";
import * as yup from "yup";

import { updateTask, getTask } from "../../../components/services/tasks";
import PageScroll from "../../../components/ui/pageScroll";
import useToastHook from "../../../components/hooks/useToast";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

export default function TasksScreen() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const { successToast } = useToastHook();
  const { taskid } = useLocalSearchParams();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setErrorMsg(null);
      setLoading(true);

      const { success, message } = await updateTask(taskid, values);
      if (success) {
        successToast("Task updated successfully");
        router.back();
        resetForm();
      } else {
        setErrorMsg(message);
      }
      setLoading(false);
    },
  });

  const { handleChange, handleSubmit, values, errors, touched, setFieldValue } =
    formik;

  const fetchTask = async () => {
    setFetching(true);
    const { success, data } = await getTask(taskid);
    if (success) {
      setFieldValue("title", data.title);
      setFieldValue("description", data.description);
    }
    setFetching(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchTask();
    }, [])
  );

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
        {fetching && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              padding: 5,
            }}
          >
            <ActivityIndicator size={50} />
          </View>
        )}
        {!fetching && (
          <View style={{ flex: 1, gap: 20 }}>
            {errorMsg && (
              <HelperText type="error" style={{ textAlign: "center" }}>
                {errorMsg}
              </HelperText>
            )}
            <View>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}
              >
                Title
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Enter task title"
                style={{ backgroundColor: "white" }}
                value={values.title}
                onChangeText={handleChange("title")}
                error={errors.title && touched.title}
              />
              {errors.title && touched.title && (
                <HelperText type="error" visible={errors.title}>
                  {errors.title}
                </HelperText>
              )}
            </View>
            <View>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}
              >
                Description
              </Text>
              <TextInput
                placeholder="Enter task description"
                mode="outlined"
                style={{
                  backgroundColor: "white",
                  height: 120,
                  textAlignVertical: "top",
                }}
                multiline
                numberOfLines={5}
                value={values.description}
                onChangeText={handleChange("description")}
                error={errors.description && touched.description}
              />
              {errors.description && touched.description && (
                <HelperText type="error" visible={errors.description}>
                  {errors.description}
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
                Update
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
        )}
      </PageScroll>
    </View>
  );
}
