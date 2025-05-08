'use strict';
import React, {
    Component
} from 'react';

import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import userStore from "../store/userStore";
import Video,{FilterType} from 'react-native-video';
import {observer} from "mobx-react";
import {Spinner} from "native-base";
import I18n from "react-native-i18n";
var RNFS = require('react-native-fs')

const filterTypes = [
    FilterType.NONE,
    FilterType.INVERT,
    FilterType.MONOCHROME,
    FilterType.POSTERIZE,
    FilterType.FALSE,
    FilterType.MAXIMUMCOMPONENT,
    FilterType.MINIMUMCOMPONENT,
    FilterType.CHROME,
    FilterType.FADE,
    FilterType.INSTANT,
    FilterType.MONO,
    FilterType.NOIR,
    FilterType.PROCESS,
    FilterType.TONAL,
    FilterType.TRANSFER,
    FilterType.SEPIA
];
class VideoPlayer extends Component {
    constructor(props: any) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
    }
    state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0.0,
        uri:'',
        loading:false,
        currentTime: 0.0,
        controls: true,
        playButton:true,
        paused: true,
        skin: 'native',
        ignoreSilentSwitch: null,
        mixWithOthers: null,
        isBuffering: false,
        filter: FilterType.NONE,
        filterEnabled: true
    };

    onLoad(data: any) {
        console.log('On load fired!');
        this.setState({duration: data.duration});
    }

    onProgress(data: any) {
        this.setState({currentTime: data.currentTime});
    }

    onBuffer({ isBuffering }: { isBuffering: boolean }) {
        this.setState({ isBuffering });
    }

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0 && this.state.duration !== 0) {
            return this.state.currentTime / this.state.duration;
        } else {
            return 0;
        }
    }

    setFilter(step: number) {
        let index = filterTypes.indexOf(this.state.filter) + step;

        if (index === filterTypes.length) {
            index = 0;
        } else if (index === -1) {
            index = filterTypes.length - 1;
        }

        this.setState({
            filter: filterTypes[index]
        })
    }


    renderSkinControl(skin) {
        const isSelected = this.state.skin == skin;
        const selectControls = skin == 'native' || skin == 'embed';
        return (
            <TouchableOpacity onPress={() => { this.setState({
                controls: selectControls,
                skin: skin
            }) }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
                    {skin}
                </Text>
            </TouchableOpacity>
        );
    }
    componentDidMount() {
        const appleId = this.props.source.node.image.uri.substring(5, 41);
        const fileNameLength = this.props.source.node.image.filename.length;
        const ext = this.props.source.node.image.filename.substring(fileNameLength - 3);
        const uri = `assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`;
        this.setState({uri:uri})
    }
    renderRateControl(rate: number) {
        const isSelected = (this.state.rate == rate);

        return (
            <TouchableOpacity onPress={() => { this.setState({rate: rate}) }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
                    {rate}x
                </Text>
            </TouchableOpacity>
        )
    }

    renderResizeModeControl(resizeMode: string) {
        const isSelected = (this.state.resizeMode == resizeMode);

        return (
            <TouchableOpacity onPress={() => { this.setState({resizeMode: resizeMode}) }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }

    renderVolumeControl(volume: number) {
        const isSelected = (this.state.volume == volume);

        return (
            <TouchableOpacity onPress={() => { this.setState({volume: volume}) }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
                    {volume * 100}%
                </Text>
            </TouchableOpacity>
        )
    }

    renderIgnoreSilentSwitchControl(ignoreSilentSwitch: string) {
        const isSelected = (this.state.ignoreSilentSwitch == ignoreSilentSwitch);

        return (
            <TouchableOpacity onPress={() => { this.setState({ignoreSilentSwitch: ignoreSilentSwitch}) }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
                    {ignoreSilentSwitch}
                </Text>
            </TouchableOpacity>
        )
    }

    renderMixWithOthersControl(mixWithOthers: string) {
        const isSelected = (this.state.mixWithOthers == mixWithOthers);

        return (
            <TouchableOpacity onPress={() => { this.setState({mixWithOthers: mixWithOthers}) }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
                    {mixWithOthers}
                </Text>
            </TouchableOpacity>
        )
    }

    async changeLink(){
        const destPath = RNFS.CachesDirectoryPath + '/'+this.props.source.node.image.filename;

        try {
            await RNFS.copyAssetsVideoIOS(this.props.source.node.image.uri, destPath, 0, 0);
            console.log('destPath '+ 'file://'+destPath);
            this.setState({uri:'file://'+destPath,loading:false})
            this.props.source.node.location=destPath

        } catch (error) {
            await RNFS.unlink(destPath)
            this.changeLink()

        }


    }
    renderCustomSkin() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.fullScreen} onPress={() => {this.setState({paused: !this.state.paused})}}>
                    <Video
                        source={{uri:userStore.videoLink}}
                        style={styles.fullScreen}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        ignoreSilentSwitch={this.state.ignoreSilentSwitch}
                        mixWithOthers={this.state.mixWithOthers}
                        resizeMode={this.state.resizeMode}
                        onLoad={this.onLoad}
                        onBuffer={this.onBuffer}
                        onProgress={this.onProgress}
                        onEnd={() => {  }}
                        repeat={false}
                        onError={()=>{
                        }}
                        filter={this.state.filter}
                        filterEnabled={this.state.filterEnabled}
                    />
                </TouchableOpacity>

                <View style={styles.controls}>
                    <View style={styles.generalControls}>
                        <View style={styles.skinControl}>
                            {this.renderSkinControl('custom')}
                            {this.renderSkinControl('native')}
                            {this.renderSkinControl('embed')}
                        </View>
                        {
                            (this.state.filterEnabled) ?
                                <View style={styles.skinControl}>
                                    <TouchableOpacity onPress={() => {
                                        this.setFilter(-1)
                                    }}>
                                        <Text style={styles.controlOption}>Previous Filter</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.setFilter(1)
                                    }}>
                                        <Text style={styles.controlOption}>Next Filter</Text>
                                    </TouchableOpacity>
                                </View> : null
                        }
                    </View>
                    <View style={styles.generalControls}>
                        <View style={styles.rateControl}>
                            {this.renderRateControl(0.5)}
                            {this.renderRateControl(1.0)}
                            {this.renderRateControl(2.0)}
                        </View>

                        <View style={styles.volumeControl}>
                            {this.renderVolumeControl(0.5)}
                            {this.renderVolumeControl(1)}
                            {this.renderVolumeControl(1.5)}
                        </View>

                        <View style={styles.resizeModeControl}>
                            {this.renderResizeModeControl('cover')}
                            {this.renderResizeModeControl('contain')}
                            {this.renderResizeModeControl('stretch')}
                        </View>
                    </View>
                    <View style={styles.generalControls}>
                        {
                            (Platform.OS === 'ios') ?
                                <>
                                    <View style={styles.ignoreSilentSwitchControl}>
                                        {this.renderIgnoreSilentSwitchControl('ignore')}
                                        {this.renderIgnoreSilentSwitchControl('obey')}
                                    </View>
                                    <View style={styles.mixWithOthersControl}>
                                        {this.renderMixWithOthersControl('mix')}
                                        {this.renderMixWithOthersControl('duck')}
                                    </View>
                                </> : null
                        }
                    </View>

                    <View style={styles.trackingControls}>
                        <View style={styles.progress}>
                            <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
                            <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    renderNativeSkin() {
        const appleId = this.props.source.node.image.uri.substring(5, 41);
        const fileNameLength = this.props.source.node.image.filename.length;
        const ext = this.props.source.node.image.filename.substring(fileNameLength - 3);
        const uri = `assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`;
        this.props.source.node.location=uri
        const videoStyle = this.state.skin == 'embed' ? styles.nativeVideoControls : styles.fullScreen;
        return (
            <View style={styles.container}>
                <View style={styles.fullScreen}>
                    {this.state.loading ? (
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Spinner color={'white'} size={'large'} style={{marginTop:100}}/>
                            <Text style={{fontFamily:'Roboto-Medium',color:'white'}}> {I18n.t('loading')}</Text>
                        </View>
                    ):(<Video
                        source={{uri:this.state.uri}}
                        style={videoStyle}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        ignoreSilentSwitch={this.state.ignoreSilentSwitch}
                        mixWithOthers={this.state.mixWithOthers}
                        resizeMode={this.state.resizeMode}
                        onLoad={this.onLoad}
                        onBuffer={this.onBuffer}
                        onProgress={this.onProgress}
                        onError={()=>{
                            this.changeLink()
                            this.setState({loading:true})
                        }}
                        onEnd={() => {  }}
                        repeat={true}
                        controls={this.state.controls}
                        filter={this.state.filter}
                        filterEnabled={this.state.filterEnabled}
                    />)}

                </View>
                {/*<View style={styles.controls}>*/}
                {/*    <View style={styles.generalControls}>*/}
                {/*        <View style={styles.skinControl}>*/}
                {/*            {this.renderSkinControl('custom')}*/}
                {/*            {this.renderSkinControl('native')}*/}
                {/*            {this.renderSkinControl('embed')}*/}
                {/*        </View>*/}
                {/*        {*/}
                {/*            (this.state.filterEnabled) ?*/}
                {/*                <View style={styles.skinControl}>*/}
                {/*                    <TouchableOpacity onPress={() => {*/}
                {/*                        this.setFilter(-1)*/}
                {/*                    }}>*/}
                {/*                        <Text style={styles.controlOption}>Previous Filter</Text>*/}
                {/*                    </TouchableOpacity>*/}
                {/*                    <TouchableOpacity onPress={() => {*/}
                {/*                        this.setFilter(1)*/}
                {/*                    }}>*/}
                {/*                        <Text style={styles.controlOption}>Next Filter</Text>*/}
                {/*                    </TouchableOpacity>*/}
                {/*                </View> : null*/}
                {/*        }*/}
                {/*    </View>*/}
                {/*    <View style={styles.generalControls}>*/}
                {/*        <View style={styles.rateControl}>*/}
                {/*            {this.renderRateControl(0.5)}*/}
                {/*            {this.renderRateControl(1.0)}*/}
                {/*            {this.renderRateControl(2.0)}*/}
                {/*        </View>*/}

                {/*        <View style={styles.volumeControl}>*/}
                {/*            {this.renderVolumeControl(0.5)}*/}
                {/*            {this.renderVolumeControl(1)}*/}
                {/*            {this.renderVolumeControl(1.5)}*/}
                {/*        </View>*/}

                {/*        <View style={styles.resizeModeControl}>*/}
                {/*            {this.renderResizeModeControl('cover')}*/}
                {/*            {this.renderResizeModeControl('contain')}*/}
                {/*            {this.renderResizeModeControl('stretch')}*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*    <View style={styles.generalControls}>*/}
                {/*        {*/}
                {/*            (Platform.OS === 'ios') ?*/}
                {/*                <>*/}
                {/*                    <View style={styles.ignoreSilentSwitchControl}>*/}
                {/*                        {this.renderIgnoreSilentSwitchControl('ignore')}*/}
                {/*                        {this.renderIgnoreSilentSwitchControl('obey')}*/}
                {/*                    </View>*/}
                {/*                    <View style={styles.mixWithOthersControl}>*/}
                {/*                        {this.renderMixWithOthersControl('mix')}*/}
                {/*                        {this.renderMixWithOthersControl('duck')}*/}
                {/*                    </View>*/}
                {/*                </> : null*/}
                {/*        }*/}
                {/*    </View>*/}
                {/*</View>*/}

            </View>
        );
    }

    render() {
        return this.state.controls ? this.renderNativeSkin() : this.renderCustomSkin();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius:20
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,borderRadius:20
    },
    controls: {
        backgroundColor: "transparent",
        borderRadius: 5,
        position: 'absolute',
        bottom: 44,
        left: 4,
        right: 4,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        paddingBottom: 10,
    },
    skinControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ignoreSilentSwitchControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mixWithOthersControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: "white",
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
    nativeVideoControls: {
        top: 184,
        height: 300,
    },
    trackingControls: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default VideoPlayer
