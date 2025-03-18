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
      },
      {
        pagePath: "pages/config/index",
        text: "配置",
      },
    ],
    color: "#999",
    selectedColor: "#1677ff",
    backgroundColor: "#fff",
    borderStyle: "black",
  },
});
