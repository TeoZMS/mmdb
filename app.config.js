import "dotenv/config"

module.exports = {
    name: "Movies Search Engine",
    slug: "mmdb",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
        buildNumber: "1.0.0",
        supportsTablet: true
    },
    android: {
        versionCode: 1,
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#ffffff"
        },
        package: "com.teoz_ms.mmdb"
    },
    web: {
        favicon: "./assets/favicon.png"
    },
    extra: {
        omdbKey: process.env.omdbKey,
        eas: {
            projectId: "d5ce4533-f803-4404-b1f3-ae7abc23c0b5"
        }
    }
}
