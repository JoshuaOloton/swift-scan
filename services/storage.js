import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    throw error;
  }
};

const getData = async (key) => {
  try {
    const role = await AsyncStorage.getItem(key);
    return role;
  } catch (error) {
    throw error;
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw error;
  }
};

export { storeData, getData, removeData };
