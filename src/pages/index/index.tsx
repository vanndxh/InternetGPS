import { View, Map } from "@tarojs/components";
import "./index.less";

export default function Index() {
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
