import { Button } from "@tarojs/components";
import { useState } from "react";
import { Map } from "@tarojs/components";
import { AtModal, AtModalAction, AtModalContent, AtModalHeader } from "taro-ui";

import styles from "./index.module.less";

interface ChoosePositionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (position: string) => void;
}

export default function ChoosePositionModal(props: ChoosePositionModalProps) {
  const { visible, onClose, onSelect } = props;
  const [position, setPosition] = useState("");

  return (
    <AtModal
      isOpened={visible}
      onClose={onClose}
      // title="选择位置"
      // confirmText="确定"
    >
      <AtModalHeader>选择位置</AtModalHeader>

      <AtModalContent>
        <Map
          id="choose-position-map"
          longitude={114.31}
          latitude={30.57}
          scale={14}
          markers={[
            {
              id: 0,
              longitude: 114.31,
              latitude: 30.57,
              iconPath: "/images/marker.png",
              width: 20,
              height: 20,
            },
          ]}
          onError={() => {
            console.error("地图加载失败");
          }}
        />
      </AtModalContent>

      <AtModalAction>
        <Button className={styles.cancelButton} onClick={onClose}>
          取消
        </Button>
        <Button
          className={styles.confirmButton}
          onClick={() => {
            onSelect(position);
            onClose();
          }}
        >
          确定
        </Button>
      </AtModalAction>
    </AtModal>
  );
}
