import { View, Form, Input, Button } from "@tarojs/components";
import styles from "./index.module.less";

interface SignalSource {
  id: string;
  name: string;
  type?: string;
  color?: string;
  location?: {
    latitude: number;
    longitude: number;
    radius: number;
  };
  remark?: string;
}

interface UpdateSignalProps {
  visible: boolean;
  onClose: () => void;
  initialValues?: SignalSource;
  onSubmit: (values: SignalSource) => void;
}

export default function UpdateSignal(props: UpdateSignalProps) {
  const { visible, onClose, initialValues, onSubmit } = props;
  const handleSubmit = (e: any) => {
    const values = e.detail.value;
    const submitData: SignalSource = {
      id: values.id,
      name: values.id,
      type: values.type || undefined,
      color: values.color || undefined,
      location:
        values.latitude || values.longitude || values.radius
          ? {
              latitude: Number(values.latitude) || 0,
              longitude: Number(values.longitude) || 0,
              radius: Number(values.radius) || 0,
            }
          : undefined,
      remark: values.remark || undefined,
    };
    onSubmit(submitData);
  };

  return (
    <View className={`${styles.drawer} ${visible ? styles.visible : ""}`}>
      <View className={styles.mask} onClick={onClose} />
      <View className={styles.content}>
        <Form onSubmit={handleSubmit} className={styles.form}>
          <View className={styles.formItem}>
            <View className={styles.label}>信号源ID</View>
            <Input
              className={styles.input}
              name="id"
              defaultValue={initialValues?.id}
              placeholder="请输入信号源ID"
            />
          </View>
          <View className={styles.formItem}>
            <View className={styles.label}>车型（可选）</View>
            <Input
              className={styles.input}
              name="type"
              defaultValue={initialValues?.type}
              placeholder="请输入车型"
            />
          </View>
          <View className={styles.formItem}>
            <View className={styles.label}>车颜色（可选）</View>
            <Input
              className={styles.input}
              name="color"
              defaultValue={initialValues?.color}
              placeholder="请输入车颜色"
            />
          </View>
          <View className={styles.formItem}>
            <View className={styles.label}>限行设置（可选）</View>
            <View className={styles.locationInputs}>
              <Input
                className={`${styles.input} ${styles.locationInput}`}
                name="latitude"
                defaultValue={initialValues?.location?.latitude.toString()}
                placeholder="纬度"
                type="number"
              />
              <Input
                className={`${styles.input} ${styles.locationInput}`}
                name="longitude"
                defaultValue={initialValues?.location?.longitude.toString()}
                placeholder="经度"
                type="number"
              />
              <Input
                className={`${styles.input} ${styles.locationInput}`}
                name="radius"
                defaultValue={initialValues?.location?.radius.toString()}
                placeholder="半径(米)"
                type="number"
              />
            </View>
          </View>
          <View className={styles.formItem}>
            <View className={styles.label}>备注（可选）</View>
            <Input
              className={styles.input}
              name="remark"
              defaultValue={initialValues?.remark}
              placeholder="请输入备注"
            />
          </View>
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
    </View>
  );
}
