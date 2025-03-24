import { View, Form, Input, Button } from "@tarojs/components";
import { useRef, useState } from "react";
import ChoosePositionModal from "../ChoosePositionModal";
import { SignalSource } from "..";

import styles from "./index.module.less";

interface UpdateSignalProps {
  visible: boolean;
  onClose: () => void;
  initialValues?: SignalSource;
  onSubmit: (values: SignalSource) => void;
}

export default function UpdateSignal(props: UpdateSignalProps) {
  const { visible, onClose, initialValues, onSubmit } = props;
  const formRef = useRef<any>(null);

  const [choosePositionVisible, setChoosePositionVisible] = useState(false);

  const formItems = [
    {
      name: "id",
      label: "信号源ID",
      render: () => (
        <Input
          className={styles.input}
          name="id"
          defaultValue={initialValues?.id}
          placeholder="请输入信号源ID"
        />
      ),
    },
    {
      name: "name",
      label: "别名",
      render: () => (
        <Input
          className={styles.input}
          name="name"
          defaultValue={initialValues?.name}
          placeholder="请输入别名"
        />
      ),
    },
    {
      name: "type",
      label: "车型",
      render: () => (
        <Input
          className={styles.input}
          name="type"
          defaultValue={initialValues?.type}
          placeholder="请输入车型"
        />
      ),
    },
    {
      name: "color",
      label: "车颜色",
      render: () => (
        <Input
          className={styles.input}
          name="color"
          defaultValue={initialValues?.color}
          placeholder="请输入车颜色"
        />
      ),
    },
    {
      name: "location",
      label: "限行中心",
      render: () => (
        <View className={styles.locationInputs}>
          <Input
            className={`${styles.input} ${styles.locationInput}`}
            name="location"
            value={initialValues?.position}
            placeholder="经纬度"
            disabled
          />
          <Button onClick={() => setChoosePositionVisible(true)}>
            从地图选择
          </Button>
        </View>
      ),
    },
    {
      name: "radius",
      label: "半径/千米",
      render: () => (
        <Input
          className={styles.input}
          name="radius"
          defaultValue={initialValues?.radius?.toString()}
          placeholder="请输入半径"
          type="number"
        />
      ),
    },
    {
      name: "remark",
      label: "备注",
      render: () => (
        <Input
          className={styles.input}
          name="remark"
          defaultValue={initialValues?.remark}
          placeholder="请输入备注"
        />
      ),
    },
  ];

  const handleSubmit = (e: any) => {
    const values = e.detail.value;
    const params = {
      ...values,
    };
    onSubmit(params);
  };

  return (
    <View className={`${styles.drawer} ${visible ? styles.visible : ""}`}>
      <View className={styles.mask} onClick={onClose} />

      <View className={styles.content}>
        <Form onSubmit={handleSubmit} className={styles.form}>
          {formItems.map((item) => (
            <View className={styles.formItem} key={item.name}>
              <View className={styles.label}>{item.label}</View>
              {item.render()}
            </View>
          ))}

          <View className={styles.buttons}>
            <Button className={styles.cancelButton} onClick={onClose}>
              取消
            </Button>
            <Button className={styles.submitButton} formType="submit">
              确定
            </Button>
          </View>
        </Form>
      </View>

      <ChoosePositionModal
        visible={choosePositionVisible}
        onClose={() => setChoosePositionVisible(false)}
        onSelect={(position: string) => {
          formRef.current.setFieldsValue({
            position,
          });
          setChoosePositionVisible(false);
        }}
      />
    </View>
  );
}
