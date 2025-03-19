export default defineAppConfig({
  pages: ["pages/index/index", "pages/config/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "InternetGPS",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/index.png",
        selectedIconPath: "./assets/index-active.png",
      },
      {
        pagePath: "pages/config/index",
        text: "配置",
        iconPath: "./assets/config.png",
        selectedIconPath: "./assets/config-active.png",
      },
    ],
    color: "#999",
    selectedColor: "#999",
    backgroundColor: "#fff",
    borderStyle: "black",
  },
});
