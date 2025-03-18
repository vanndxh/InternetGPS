import { View, Text, Map } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.less";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const handleMapError = (e) => {
    console.error("地图加载错误：", e.detail);
  };

  return (
    <View className="index">
      <Map
        className="map"
        longitude={116.39739}
        latitude={39.90886}
        scale={16}
        showLocation
        enableRotate
        enableOverlooking
        onError={handleMapError}
      />
    </View>
  );
}
