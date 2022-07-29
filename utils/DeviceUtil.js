import {Dimensions, StatusBar} from "react-native";

export default class DeviceUtil {
    /* returns the displayed window's width */
    static getWindowWidth() {
        return Dimensions.get('window').width;
    }

    /* returns the displayed window's height */
    static getWindowHeight() {
        return Dimensions.get('window').height;
    }

    /* returns the device's width */
    static getDeviceWidth() {
        return Dimensions.get('screen').width;
    }

    /* returns the device's height */
    static getDeviceHeight() {
        return Dimensions.get('screen').height;
    }

    static getStatusBarHeight() {
        return StatusBar.currentHeight;
    }
}