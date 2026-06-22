import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import IoniconsFont from "@react-native-vector-icons/ionicons/fonts/Ionicons.ttf";
import PoppinsRegular from "./src/assets/fonts/Poppins-Regular.ttf";
import PoppinsMedium from "./src/assets/fonts/Poppins-Medium.ttf";
import PoppinsSemiBold from "./src/assets/fonts/Poppins-SemiBold.ttf";
import PoppinsBold from "./src/assets/fonts/Poppins-Bold.ttf";
import PoppinsLight from "./src/assets/fonts/Poppins-Light.ttf";

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @font-face {
      font-family: "Ionicons";
      src: url(${IoniconsFont}) format("truetype");
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: "Poppins-Regular";
      src: url(${PoppinsRegular}) format("truetype");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "Poppins-Medium";
      src: url(${PoppinsMedium}) format("truetype");
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "Poppins-SemiBold";
      src: url(${PoppinsSemiBold}) format("truetype");
      font-weight: 600;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "Poppins-Bold";
      src: url(${PoppinsBold}) format("truetype");
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "Poppins-Light";
      src: url(${PoppinsLight}) format("truetype");
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
}

AppRegistry.registerComponent(appName, () => App);

const rootTag = document.getElementById("root");
if (rootTag) {
  AppRegistry.runApplication(appName, {
    rootTag,
  });
}
