/**
 * @file 信号源配置列表
 */
import { View, Text, Button } from "@tarojs/components";
import { useState, useRef } from "react";
import UpdateSignal from "./UpdateSignal";

import styles from "./index.module.less";

export interface SignalSource {
  id: string;
  name: string;
  type: string;
  color: string;
  radius?: number;
  remark?: string;
  position?: string;
}

export default function Config() {
  const touchStartX = useRef<number>(0);
  const currentTranslateX = useRef<number>(0);

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
      position: "123.456,789.012",
    },
  ]);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingSignal, setEditingSignal] = useState<SignalSource | null>(null);
  const [slidingId, setSlidingId] = useState<string | null>(null);

  const handleSubmit = (values: SignalSource) => {
    if (editingSignal) {
      setSignalSources(
        signalSources.map((signal) =>
          signal.id === editingSignal.id ? values : signal
        )
      );
    } else {
      setSignalSources([...signalSources, values]);
    }
    setDrawerVisible(false);
  };

  return (
    <View className={styles["config"]}>
      {signalSources.map((signal) => (
        <View
          key={signal.id}
          className={`${styles["signal-item"]} ${
            slidingId === signal.id ? styles.sliding : ""
          }`}
          onTouchStart={(e: any) => {
            touchStartX.current = e.touches[0].clientX;
            currentTranslateX.current = slidingId === signal.id ? -220 : 0;
          }}
          onTouchMove={(e: any) => {
            const currentX = e.touches[0].clientX;
            const diff = currentX - touchStartX.current;
            const newTranslateX = Math.max(
              -220,
              Math.min(0, currentTranslateX.current + diff)
            );

            if (newTranslateX < 0) {
              setSlidingId(signal.id);
            }
          }}
          onTouchEnd={(e: any) => {
            const currentX = e.changedTouches[0].clientX;
            const diff = currentX - touchStartX.current;

            if (diff < -110) {
              setSlidingId(signal.id);
            } else {
              setSlidingId(null);
            }
          }}
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
              onClick={() => {
                setEditingSignal(signal);
                setDrawerVisible(true);
              }}
            >
              编辑
            </View>
            <View
              className={`${styles["action-button"]} ${styles["delete-button"]}`}
              onClick={() => {
                setSignalSources(
                  signalSources.filter((signal) => signal.id !== signal.id)
                );
              }}
            >
              删除
            </View>
          </View>
        </View>
      ))}
      <Button
        className={styles["add-button"]}
        onClick={() => {
          setEditingSignal(null);
          setDrawerVisible(true);
        }}
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
