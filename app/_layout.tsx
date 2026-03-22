import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar'; // Expo 推薦使用這個版本
import { useEffect } from 'react';
import { Platform } from 'react-native';

export default function RootLayout() {
  useEffect(() => {
    // 僅針對 Android 設定底部導覽列
    if (Platform.OS === 'android') {
      // 在 edge-to-edge 模式下底部通常是淺色背景，使用 dark 讓系統按鈕可見
      NavigationBar.setBackgroundColorAsync('#FFFFFF');
      NavigationBar.setButtonStyleAsync('dark');
    }
  }, []);
  return (
    <>
      {/* 設定頂部狀態欄：背景白色，圖示深色(dark) */}
      <StatusBar style="dark" backgroundColor="#FFFFFF" translucent={false} />
      
      {/* 你的頁面導航 */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="pinkbook" />
      </Stack>
    </>
  );
}