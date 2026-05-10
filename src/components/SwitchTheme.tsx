import { useAppTheme } from "@/theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

const ThemeSwitch = () => {
  const { theme, colors, toggleTheme } = useAppTheme();

  const isDark = theme === "dark";

  return (
    <Pressable onPress={toggleTheme}>
      <View
        style={[
          styles.track,
          {
            // backgroundColor: colors.input,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.thumb,
              {
                backgroundColor: colors.background,
                shadowColor: colors.shadow,
              },
            ]}
          >
            <Ionicons
              name={isDark ? "moon" : "sunny"}
              size={16}
              color={colors.primary}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ThemeSwitch;

const styles = StyleSheet.create({
  track: {
    width: 40,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: "center",
  },

  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  thumb: {
    width: 30,
    height: 30,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },
});
