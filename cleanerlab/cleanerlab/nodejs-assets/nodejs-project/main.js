// Rename this sample file to main.js to use on your project.
// The main.js file will be overwritten in updates/reinstalls.

var rn_bridge = require('rn-bridge');
const Jimp = require("jimp");
const fs = require('fs');
var path = require('path');


global.appRoot = path.resolve(__dirname);
// Echo every message received from react-native.
rn_bridge.channel.on('message', async (base1,base2,isNew) => {

    // rn_bridge.channel.send(`Directory name is ${__dirname}`);

    // rn_bridge.channel.send(base1.node.location+' '+base2.node.location);

    // sharp(Buffer.from(base64,'base64'))
    //     .resize(16,16)
    //     .greyscale() // make it greyscale
    //     .linear(1.5, 0) // increase the contrast
    //     .toBuffer()
    //     .then( data1 => {
    //
    //       sharp(Buffer.from(secondBase64,'base64'))
    //           .resize(16,16)
    //           .greyscale() // make it greyscale
    //           .linear(1.5, 0) // increase the contrast
    //           .toBuffer()
    //           .then( async data2 => {
    //
    //             let base1 = data1.toString('base64')
    //             let base2 = data2.toString('base64')
    //             const first = await Jimp.read(Buffer.from(base1,'base64'));
    //
    //             const second = await Jimp.read(Buffer.from(base2,'base64'));
    //
    //             rn_bridge.channel.send({image1:base1.node.image.uri,image2:base2.node.image.uri,difference1:Jimp.diff(first, second).percent,difference2:Jimp.diff(second, first).percent})
    //
    //
    //
    //           })
    //
    //           .catch( err => {
    //             console.log(err) });
    //
    //
    //     })
    //     .catch( err => {
    //       console.log(err) });



    // fs.writeFile('1.jpg', base64, {encoding: 'base64'}, function(err) {
    //   console.log('File created');
    // });
    // fs.writeFile('2.jpg', secondBase64, {encoding: 'base64'}, function(err) {
    //   console.log('File created');
    // });

    // const firstBase = fs.readFileSync(base1.node.location, {encoding: 'base64'});
    // const secondBase = fs.readFileSync(base2.node.location, {encoding: 'base64'});
    const first = await Jimp.read(base1.resizedImage);

    const second = await Jimp.read(base2.resizedImage);



    // const { match, reason,diffCount,diffPercentage } = await compare(
    //     base1.localUri,
    //     base2.localUri,
    //     undefined
    // );
    // if(match){
    //     rn_bridge.channel.send({isScreenshot:base1.mediaSubtypes.indexOf('screenshot') != -1 ? true:false,image1:base1.uri,image2:base2.uri,match})
    //
    // }else if(diffPercentage){
    //     rn_bridge.channel.send({isScreenshot:base1.mediaSubtypes.indexOf('screenshot') != -1 ? true:false,image1:base1.uri,image2:base2.uri,match, reason,diffCount,diffPercentage})
    //
    // }else{
    //     rn_bridge.channel.send({match, reason,diffCount,diffPercentage})
    //
    // }
    // rn_bridge.channel.send(base1.node.location.length +' - '+base2.node.location.length)
    if(isNew==undefined){
        rn_bridge.channel.send({isScreenshot:base1.mediaSubtypes.indexOf('screenshot') != -1 ? true:false,image1:base1.uri,image2:base2.uri,difference1:Jimp.diff(first,second).percent,difference2:Jimp.diff(second,first).percent,isNew:false})

    }else{
        rn_bridge.channel.send({isScreenshot:base1.mediaSubtypes.indexOf('screenshot') != -1 ? true:false,image1:base1.uri,image2:base2.uri,difference1:Jimp.diff(first,second).percent,difference2:Jimp.diff(second,first).percent,isNew:true})

    }



    // await fs.unlink(base1.node.location, (err) => {
    //     if (err) {
    //         console.error(err)
    //         return
    //     }
    //     console.warn('silindi')
    //     //file removed
    // })
    // await fs.unlink(base2.node.location, (err) => {
    //     if (err) {
    //         console.error(err)
    //         return
    //     }
    //     console.warn('silindi')
    //     //file removed
    // })
    // rn_bridge.channel.send({image1:base1.node.image.uri,image2:base2.node.image.uri,difference:diff(Buffer.from(base1.node.location,'base64'),Buffer.from(base2.node.location,'base64'), { cyclesFix: false }).length});
} );

// Inform react-native node is initialized.
rn_bridge.channel.send("Node was initialized.");
