import { View, Text, Button } from "@tarojs/components";
import { useState } from "react";
import "./index.less";

interface SignalSource {
  id: string;
  name: string;
  status: string;
  type: string;
  location: string;
}

export default function Config() {
  const [signalSources, setSignalSources] = useState<SignalSource[]>([]);

  const handleAddSignal = () => {
    // TODO: 实现添加信号源的逻辑
  };

  return (
    <View className="config">
      <View className="signal-list">
        <View className="signal-header">
          <Text>信号源列表</Text>
          <Button className="add-button" onClick={handleAddSignal}>
            + 新增信号
          </Button>
        </View>
        <View className="signal-content">
          {signalSources.map((signal) => (
            <View key={signal.id} className="signal-item">
              <Text className="signal-name">{signal.name}</Text>
              <Text className="signal-status">{signal.status}</Text>
              <Text className="signal-type">{signal.type}</Text>
              <Text className="signal-location">{signal.location}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
