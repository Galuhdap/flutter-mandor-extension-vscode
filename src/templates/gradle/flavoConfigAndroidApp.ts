export const androidFlavorGradleTemplate = `

flavorDimensions += listOf("default")

productFlavors {
    create("dev") {
        dimension = "default"
        applicationIdSuffix = ".dev"
        versionNameSuffix = "-dev"
    }
    create("staging") {
        dimension = "default"
        applicationIdSuffix = ".staging"
        versionNameSuffix = "-staging"
    }
    create("production") {
        dimension = "default"
        applicationIdSuffix = ".production"
        versionNameSuffix = "-production"
    }
}
`;
