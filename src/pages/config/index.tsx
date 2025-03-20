import { View, Text, Button } from "@tarojs/components";
import { useState, useRef } from "react";
import UpdateSignal from "./components/UpdateSignal";
import styles from "./index.module.less";

interface SignalSource {
  id: string;
  name: string;
  type: string;
  color: string;
  radius?: number;
  remark?: string;
}

export default function Config() {
  const [signalSources, setSignalSources] = useState<SignalSource[]>([
    {
      id: "1",
      name: "信号源id",
      type: "奔驰",
      color: "黑色",
      remark: "这是一个备注信息",
    },
    {
      id: "2",
      name: "信号源id",
      type: "奔驰",
      color: "黑色",
      remark: "这是一个备注信息",
    },
  ]);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingSignal, setEditingSignal] = useState<SignalSource | null>(null);
  const [slidingId, setSlidingId] = useState<string | null>(null);
  const touchStartX = useRef<number>(0);
  const currentTranslateX = useRef<number>(0);

  const handleAddSignal = () => {
    setEditingSignal(null);
    setDrawerVisible(true);
  };

  const handleEditSignal = (signal: SignalSource) => {
    setEditingSignal(signal);
    setDrawerVisible(true);
  };

  const handleDeleteSignal = (id: string) => {
    setSignalSources(signalSources.filter((signal) => signal.id !== id));
  };

  const handleSubmit = (values: SignalSource) => {
    if (editingSignal) {
      setSignalSources(
        signalSources.map((signal) =>
          signal.id === editingSignal.id
            ? { ...values, name: values.id }
            : signal
        )
      );
    } else {
      setSignalSources([...signalSources, { ...values, name: values.id }]);
    }
    setDrawerVisible(false);
  };

  const handleTouchStart = (e: any, id: string) => {
    touchStartX.current = e.touches[0].clientX;
    currentTranslateX.current = slidingId === id ? -220 : 0;
  };

  const handleTouchMove = (e: any, id: string) => {
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    const newTranslateX = Math.max(
      -220,
      Math.min(0, currentTranslateX.current + diff)
    );

    if (newTranslateX < 0) {
      setSlidingId(id);
    }
  };

  const handleTouchEnd = (e: any, id: string) => {
    const currentX = e.changedTouches[0].clientX;
    const diff = currentX - touchStartX.current;

    if (diff < -110) {
      setSlidingId(id);
    } else {
      setSlidingId(null);
    }
  };

  return (
    <View className={styles["config"]}>
      {signalSources.map((signal) => (
        <View
          key={signal.id}
          className={`${styles["signal-item"]} ${
            slidingId === signal.id ? styles.sliding : ""
          }`}
          onTouchStart={(e) => handleTouchStart(e, signal.id)}
          onTouchMove={(e) => handleTouchMove(e, signal.id)}
          onTouchEnd={(e) => handleTouchEnd(e, signal.id)}
        >
          <View className={styles["signal-content"]}>
            <Text className={styles["signal-name"]}>{signal.name}</Text>
            <View className={styles["signal-tags"]}>
              <Text className={styles.tag}>{signal.type}</Text>
              <Text className={styles.tag}>{signal.color}</Text>
            </View>
            {signal.remark && (
              <Text className={styles["signal-remark"]}>{signal.remark}</Text>
            )}
          </View>

          <View className={styles["signal-actions"]}>
            <View
              className={`${styles["action-button"]} ${styles["edit-button"]}`}
              onClick={() => handleEditSignal(signal)}
            >
              编辑
            </View>
            <View
              className={`${styles["action-button"]} ${styles["delete-button"]}`}
              onClick={() => handleDeleteSignal(signal.id)}
            >
              删除
            </View>
          </View>
        </View>
      ))}
      <Button
        className={styles["add-button"]}
        onClick={handleAddSignal}
        size="mini"
      >
        + 新增信号
      </Button>

      <UpdateSignal
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        initialValues={editingSignal || undefined}
        onSubmit={handleSubmit}
      />
    </View>
  );
}
