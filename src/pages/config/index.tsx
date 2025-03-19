import { View, Text, Button } from "@tarojs/components";
import { useState } from "react";

import styles from "./index.module.less";

export default function Config() {
  const [signalSources, setSignalSources] = useState<ObjectType[]>([
    {
      id: "1",
      name: "信号源id",
      type: "奔驰",
    },
  ]);

  const handleAddSignal = () => {
    // TODO: 实现添加信号源的逻辑
  };

  return (
    <View className={styles["config"]}>
      {signalSources.map((signal) => (
        <View key={signal.id} className={styles["signal-item"]}>
          <Text className={styles["signal-name"]}>{signal.name}</Text>
          <Text className={styles["signal-type"]}>{signal.type}</Text>
        </View>
      ))}
      <Button
        className={styles["add-button"]}
        onClick={handleAddSignal}
        size="mini"
      >
        + 新增信号
      </Button>
    </View>
  );
}
