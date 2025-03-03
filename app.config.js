import "dotenv/config";

export default {
  expo: {
    extra: {
      API_URL: process.env.API_URL,
      eas: {
        projectId: process.env.EAS_PROJECT_ID,
      },
    },
    owner: "siak_7",
    android: {
      package: "com.siak_7.taskmanager",
    },
  },
};
