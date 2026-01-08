import { Redirect } from "expo-router";

export default function Index() {
  // hardcoded for testing
  const role = "business"; // try "business" too

  if (role === "business") {
    return <Redirect href={"/(business)/" as any} />;
  } else {
    return <Redirect href={"/(farmer)/" as any} />;
  }
}
