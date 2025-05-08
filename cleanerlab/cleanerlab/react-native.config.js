const path = require('path');

module.exports = {
    project: {
        ios:{},
        android:{}
    },
    assets:['./assets/Fonts/'],
    dependencies: {
        '@bam.tech/react-native-image-resizer': {
            root: path.join(__dirname, '..'),
        },
    },
}
