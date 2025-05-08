import { observable, makeObservable, makeAutoObservable, runInAction, action, computed } from "mobx"; //observable kismi dinamik degisken , mobx ise storage managment icin durum yonetimi icin kullanilan bir arac
import {Alert, Dimensions, Platform,AppState} from "react-native";
import axios from "axios"; //api istekleri icin get post update istekleri icin kullaniyoruz
import DeviceInfo from 'react-native-device-info'; //devicen kimlik adresini almak icin ime icin kullaniyoruz 
import AsyncStorage from "@react-native-community/async-storage"; //mpbul cihaz icinde fiziksel nir depolama alani var local storage 
import  CameraRoll  from "@react-native-community/cameraroll"; //forograflari import etmek icin kullaniyoruz
import * as MediaLibrary from 'expo-media-library'; //mediadaki herseyi cekmeye yariyor
import { Appearance } from 'react-native' //  gorunum ve style ile alakali
import RNRestart from 'react-native-restart'; // Import package from node modules uygulamayi yeniden baslatan modul
import {AppEventsLogger} from "react-native-fbsdk-next"; //fb paketi burda uygulama girisi cikisi takip deiliyor

import nodejs from 'nodejs-mobile-react-native'; //nodejs koprusu icin kullaniyoruz
import {API_BASE, key} from "../constants"; // sabit stringler jimp bitmap
import OneSignal from "react-native-onesignal"; //bildirimler icin
import BackgroundService from 'react-native-background-actions'; //uygulamanin arka planda calismasi icin
import ImageColors from 'react-native-image-colors'
import { reloadAllTimelines } from 'react-native-widgetkit'; // widget ile alakali ufak kutucuklarla ilgili
import * as Contact from 'expo-contacts'; //rehber cekme

import { stat } from 'react-native-fs'; //dosya yazma okuma paketi
import * as RNLocalize from "react-native-localize"; //uygulamanin hangi dilde kullanildigini ogreniyoz

import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Contacts from 'react-native-contacts'; //rehber cekme
import ImageResizer from 'react-native-image-resizer'; // bununla fotograflari kucultuyoruz 16x16 seklinde
import DeviceCountry, {TYPE_ANY} from "react-native-device-country"; //cihaz hangi ulkede onu ogreniyoruz
import SharedGroupPreferences from "react-native-shared-group-preferences"; //rn kurdugu paket
import I18n from "react-native-i18n"; // dil paketimiz

class userStore {
    first=false
    token = null
    checkedImages=[]
    deleteLoading=false
    photos = []
    similars = []
    similarsLoading=false
    duplicatedContactsName=[]
    duplicatedContactsPhone=[]
    activeDuplicated=[]
    selectedDuplicated=[]
    totalCleanable=0
    contacts=[]
    selectedContacts=[]
    screenshots=[]
    similarsTotal= 0
    ekransTotal=0
    same=[]
    ekrans=[]
    packages=[]
    sameTotal=0
    cleanable=0
    selected = []
    selectedAll = false
    selectedAllSame = false
    selectedAllEkrans = false
    selectedOther=[]
    otherTotalSize=0
    otherWholeSize=0
    exist = []
    detailGroup=[]
    whiteList=[]
    activeDetail=''
    premiumCount = 1
    premiumSync = false
    video = null
    allImages = []
    syncPhotos = 0
    currentAnalyze = []
    allVideos = []
    allContacts = []
    videoLink = ''
    screen = Dimensions.get('window')
    videoTotal=0
    videoFilterType=0
    similarsFilterType=0
    ekransFilterType=0
    sameFilterType=0
    sameSelected=[]
    imageLoaded=true
    screenshotFilterType=0
    imageTotal=0
    imageFilterType=2
    premium=false
    deviceId= ""
    password=null
    passwordActive=false
    kept=[]
    keptSelected=[]
    secretSelected=[]
    videoSelected=[]
    screenSelected=[]
    loading=true
    wholeImages=[]
    sameTotalSize=0
    similarTotalSize=0
    screenTotalSize=0
    videoTotalSize=0
    ekransoptimized=false
    photosoptimized=false
    photoOptimized=0
    usedMedia=0
    premiumNative=false
    premiumScreen='paris'
    premiumPackages=[]
    subs={}
    country=null
    language=null
    totalFileSize=0
    processing=false
    contactsLoading=false
    comparingStarted=false
    lastSlider=false
    secretItems=[]
    secretVideos=[]
    isDarkTheme=false
    colors={}
    chargeAnimation=null
    finished=false
    fastClean=[]
    fastCleanTrash=[]
    fastCleanTotalSize=0
    cardIndex=0
    newscomparingStarted=false
    theme='light'
    deletePopup=false
    deletePage=''
    deleteAfter=false
    dailySimilar=0
    dailySame=0
    dailyEkrans=0
    dailyOther=0
    dailyVideo=0
    ligthTheme={
        background:'#FFFFFF',
        homeBoxBackground:'#EFF4FF',
        textColor:'#000000',
    }
    darkTheme={
        background:'#00041A',
        homeBoxBackground:'#252747',
        textColor:'#FFFEFF'



    }
    activeTheme={}
    willMergeContacts=[]
    willMergeNames=[]
    activeMergeList=[]
    activeMergeListLength=0
    activeMergeLength=0
    selectedMerges=[]
    mergesSelected=false
    mergeArr=[]
    mergesLoading=false
    videosSize=0
    appState='active'
    ratingActive=true
    dailyLimit=10
    analyzing=true
    lastIndex = 0
    adActive=false
    constructor(username) {
        makeObservable(this, {
            adActive:observable,
            lastIndex:observable,
            analyzing:observable,
            ratingActive:observable,
            dailyLimit:observable,
            appState:observable,
            videosSize:observable,
            mergesLoading:observable,
            mergeArr:observable,
            activeMergeLength:observable,
            mergesSelected:observable,
            otherWholeSize:observable,
            selectedMerges:observable,
            activeMergeListLength:observable,
            activeMergeList:observable,
            willMergeNames:observable,
            willMergeContacts:observable,
            activeTheme:observable,
            ligthTheme:observable,
            darkTheme:observable,
            dailyOther:observable,
            dailyVideo:observable,
            dailySimilar:observable,
            dailySame:observable,
            dailyEkrans:observable,
            theme:observable,
            deletePage:observable,
            deletePopup:observable,
            newscomparingStarted:observable,
            cardIndex:observable,
            fastCleanTrash:observable,
            fastCleanTotalSize:observable,
            fastClean:observable,
            selectedAllSame:observable,
            selectedAllEkrans:observable,
            secretVideos:observable,
            secretSelected:observable,
            chargeAnimation:observable,
            colors:observable,
            isDarkTheme:observable,
            secretItems:observable,
            checkedImages:observable,
            contactsLoading:observable,
            imageLoaded:observable,
            first:observable,
            processing:observable,
            totalFileSize:observable,
            subs:observable,
            country:observable,
            language:observable,
            premiumNative:observable,
            premiumScreen:observable,
            premiumPackages:observable,
            packages:observable,
            usedMedia:observable,
            similarsLoading:observable,
            selectedDuplicated:observable,
            selectedAll:observable,
            activeDuplicated:observable,
            selectedContacts:observable,
            selectedOther:observable,
            otherTotalSize:observable,
            ekransFilterType:observable,
            ekransTotal:observable,
            photoOptimized:observable,
            ekrans:observable,
            finished:observable,
            ekransoptimized:observable,
            photosoptimized:observable,
            videoTotalSize:observable,
            screenTotalSize:observable,
            similarTotalSize:observable,
            sameTotalSize:observable,
            sameSelected:observable,
            sameFilterType:observable,
            similarsFilterType:observable,
            wholeImages:observable,
            loading:observable,
            keptSelected:observable,
            videoSelected:observable,
            screenSelected:observable,
            passwordActive:observable,
            kept:observable,
            password:observable,
            totalCleanable:observable,
            imageTotal:observable,
            contacts:observable,
            screenshotFilterType:observable,
            videoFilterType:observable,
            same:observable,
            duplicatedContactsName:observable,
            duplicatedContactsPhone:observable,
            screenshots:observable,
            whiteList:observable,
            deleteLoading:observable,
            sameTotal:observable,
            premium:observable,
            videoTotal:observable,
            imageFilterType:observable,
            deviceId:observable,
            allImages:observable,
            screen:observable,
            cleanable:observable,
            similarsTotal:observable,
            allVideos:observable,
            exist:observable,
            detailGroup:observable,
            activeDetail:observable,
            allContacts:observable,
            syncPhotos:observable,
            currentAnalyze:observable,
            token:observable,
            video:observable,
            photos:observable,
            videoLink:observable,
            similars:observable,
            selected:observable,
            premiumCount:observable,
            comparingStarted:observable,
            lastSlider:observable,
            deleteAfter:observable
        });
    }


    firststep(){
        runInAction(()=>{
            DeviceInfo.getUniqueId().then(uniq=>{

                this.deviceId = uniq
            })
        })
        // AsyncStorage.clear()
        this.check()
        this.getPremiumScreen()
        this.getScreen()
        this.getPassword()
        this.getKept()
        // this.getImages()
        this.getPackages()
        this.checkPremium()
        this.getVideos()
        this.getSecret()
        this.getChargeAnimation()
        this.getFastClean()
        this.getTheme()
        this.getDeleteAfter()
        // this.getCleanableTotal()

        this.getTodaysLimit()
    }
    start(){
        runInAction(()=>{
            DeviceInfo.getUniqueId().then(uniq=>{

                this.deviceId = uniq
            })
        })
        // AsyncStorage.clear()
        this.check()
        this.getPremiumScreen()
        this.getScreen()
        this.getPassword()
        this.getKept()
        // this.getImages()
        this.getSimilar()
        this.serverStart()
        this.getPackages()
        this.checkPremium()
        this.getAllPhotos() //diger
        this.getVideos()  //video
        this.getSecret()
        this.getChargeAnimation()
        this.getFastClean()
        this.getTheme()
        this.getDeleteAfter()
        // this.getCleanableTotal()

        this.getTodaysLimit()
        this.addListener()
    }

    addListener() {
        // Uygulamanın AppState değişikliklerini izlemek için bir olay dinleyicisi eklenir
        AppState.addEventListener("change", nextAppState => {
            // Kodlar runInAction fonksiyonu içinde çalıştırılır. Bu, asenkron değişikliklerin uygun şekilde yönetilmesini sağlar.
            runInAction(() => {
                // Eğer uygulama önceden arka planda çalışıyorsa, yeni durum aktif ve uygulama ilk kez çalıştırılmıyorsa
                if (this.appState == 'background' && nextAppState == 'active' && !this.first) {
                    // 'lastExit' adlı öğe AsyncStorage'den alınır
                    AsyncStorage.getItem('lastExit').then(data => {
                        // Eğer öğe varsa içerideki kodlar çalışır
                        if (data) {
                            // Uygulamanın son çıkış zamanı ile şu anki zaman arasındaki fark 1 dakikadan fazlaysa
                            if (Date.now() - data > 1000 * 60) {
                                // Uygulama yeniden başlatılır
                                RNRestart.Restart();
                            }
                        }
                    });
                } else {
                    // Yukarıdaki koşullar sağlanmazsa, AppState değişikliği ile ilgili diğer işlemler gerçekleştirilir
                    console.error(nextAppState);
                    // Uygulamanın durumu güncellenir ve AsyncStorage'ye son çıkış zamanı eklenir
                    this.appState = nextAppState;
                    AsyncStorage.setItem('lastExit', JSON.stringify(Date.now()));
    
                    // Eğer uygulama ilk kez çalıştırılmıyorsa ve yeni durum arka plan ise
                    if (!this.first && nextAppState == 'inactive') {
                        // Benzer toplamını güncelleyen bir HTTP POST isteği yapılır
                        axios.post(`${API_BASE}/api/user/updateSimilarTotal?token=${this.token}&key=${key}`, {
                            deviceId: this.deviceId,
                            total: this.similarsTotal + this.sameTotal + this.ekransTotal
                        }).then(data => {
                            runInAction(() => {
                                // İşlem başarılıysa gerekli işlemler gerçekleştirilir
                            });
                        });
    
                        // OneSignal bildirim gönderme işlemi yapılır
                        // setTimeout(() => {
                        //     const notificationObj = {
                        //         contents: {
                        //             en: Number(this.similarsTotal + this.sameTotal + this.ekransTotal) + " similar photos found on your phone.",
                        //         },
                        //         subtitle: { en: "Free up space on your phone fast!" },
                        //         include_player_ids: [this.playerId],
                        //         send_after: new Date(Date.now() + 15 * 1000)
                        //     };
                        //     const jsonString = JSON.stringify(notificationObj);
                        //     OneSignal.postNotification(JSON.stringify(notificationObj), (success) => {
                        //         console.log("Success:", success);
                        //     }, (error) => {
                        //         console.log("Error:", error);
                        //     });
                        // }, 1);
                        //Eğer uygulama bir süre arka planda kaldıysa ve sonra tekrar ön plana gelirse, uygulama yeniden başlatılır. 
                        //Bu, uygulamanın düzgün bir şekilde çalışmasını sağlar ve gerektiğinde taze verilerle güncellenir.
                    }
                }
            });
        });
    }
    
    startApp(){
        runInAction(()=>{
            setTimeout(()=>{
                this.loading=false

            },2500)
        })
    }
    getTodaysLimit(){

        // dailyOther
        AsyncStorage.getItem('dailySimilar').then(data=>{
            if(data){
                let limitData = JSON.parse(data)
                if(limitData.date == new Date().getDate()){
                    runInAction(()=>{
                        this.dailySimilar=limitData.limit
                    })
                }
            }
        })
        AsyncStorage.getItem('dailySame').then(data=>{
            if(data){
                let limitData = JSON.parse(data)
                if(limitData.date == new Date().getDate()){
                    runInAction(()=>{
                        this.dailySame=limitData.limit
                    })
                }
            }
        })
        AsyncStorage.getItem('dailyEkrans').then(data=>{
            if(data){
                let limitData = JSON.parse(data)
                if(limitData.date == new Date().getDate()){
                    runInAction(()=>{
                        this.dailyEkrans=limitData.limit
                    })
                }
            }
        })
        AsyncStorage.getItem('dailyVideo').then(data=>{
            if(data){
                let limitData = JSON.parse(data)
                if(limitData.date == new Date().getDate()){
                    runInAction(()=>{
                        this.dailyVideo=limitData.limit
                    })
                }
            }
        })
        AsyncStorage.getItem('dailyOther').then(data=>{
            if(data){
                let limitData = JSON.parse(data)
                if(limitData.date == new Date().getDate()){
                    runInAction(()=>{
                        this.dailyOther=limitData.limit
                    })
                }
            }
        })
        // dailyVideo
        // dailySimilar
        // dailySame
        // dailyEkrans
    }
    setDailyLimit(type){
        runInAction(()=>{
            if(type=='similar'){
                this.dailySimilar+=1
                let obje = {
                    limit:this.dailySimilar,
                    date:new Date().getDate()
                }
                AsyncStorage.setItem('dailySimilar',JSON.stringify(obje))
            }else if(type == 'same'){
                this.dailySame+=1
                let obje = {
                    limit:this.dailySame,
                    date:new Date().getDate()
                }
                AsyncStorage.setItem('dailySame',JSON.stringify(obje))
            }else if(type == 'ekrans'){
                this.dailyEkrans+=1
                let obje = {
                    limit:this.dailyEkrans,
                    date:new Date().getDate()
                }
                AsyncStorage.setItem('dailyEkrans',JSON.stringify(obje))
            }else if(type == 'video'){
                this.dailyVideo+=1
                let obje = {
                    limit:this.dailyVideo,
                    date:new Date().getDate()
                }
                AsyncStorage.setItem('dailyVideo',JSON.stringify(obje))
            }else if(type == 'others'){
                this.dailyOther+=1
                let obje = {
                    limit:this.dailyOther,
                    date:new Date().getDate()
                }
                AsyncStorage.setItem('dailyOther',JSON.stringify(obje))
            }
        })

    }
    getDeleteAfter(){
        AsyncStorage.getItem('deleteAfter').then(data=>{
            if(data){
                runInAction(()=>{
                    this.deleteAfter=JSON.parse(data)
                })
            }
        })
    }
    getTheme=()=>{

        AsyncStorage.getItem('isDarkTheme').then(data=>{
            if(data){
                runInAction(()=>{
                    this.isDarkTheme=JSON.parse(data)
                })
            }
        })
        AsyncStorage.getItem('theme').then(data=>{
            if(data){

                runInAction(()=>{
                    let them = JSON.parse(data)
                    this.theme=them
                    if(them == 'light'){
                        runInAction(()=>{
                            this.activeTheme=this.ligthTheme
                        })
                    }else{


                        runInAction(()=>{

                            this.activeTheme=this.darkTheme
                        })
                    }
                })
            }else{

                runInAction(()=>{
                    this.theme=Appearance.getColorScheme()
                    if(Appearance.getColorScheme() == 'dark'){
                        this.isDarkTheme=true

                        this.activeTheme=this.darkTheme
                    }else{
                        this.activeTheme=this.ligthTheme
                        this.isDarkTheme=false
                    }

                })
            }
        })
    }

    percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    }
    getChargeAnimation(){
        AsyncStorage.getItem('chargeAnimation').then(data=>{
            if(data){
                runInAction(()=>{
                    this.chargeAnimation=JSON.parse(data)
                })
            }else{
                runInAction(()=>{
                    this.chargeAnimation=null
                })
            }
        })
    }

    setReadyPackages(){

        if(this.premiumPackages.length >0){

            // alert(this.premiumPackages.length)
            this.premiumPackages.find(item=>{
                this.packages.find((it,indis)=>{
                    if(it._id ==  item){
                        runInAction(()=>{
                            if(this.subs.ios == undefined){
                                let obj = {
                                    ios:[it.packageIdIOS],
                                    android:[it.packageIdAndroid]
                                }
                                this.subs=obj
                            }else{
                                if(this.subs.ios.indexOf(it.packageIdIOS) == -1 ){

                                    this.subs.ios.push(it.packageIdIOS)
                                    this.subs.android.push(it.packageIdAndroid)
                                }

                            }
                            // alert(JSON.stringify(this.subs))
                        })
                        return true
                    }
                })
            })

        }else{
            setTimeout(()=>{
                if(this.premiumPackages.length < 1){
                    // alert(this.premiumPackages.length)
                }
                this.setReadyPackages()

            },1000)
        }
    }
    getPackages(){
        axios.get(`${API_BASE}/api/user/getPackages?token=${this.token}&key=${key}`).then(data=>{
            runInAction(()=>{
                this.packages=data.data.data
                this.setReadyPackages()
                // alert(this.packages.length)

            })
        })
    }
    getPremiumScreen() {
        // Token mevcutsa kontrol et
        if (this.token) {
            // Premium paketleri al
            this.getPackages();
    
            // Cihaz kimliğini al
            DeviceInfo.getUniqueId().then(uniq => {
                // Premium ekranı almak için API'ye istek gönder
                console.log(`${API_BASE}/api/user/getPremiumScreen?token=${this.token}&key=${key}`);
                axios.post(`${API_BASE}/api/user/getPremiumScreen?token=${this.token}&key=${key}`, {
                    deviceId: this.deviceId, // Gönderilen cihaz kimliği
                }).then(data => {
                    // Gelen verilerle durumu güncelle
                    runInAction(() => {
                        this.premiumNative = data.data.native;
    
                        if (data.data.native) { // Eğer native premium ekranı varsa
                            this.premiumScreen = data.data.screenName;
                            this.premiumPackages = data.data.data.packages;
                            // alert(JSON.stringify(data.data)); // Verileri göster (yorum satırında)
                        } else { // Native premium ekranı yoksa
                            // alert('burada'+JSON.stringify(data.data)); // Verileri göster (yorum satırında)
                            this.premiumScreen = data.data.data;
                            this.premiumPackages = data.data.packages;
                        }
                    });
                });
            });
        } else {
            // Token yoksa 1 saniye bekle ve tekrar dene
            setTimeout(() => {
                console.log('token yok get premium');
                this.getPremiumScreen();
            }, 1000);
        }
    }
    


    startToCheck(){
        if(!this.finished){
            if(this.lastIndex != 0){
                if(this.lastIndex != this.photoOptimized){
                    setTimeout(()=>{
                        this.startToCheck()
                    },5000)
                }else{
                    runInAction(()=>{
                        this.comparingStarted=false
                    })
                    setTimeout(()=>{

                        this.comparePhotos()
                    },1000)
                }
            }else{
                if(this.photoOptimized != 0 ){
                    runInAction(()=>{
                        this.lastIndex=this.photoOptimized

                    })
                    setTimeout(()=>{
                        this.startToCheck()
                    },5000)
                }else{
                    setTimeout(()=>{
                        this.startToCheck()
                    },5000)
                }
            }

        }

    }
    //Bu kod, büyük veri setlerini işleyen ve resimler arasındaki benzerlikleri belirleyen bir algoritmayı temsil eder. Karşılaştırma işlemi, resimlerin gruplara ayrılması ve ardından grup içindeki resimlerin birbirleriyle karşılaştırılmasıyla gerçekleşir. Bu işlem, veri kümesinin boyutuna ve işlemin karmaşıklığına bağlı olarak zaman alabilir.

    //Algoritma, resimlerin özelliklerini analiz ederek benzerliklerini belirler. Özellikle, resimlerin pikselleri, renk paleti, boyutu ve diğer özellikleri karşılaştırılır. Bu karşılaştırma, her bir resmin temsil edildiği veri noktaları arasında gerçekleşir. Bu süreç, veri setinin boyutuna bağlı olarak büyük miktarda hesaplama gerektirebilir.

    //Karşılaştırma sonuçları, benzerlik ölçütlerine göre sıralanır ve analiz edilir. Benzerlik düzeyine göre belirli eylemler gerçekleştirilir, örneğin, benzer resimler gruplandırılır veya benzer olmayanlar filtrelenir. Bu işlem, veri setinin yapısına ve kullanıcının tercihlerine bağlı olarak değişebilir.

    //Algoritma, veri setinin işlenmesi sırasında bellek ve işlemci kaynaklarını etkin bir şekilde kullanır. Bu, büyük veri kümelerinin işlenmesi sırasında performans ve hız açısından önemlidir. Ayrıca, kodun uygun şekilde çalışması için bazı ön koşulların sağlanması gerekebilir, örneğin, bellek yönetimi ve veri erişimi gibi.

    //Sonuç olarak, bu algoritma büyük veri setlerinde resimler arasındaki benzerlikleri belirlemek için etkili bir araç sağlar. Ancak, veri setinin boyutuna ve karmaşıklığına bağlı olarak performansı değişebilir ve uygun bir şekilde yapılandırılması gerekebilir.
    comparePhotos(){
        // Kontrol başlamadan önce mevcut depolama temizlenir.
        // Belirli resimlerin bilgileri konsola yazdırılır.
        // Resimlerin belirli özellikleri bir kanala gönderilir.
    
        let chunkSize = 15; // Karşılaştırma işlemi için belirli bir resim grubu boyutu belirlenir.
    
        if(!this.comparingStarted){ // Karşılaştırma işlemi başlamamışsa devam edilir.
            this.startToCheck(); // Kontrolü başlatan metot çağrılır.
            runInAction(()=>{
                this.comparingStarted=true; // Karşılaştırma başladı olarak işaretlenir.
            });
    
            AsyncStorage.getItem('lastChunk').then(lastChunk=>{
                if(lastChunk){
                    let x = JSON.parse(lastChunk); // Son kontrol parçası alınır.
    
                    if(x < this.checkedImages.length){ // Eğer son kontrol parçası, kontrol edilen resimlerin uzunluğundan küçükse devam edilir.
                        let son = 0;
    
                        for (let i = x; i < this.checkedImages.length;i += chunkSize) {
                            const chunk = this.checkedImages.slice(i, i + chunkSize); // Resimler belirli boyutlarda parçalanır.
                            son += chunkSize;
    
                            setTimeout(()=>{
                                if(this.appState=='active'){ // Uygulama aktif durumdaysa işleme devam edilir.
                                    chunk.map((it,index)=>{
                                        console.log('varmivarmivarmi',it.resizedImage,i)
    
                                        chunk.map((item,indis)=>{
                                            if(index != indis){
                                                nodejs.channel.send(it,item); // Resimler karşılaştırılır ve belirli bir kanala gönderilir.
                                            }
                                            if(i + 14 > this.checkedImages.length && indis==(this.checkedImages.length%15)-1 && index==(this.checkedImages.length%15)-1){
                                                // Son kontrol parçasına ulaşıldığında işlem tamamlanır.
                                                setTimeout(()=>{
                                                    runInAction(()=>{
                                                        this.comparingStarted=false; // Karşılaştırma işlemi bitti olarak işaretlenir.
                                                        this.finished=true; // İşlem tamamlandı olarak işaretlenir.
                                                        this.comparePhotosFast(); // Hızlı karşılaştırma işlemi başlatılır.
                                                    });
                                                },2000);
                                            }
                                            if(indis==14 && index==14 || i + 14 > this.checkedImages.length && indis==(this.checkedImages.length%15)-1 && index==(this.checkedImages.length%15)-1 ){
                                                // Belirli bir süre sonra son kontrol parçası güncellenir.
                                                runInAction(()=>{
                                                    this.photoOptimized=i;
                                                });
                                                setTimeout(()=>{
                                                    AsyncStorage.setItem('lastChunk',JSON.stringify(i)); // Son kontrol parçası depolanır.
                                                },10000);
                                            }
                                        });
                                    });
    
                                    // Son kontrol parçasına ulaşıldığında işlem tamamlanır.
                                    if(i+15>this.checkedImages.length-1){
                                        setTimeout(()=>{
                                            runInAction(()=>{
                                                this.comparingStarted=false;
                                                this.finished=true;
                                                this.comparePhotosFast();
                                            });
                                        },2000);
                                    }
                                }
                            },225*son);
                        }
                    }else{
                        // Son kontrol parçasına ulaşıldığında işlem tamamlanır.
                        runInAction(()=>{
                            this.comparePhotosFast();
                            this.finished=true;
                        });
                    }
                }else{
                    // İlk kontrol parçası alınır ve işlem devam ettirilir.
                    for (let i = 0; i < this.checkedImages.length;i += chunkSize) {
                        let chunk = this.checkedImages.slice(i, i + chunkSize);
                        setTimeout(()=>{
                            if(this.appState=='active'){ // Uygulama aktif durumdaysa işleme devam edilir.
                                chunk.map((it,index)=>{
                                    console.log('varmivarmivarmi',it.resizedImage,i)
                                    chunk.map((item,indis)=>{
                                        if(index != indis){
                                            nodejs.channel.send(it,item); // Resimler karşılaştırılır ve belirli bir kanala gönderilir.
                                        }
                                        if(i + 15 > this.checkedImages.length && indis==(this.checkedImages.length%15)-1 && index==(this.checkedImages.length%15)-1){
                                            // Son kontrol parçasına ulaşıldığında işlem tamamlanır.
                                            runInAction(()=>{
                                                setTimeout(()=>{
                                                    this.finished=true;
                                                    this.comparingStarted=false;
                                                    this.comparePhotosFast();
                                                },2000);
                                            });
                                        }
                                        if(indis==14 && index==14){
                                            // Belirli bir süre sonra son kontrol parçası güncellenir.
                                            runInAction(()=>{
                                                this.photoOptimized=i;
                                            });
                                            setTimeout(()=>{
                                                AsyncStorage.setItem('lastChunk',JSON.stringify(i)); // Son kontrol parçası depolanır.
                                            },10000);
                                        }
                                    });
                                });
    
                                // Son kontrol parçasına ulaşıldığında işlem tamamlanır.
                                if(i+15>this.checkedImages.length){
                                    runInAction(()=>{
                                        this.finished=true;
                                    });
                                }
                            }
                        },225*i);
                    }
                }
            });
        }
    }
    

    comparePhotosFast(){
        // console.log(this.wholeImages[7],this.wholeImages[8])
        // nodejs.channel.send(this.wholeImages[13],this.wholeImages[14])
        let chunkSize = 20;

        if(!this.comparingStarted){


            runInAction(()=>{
                this.comparingStarted=true
                this.finished=false
            })
            AsyncStorage.getItem('lastChunkFast').then(lastChunk=>{
                if(lastChunk){
                    let x = JSON.parse(lastChunk)

                    if(x < this.checkedImages.length){
                        let son = 0
                        let son2 = 0
                        let son2indis = 0
                        for (let i = x; i < this.checkedImages.length; i += chunkSize) {
                            const chunk = this.checkedImages.slice(i, i + chunkSize);
                            son+=chunkSize
                            // alert(lastChunk+' - '+this.wholeImages.length)

                            // do whatever
                            setTimeout(()=>{
                                // alert(JSON.stringify(chunk))
                                if(this.appState == 'active'){
                                    chunk.map((it,index)=>{
                                        console.log('varmivarmivarmi',it.resizedImage,i)

                                        chunk.map((item,indis)=>{

                                            if(index != indis){

                                                nodejs.channel.send(it,item)

                                            }
                                            if(i + 25 > this.checkedImages.length && indis==(this.checkedImages.length%20)-1 && index==(this.checkedImages.length%20)-1){
                                                runInAction(()=>{
                                                    setTimeout( ()=>{
                                                        // BackgroundService.stop()
                                                        this.finished=true
                                                        AsyncStorage.setItem('lastChunkFast',JSON.stringify(i))
                                                        this.comparingStarted=false

                                                        this.checkNews()

                                                    },3000)
                                                })
                                            }
                                            if(indis==19 && index==19){
                                                runInAction(()=>{

                                                    this.photoOptimized=i

                                                    // console.log('this.photoOptimizedthis.photoOptimizedthis.photoOptimized',this.photoOptimized,this.checkedImages.length)
                                                })
                                                setTimeout(()=>{
                                                    if(this.appState == 'active'){

                                                        AsyncStorage.setItem('lastChunkFast',JSON.stringify(i))
                                                    }

                                                },15000)
                                            }

                                        })
                                    })

                                }
                            },200*son)



                        }
                    }else{
                        // alert('chunk bitti')
                        runInAction(()=>{
                            this.comparingStarted=false

                            this.checkNews()
                            this.finished=true
                            BackgroundService.stop()

                        })
                    }

                }else{

                    for (let i = 0; i < this.checkedImages.length; i += chunkSize) {
                        let chunk = this.checkedImages.slice(i, i + chunkSize);
                        // do whatever
                        // console.log(i,'i')

                        setTimeout(()=>{
                            // alert(JSON.stringify(chunk))

                            chunk.map((it,index)=>{
                                console.log('varmivarmivarmi',it.resizedImage,i)
                                chunk.map((item,indis)=>{

                                    if(index != indis){
                                        // console.log(i,indis*index,it.node.image.uri,item.node.image.uri)
                                        nodejs.channel.send(it,item)

                                    }
                                    if(i + 25 > this.checkedImages.length && indis==(this.checkedImages.length%20)-1 && index==(this.checkedImages.length%20)-1){
                                        runInAction(()=>{
                                            setTimeout(()=>{
                                                this.checkNews()
                                                AsyncStorage.setItem('lastChunkFast',JSON.stringify(i))
                                                this.comparingStarted=false

                                                this.finished=true
                                            },3000)
                                        })
                                    }

                                    if(indis==19 && index==19){
                                        runInAction(()=>{

                                            this.photoOptimized=i

                                            // console.log('this.photoOptimizedthis.photoOptimizedthis.photoOptimized',this.photoOptimized,this.checkedImages.length)

                                        })
                                        setTimeout(()=>{

                                            if(this.appState == 'active'){

                                                AsyncStorage.setItem('lastChunkFast',JSON.stringify(i))
                                            }
                                        },15000)
                                    }
                                })

                            })

                        },200*i)



                    }
                }
            })


        }

        // this.wholeImages.slice(0,100).map((it,index)=>{
        //
        //     this.wholeImages.slice(0,100).map((item,indis)=>{
        //
        //         if(index != indis){
        //             nodejs.channel.send(it,item)
        //
        //
        //         }
        //     })
        // })


    }

    serverStart() {
        // Sunucuyu başlat
        nodejs.start("main.js");
    
        // Sunucudan gelen mesajları dinle
        nodejs.channel.addListener(
            "message",
            (msg) => {
                // Eğer resim yüklendiğine dair işaret varsa
                if (this.imageLoaded) {
                    // Eğer mesaj yeni ise
                    if (msg.isNew) {
                        // Belirli bir benzerlik eşiğini geçiyor ve ekran görüntüsü ise
                        if (msg.difference1 < 0.25 && msg.difference2 < 0.25) {
                            // Ekran görüntüsü olduğunu belirterek işlem yap
                            if (msg.isScreenshot) {
                                // Yeni ekran görüntüsü ayarla ve bilgilendirme yap
                                this.setScreenShotNew(msg);
                                console.log('ekran görüntüsü bulundu benzer ' + msg.image1 + ' ' + msg.image2 + ' Fark: ' + msg.difference1);
                            } else {
                                // Benzer iki resim olduğunu belirterek işlem yap
                                if (msg.difference1 == 0 && msg.difference2 == 0) {
                                    // Yeni benzer resim ayarla ve bilgilendirme yap
                                    this.setSameNew(msg);
                                    console.log('benzer 2 image ' + msg.image1 + ' ' + msg.image2 + ' Fark: ' + msg.difference1);
                                } else {
                                    // Yakın iki resim olduğunu belirterek işlem yap
                                    console.log('çok yakın 2 image ' + msg.image1 + ' ' + msg.image2 + ' Fark: ' + msg.difference1);
                                    this.setSimilarNew(msg);
                                }
                            }
                        }
                    } else {
                        // Eğer mesaj yeni değilse
                        if (msg.difference1 < 0.30 && msg.difference2 < 0.30) {
                            // Belirli bir benzerlik eşiğini geçiyor ve ekran görüntüsü ise
                            if (msg.isScreenshot) {
                                // Ekran görüntüsü olduğunu belirterek işlem yap
                                this.setScreenShot(msg);
                                console.log('ekran görüntüsü bulundu benzer ' + msg.image1 + ' ' + msg.image2 + ' Fark: ' + msg.difference1);
                            } else {
                                // Benzer iki resim olduğunu belirterek işlem yap
                                if (msg.difference1 == 0 && msg.difference2 == 0) {
                                    // Benzer resim ayarla ve bilgilendirme yap
                                    this.setSame(msg);
                                    console.log('benzer 2 image ' + msg.image1 + ' ' + msg.image2 + ' Fark: ' + msg.difference1);
                                } else {
                                    // Yakın iki resim olduğunu belirterek işlem yap
                                    console.log('çok yakın 2 image ' + msg.image1 + ' ' + msg.image2 + ' Fark: ' + msg.difference1);
                                    this.setSimilar(msg);
                                }
                            }
                        }
                    }
                } else {
                    // Eğer resim yüklenmediyse
                    setTimeout(() => {
                        // Eğer mesaj yeni ise
                        if (msg.isNew) {
                            // Belirli bir benzerlik eşiğini geçiyor ve ekran görüntüsü ise
                            if (msg.difference1 < 0.30 && msg.difference2 < 0.30) {
                                // Ekran görüntüsü olduğunu belirterek işlem yap
                                if (msg.isScreenshot) {
                                    // Yeni ekran görüntüsü ayarla ve bilgilendirme yap
                                    this.setScreenShotNew(msg);
                                    console.log('ekran görüntüsü bulundu benzer ' + msg.image1 + ' ' + msg.image2 + ' Fark: ' + msg.difference1);
                                } else {
                                    // Benzer iki resim olduğunu belirterek işlem yap
                                    if (msg.difference1 == 0 && msg.difference2 == 0) {
                                        // Benzer resim ayarla ve bilgilendirme yap
                                        this.setSameNew(msg);
                                        console.log('benzer 2 image ' + msg.image1 + ' ' + msg.image2 + ' Fark: ' + msg.difference1);
                                    } else {
                                        // Yakın iki resim olduğunu belirterek işlem yap
                                        console.log('çok yakın 2 image ' + msg.image1 + ' ' + msg.image2 + ' Fark: ' + msg.difference1);
                                        this.setSimilarNew(msg);
                                    }
                                }
                            }
                        } else {
                            // Belirli bir benzerlik eşiğini geçiyor ve ekran görüntüsü ise
                            if (msg.difference1 < 0.20 && msg.difference2 < 0.20) {
                                // Ekran görüntüsü olduğunu belirterek işlem yap
                                if (msg.isScreenshot) {
                                    // Yeni ekran görüntüsü ayarla ve bilgilendirme yap
                                    this.setScreenShot(msg);
                                    console.log('ekran görüntüsü bulundu benzer ' + msg.image1 + ' ' + msg.image2 + ' Fark: ' + msg.difference1);
                                } else {
                                    // Benzer iki resim olduğunu belirterek işlem yap
                                    if (msg.difference1 == 0 && msg.difference2 == 0) {
                                        // Benzer resim ayarla ve bilgilendirme yap
                                        this.setSame(msg);
                                        console.log('benzer 2 image ' + msg.image1 + ' ' + msg.image2 + ' Fark: ' + msg.difference1);
                                    } else {
                                        // Yakın iki resim olduğunu belirterek işlem yap
                                        console.log('çok yakın 2 image ' + msg.image1 + ' ' + msg.image2 + ' Fark: ' + msg.difference1);
                                        this.setSimilar(msg);
                                    }
                                }
                            }
                        }
                    }, 3000);
                }
            },
            this
        );
    }
    


    checkToCompare(){
        if(this.photosoptimized){
            // alert('ready to compare')
            this.comparePhotos()
            // this.comparePhotos()
        }else{
            setTimeout(()=>{
                console.log('checktoCompare interval')
                this.checkToCompare()
            },1000)
        }
    }
    //jimp
    async compressAllImages() {
        try {
            let basla = 0; // İşlem başlangıç indeksi
            const chunkSize = 25; // İşlenecek resimlerin grup boyutu
    
            let where = 0;
    
            // Önceki sıkıştırma adımının kaydedilip kaydedilmediğini kontrol et
            AsyncStorage.getItem('compressChunk').then(lastChunk => {
                if (lastChunk) { // Eğer bir önceki adım varsa devam et
                    let x = JSON.parse(lastChunk); // Önceki adımın konumunu al
                    if (x > 100) { // 100'den fazla işlenen resim varsa karşılaştırma işlemine geç
                        this.comparePhotos();
                    }
                    if (x < this.checkedImages.length) { // İşlenen resimlerin sonuna ulaşmadıysan devam et
                        let son = 0;
                        for (let i = x; i < this.checkedImages.length; i += chunkSize) {
                            const chunk = this.checkedImages.slice(i, i + chunkSize);
                            son += chunkSize;
    
                            // Resimleri tek tek kontrol et ve boyutlarını değiştir
                            setTimeout(() => {
                                this.checkedImages.slice(i, i + chunkSize).find((it, ind) => {
                                    if (it.resizedImage == undefined) {
                                        ImageResizer.createResizedImage(this.changeLink(it.uri), 16, 16, 'JPEG', 1)
                                            .then(response => {
                                                // Yeniden boyutlandırılmış resmin yoluyla orijinal resmi değiştir
                                                runInAction(() => {
                                                    it['resizedImage'] = response.path;
                                                });
    
                                                // Karşılaştırma işlemine geç
                                                if (i > 25 && !this.comparingStarted) {
                                                    this.comparePhotos();
                                                }
    
                                                // Son adımda ise kaydet ve işlemi tamamla
                                                if (ind == 24) {
                                                    AsyncStorage.setItem('compressChunk', JSON.stringify(i));
                                                    AsyncStorage.setItem('checkedImages', JSON.stringify(this.checkedImages));
                                                }
                                                if (i + 29 > this.checkedImages.length && ind == (this.checkedImages.length % 25) - 1) {
                                                    AsyncStorage.setItem('compressChunk', JSON.stringify(i));
                                                    AsyncStorage.setItem('checkedImages', JSON.stringify(this.checkedImages));
                                                    runInAction(() => {
                                                        this.photosoptimized = true;
                                                    });
                                                }
                                            });
                                    }
                                });
                            }, 75 * son);
                        }
                    } else {
                        // Chunk bitince işlemi tamamla
                        runInAction(() => {
                            this.photosoptimized = true;
                        });
                    }
                } else {
                    // İlk adımda
                    for (let i = 0; i < this.checkedImages.length; i += chunkSize) {
                        let chunk = this.checkedImages.slice(i, i + chunkSize);
                        setTimeout(() => {
                            this.checkedImages.slice(i, i + chunkSize).find((it, ind) => {
                                if (it.resizedImage == undefined) {
                                    ImageResizer.createResizedImage(this.changeLink(it.uri), 16, 16, 'JPEG', 1, 0)
                                        .then(response => {
                                            runInAction(() => {
                                                it['resizedImage'] = response.path;
                                            });
    
                                            if (i > 50 && !this.comparingStarted) {
                                                this.comparePhotos();
                                            }
                                            if (i % 100 == 0 && ind == 24) {
                                                AsyncStorage.setItem('compressChunk', JSON.stringify(i));
                                                AsyncStorage.setItem('checkedImages', JSON.stringify(this.checkedImages));
                                            }
                                            if (i + 25 > this.checkedImages.length && ind == (this.checkedImages.length % 25) - 1) {
                                                AsyncStorage.setItem('compressChunk', JSON.stringify(i));
                                                AsyncStorage.setItem('checkedImages', JSON.stringify(this.checkedImages));
                                                runInAction(() => {
                                                    this.photosoptimized = true;
                                                });
                                            }
                                        });
                                }
                            });
                        }, 75 * i);
                    }
                }
            });
        } catch (e) {
            alert(e); // Hata durumunda hata mesajı göster
        }
    }
    

    startComparing(res,has,last,getAgain){

        res.assets.forEach((i,index)=>{


            ImageResizer.createResizedImage(this.changeLink(i.uri),16,16,'JPEG',1)
                .then(son=>{

                    console.log(son.path)
                    i['resizedImage']= son.path
                    if(index==res.assets.length-1){


                        res.assets.find((it,indis)=>{
                            res.assets.find((its,ind)=>{
                                if(indis != ind){
                                    nodejs.channel.send(it,its)
                                }
                                if(ind==res.assets.length-1 && indis == res.assets.length-1 ){

                                }
                            })
                        })


                    }
                })

            // if(!this.imageLoaded){
            //
            //     setTimeout(()=>{
            //         ImageResizer.createResizedImage(this.changeLink(i.uri),16,16,'JPEG',1)
            //             .then(son=>{
            //                 this.wholeImages.find(it=>{
            //                     if(it.node.image.uri == i.uri){
            //                         it['resizedImage']=son.path
            //                     }
            //                 })
            //                 console.log(son.path)
            //                 i['resizedImage']= son.path
            //                 if(index==res.assets.length-1){
            //
            //
            //                     res.assets.find((it,indis)=>{
            //                         res.assets.find((its,ind)=>{
            //                             if(indis != ind){
            //                                 nodejs.channel.send(it,its)
            //                             }
            //                             if(ind==res.assets.length-1 && indis == res.assets.length-1 ){
            //
            //                             }
            //                         })
            //                     })
            //
            //
            //                 }
            //             })
            //     },5000)
            // }else{
            //     ImageResizer.createResizedImage(this.changeLink(i.uri),16,16,'JPEG',1)
            //         .then(son=>{
            //
            //             console.log(son.path)
            //             i['resizedImage']= son.path
            //             if(index==res.assets.length-1){
            //
            //
            //                 res.assets.find((it,indis)=>{
            //                     res.assets.find((its,ind)=>{
            //                         if(indis != ind){
            //                             nodejs.channel.send(it,its)
            //                         }
            //
            //                     })
            //                 })
            //
            //
            //             }
            //         })
            // }


        })
    }




    getAllPhotos(){

        AsyncStorage.getItem('wholeImages').then(dat=>{
            if(dat){
                runInAction(()=>{
                    this.wholeImages=JSON.parse(dat)
                    runInAction(()=>{

                        this.wholeImages.find(it=>{
                            this.otherWholeSize+=it.node.image.fileSize
                        })
                    })
                    // alert(JSON.stringify(this.wholeImages[0]))

                })
            }else{

                CameraRoll.getPhotos({
                    first:100000,
                    assetType:'Photos'
                }).then(r=>{
                    runInAction(async ()=>{
                        try{

                            this.wholeImages= r.edges
                            // .sort((a,b)=>b.node.image.fileSize-a.node.image.fileSize);
                            AsyncStorage.setItem('wholeImages',JSON.stringify(this.wholeImages))
                            this.wholeImages.find(it=>{
                                this.otherWholeSize+=it.node.image.fileSize
                            })
                        }catch (e) {

                        }
                    })
                })
                // MediaLibrary.getAssetsAsync({first:99999,sortBy:['creationTime']})
                //     .then(res => {
                //         runInAction(()=>{
                //             this.wholeImages=res.assets
                //             // alert(JSON.stringify(res.assets[0]))
                //             AsyncStorage.setItem('wholeImages',JSON.stringify)
                //         })
                //     })
            }
        })



        AsyncStorage.getItem('checkedImages').then(img=>{
            if(img){
                runInAction(()=>{
                    this.checkedImages=JSON.parse(img)

                    // this.getColorCode()
                    // alert(JSON.stringify(this.checkedImages[100]))
                    this.compressAllImages()
                })
            }else{
                MediaLibrary.getAssetsAsync({first:99999,sortBy:['creationTime']}).then(res=>{
                    runInAction(()=>{
                        this.checkedImages=res.assets
                        AsyncStorage.setItem('checkedImages',JSON.stringify(res.assets))
                        this.compressAllImages()

                    })
                })
            }
        })
        // MediaLibrary.getAssetsAsync({first:150000,sortBy:['creationTime']})
        //     .then(res => {
        //         res.assets.forEach((i,index)=> {
        //
        //             setTimeout(()=>{
        //                 ImageResizer.createResizedImage(this.changeLink(i.uri), 16, 16, 'JPEG', 1)
        //                     .then(son => {
        //
        //                         console.log(index,'path',son.path)
        //                         if(index==res.assets.length-1){
        //                             alert('bitti')
        //                         }
        //
        //                     })
        //             },index*5)
        //
        //
        //         })
        //     })
        let getAgain=(last)=>{
            MediaLibrary.getAssetsAsync({first:15,after:last,sortBy:['creationTime']})
                .then(async res => {
                    // alert('başarılı '+res.assets.length)


                    res.assets.forEach((i,index)=>{


                        ImageResizer.createResizedImage(this.changeLink(i.uri),16,16,'JPEG',1)
                            .then(son=>{

                                console.log(son.path)
                                i['resizedImage']= son.path
                                if(index==res.assets.length-1){


                                    res.assets.find((it,indis)=>{
                                        res.assets.find((its,ind)=>{
                                            if(indis != ind){
                                                nodejs.channel.send(it,its)
                                            }
                                            if(ind==res.assets.length-1 && indis == res.assets.length-1 ){
                                                if(res.hasNextPage){
                                                    // setTimeout(()=>{
                                                    // },250)
                                                    getAgain(res.endCursor)
                                                    AsyncStorage.setItem('lastpoint',JSON.stringify(res.endCursor))

                                                }
                                            }
                                        })
                                    })


                                }
                            })




                    })




                })

        }

        // AsyncStorage.getItem('lastpoint').then(endpoint=>{
        //         if(endpoint){
        //             let get = (last)=>{
        //                 MediaLibrary.getAssetsAsync({first:15,after:last,sortBy:['creationTime']})
        //                     .then(res => {
        //                         // alert(res.assets.length)
        //                         // alert('başarılı '+res.assets.length)
        //                         // runInAction(()=>{
        //                         //     this.wholeImages=res.assets
        //                         // })
        //                         // this.compressAllImages()
        //                         // this.startComparing(res)
        //
        //                         res.assets.forEach((i,index)=>{
        //
        //
        //
        //                             ImageResizer.createResizedImage(this.changeLink(i.uri),16,16,'JPEG',1)
        //                                 .then(son=>{
        //
        //                                     console.log(son.path)
        //                                     i['resizedImage']= son.path
        //                                     if(index==res.assets.length-1){
        //
        //
        //                                         res.assets.find((it,indis)=>{
        //                                             res.assets.find((its,ind)=>{
        //                                                 if(indis != ind){
        //                                                     nodejs.channel.send(it,its)
        //                                                 }
        //                                                 if(ind==res.assets.length-1 && indis == res.assets.length-1 ){
        //                                                     if(res.hasNextPage){
        //                                                         // setTimeout(()=>{
        //                                                         // },250)
        //                                                         getAgain(res.endCursor)
        //                                                         AsyncStorage.setItem('lastpoint',JSON.stringify(res.endCursor))
        //
        //                                                     }
        //                                                 }
        //                                             })
        //                                         })
        //
        //
        //                                     }
        //                                 })
        //
        //
        //
        //
        //                         })
        //                     })
        //             }
        //             MediaLibrary.getAssetsAsync({first:(this.similarsTotal+this.sameTotal+this.ekransTotal)*3,sortBy:['creationTime']})
        //                 .then(res => {
        //                     // alert(res.assets.length)
        //                     // alert('başarılı '+res.assets.length)
        //                     // runInAction(()=>{
        //                     //     this.wholeImages=res.assets
        //                     // })
        //                     // this.compressAllImages()
        //                     // this.startComparing(res)
        //                     if(res.hasNextPage){
        //                         // setTimeout(()=>{
        //                         // },250)
        //                         get(res.endCursor)
        //                         // AsyncStorage.setItem('lastpoint',JSON.stringify(res.endCursor))
        //                     }
        //                 })
        //         }else{
        //             setTimeout(()=>{
        //                 MediaLibrary.getAssetsAsync({first:15,sortBy:['creationTime']})
        //                     .then(res => {
        //                         // alert('başarılı '+res.assets.length)
        //                         // runInAction(()=>{
        //                         //     this.wholeImages=res.assets
        //                         // })
        //                         // this.compressAllImages()
        //                         // this.startComparing(res,res.hasNextPage,res.hasNextPage?res.endCursor:false)
        //                         res.assets.forEach((i,index)=>{
        //
        //
        //                             ImageResizer.createResizedImage(this.changeLink(i.uri),16,16,'JPEG',1)
        //                                 .then(son=>{
        //
        //                                     console.log(son.path)
        //                                     i['resizedImage']= son.path
        //                                     if(index==res.assets.length-1){
        //
        //
        //                                         res.assets.find((it,indis)=>{
        //                                             res.assets.find((its,ind)=>{
        //                                                 if(indis != ind){
        //                                                     nodejs.channel.send(it,its)
        //                                                 }
        //                                                 if(ind==res.assets.length-1 && indis == res.assets.length-1 ){
        //                                                     if(res.hasNextPage){
        //                                                         // setTimeout(()=>{
        //                                                         // },250)
        //                                                         getAgain(res.endCursor)
        //                                                         AsyncStorage.setItem('lastpoint',JSON.stringify(res.endCursor))
        //
        //                                                     }
        //                                                 }
        //                                             })
        //                                         })
        //
        //
        //                                     }
        //                                 })
        //
        //
        //
        //
        //                         })
        //                     })
        //             },3000)
        //
        //         }
        //
        //
        // })






        // -----------

        // AsyncStorage.getItem('wholeImages').then(dat=>{
        //     if(dat){
        //
        //         AsyncStorage.getItem('endBender').then(endBender=>{
        //             if(endBender){
        //
        //                 runInAction(()=>{
        //                     this.wholeImages=JSON.parse(dat)
        //                     this.loading=false
        //                     this.compressAllImages()
        //
        //
        //
        //
        //                 })
        //             }else{
        //                 this.wholeImages=JSON.parse(dat)
        //                 AsyncStorage.getItem('lastBender').then(lastBender=>{
        //                     if(lastBender){
        //
        //
        //                         CameraRoll.getPhotos({
        //                             after:JSON.parse(lastBender),
        //                             first:50,
        //                             assetType:'Photos'
        //                         }).then(data=>{
        //                             runInAction(()=>{
        //                                 let r=data
        //                                 this.wholeImages = this.wholeImages.concat(data.edges);
        //                                 console.log(this.wholeImages.length)
        //                                 if(r.page_info.has_next_page) {
        //                                     this.compressAllImages()
        //
        //                                     getAgain(r.page_info.end_cursor)
        //
        //                                 }else{
        //                                     runInAction(()=>{
        //                                         this.loading=false
        //                                         AsyncStorage.setItem('wholeImages',JSON.stringify(this.wholeImages))
        //                                         // this.checkToCompare()
        //
        //                                         this.compressAllImages()
        //                                     })
        //
        //                                 }
        //
        //                                 // alert(this.allImages.length)
        //
        //                             })
        //                         })
        //                     }else{
        //                         CameraRoll.getPhotos({
        //                             first:50,
        //                             assetType:'Photos'
        //                         }).then(data=>{
        //                             runInAction(()=>{
        //                                 console.log(data.edges.length)
        //                                 this.wholeImages=data.edges
        //                                 if(data.page_info.has_next_page) {
        //                                     this.compressAllImages()
        //
        //                                     getAgain(data.page_info.end_cursor)
        //                                     AsyncStorage.setItem('lastBender',JSON.stringify(data.page_info.end_cursor))
        //                                 }else{
        //
        //                                     AsyncStorage.setItem('lastBender',JSON.stringify(data.page_info.end_cursor))
        //                                     this.compressAllImages()
        //
        //                                     // this.checkToCompare()
        //
        //                                     this.loading=false
        //
        //                                 }
        //                                 // alert(JSON.stringify(data))
        //
        //                             })
        //                         })
        //                     }
        //                 })
        //
        //             }
        //         })
        //
        //     }else{
        //
        //
        //
        //         AsyncStorage.getItem('lastBender').then(lastBender=>{
        //             if(lastBender){
        //                 CameraRoll.getPhotos({
        //                     after:JSON.parse(lastBender),
        //                     first:50,
        //                     assetType:'Photos'
        //                 }).then(data=>{
        //                     runInAction(()=>{
        //                         let r=data
        //                         this.wholeImages = this.wholeImages.concat(data.edges);
        //                         console.log(this.wholeImages.length)
        //                         if(r.page_info.has_next_page) {
        //                             this.compressAllImages()
        //
        //                             getAgain(r.page_info.end_cursor)
        //
        //                         }else{
        //                             runInAction(()=>{
        //                                 this.loading=false
        //                                 AsyncStorage.setItem('wholeImages',JSON.stringify(this.wholeImages))
        //
        //                                 // this.checkToCompare()
        //
        //                                 this.compressAllImages()
        //                             })
        //
        //                         }
        //
        //                         // alert(this.allImages.length)
        //
        //                     })
        //                 })
        //             }else{
        //                 CameraRoll.getPhotos({
        //                     first:50,
        //                     assetType:'Photos'
        //                 }).then(data=>{
        //                     runInAction(()=>{
        //                         console.log(data.edges.length)
        //                         this.wholeImages=data.edges
        //                         if(data.page_info.has_next_page) {
        //                             this.compressAllImages()
        //
        //                             getAgain(data.page_info.end_cursor)
        //                             AsyncStorage.setItem('lastBender',JSON.stringify(data.page_info.end_cursor))
        //                         }else{
        //                             this.compressAllImages()
        //
        //                             // this.checkToCompare()
        //
        //                             this.loading=false
        //
        //                         }
        //                         // alert(JSON.stringify(data))
        //
        //                     })
        //                 })
        //             }
        //         })
        //
        //
        //     }
        // })
        // let getAgain=(after)=>{
        //     CameraRoll.getPhotos({
        //         after:after,
        //         first:50,
        //         assetType:'Photos'
        //     }).then(data=>{
        //         runInAction(()=>{
        //             let r=data
        //             this.wholeImages = this.wholeImages.concat(data.edges);
        //             if(this.wholeImages.length>100){
        //                 runInAction(()=>{
        //                     if(this.loading) this.loading=false
        //                 })
        //             }
        //             console.log(this.wholeImages.length)
        //             if(r.page_info.has_next_page) {
        //                 this.compressAllImages()
        //
        //
        //                 setTimeout(()=>{
        //
        //                 getAgain(r.page_info.end_cursor)
        //                 },2500)
        //                 AsyncStorage.setItem('lastBender',JSON.stringify(data.page_info.end_cursor))
        //
        //
        //             }else{
        //                 runInAction(()=>{
        //                 this.loading=false
        //                     AsyncStorage.setItem('wholeImages',JSON.stringify(this.wholeImages))
        //
        //                     // this.checkToCompare()
        //
        //                     this.compressAllImages()
        //                 })
        //
        //             }
        //
        //             // alert(this.allImages.length)
        //
        //         })
        //     })
        // }


    }



    getScreen() {
        // runInAction fonksiyonu içinde reaktif bir işlem başlatır
        runInAction(() => {
            // Cihazın ekran boyutlarını alır ve this.screen değişkenine atar
            this.screen = Dimensions.get('screen');
        });
    }
    

    getWhiteList(){
        AsyncStorage.getItem('whitelist').then(data=>{
            if(data){
                runInAction(()=>{
                    this.whiteList=JSON.parse(data)
                })
            }
        })
    }
    check(){
            // 1. Cihaz Bilgileri ve Token Kontrolü(DeviceInfo.getUniqueId ile cihaz kimliği alınır ve AsyncStorage.getItem('tokens') ile token bilgisi kontrol edilir.)

        runInAction(()=>{
            DeviceInfo.getUniqueId().then(uniq=>{
                this.deviceId=uniq
            })
        })

        AsyncStorage.getItem('tokens').then(sonuc=>{
            if(sonuc){
                //2.Token Mevcutsa Güncelleme: Token varsa, cihaz kimliği, ülke kodu ve dil bilgisi güncellenir ve this.updateInfo() ile bilgiler güncellenir.
                runInAction(()=>{
                    this.token=JSON.parse(sonuc)
                    DeviceInfo.getUniqueId().then(uniq=>{
                        this.deviceId=uniq
                        DeviceCountry.getCountryCode(TYPE_ANY)
                            .then(async (result) => {
                                this.country=result.code.toLowerCase()
                                this.language=RNLocalize.getLocales()[0].languageCode
                            })
                        this.updateInfo()
                    })


                })
            }else{

                //3.Token Yoksa Oluşturma: Token yoksa, cihaz bilgileri alınır, OneSignal'dan deviceState.userId kontrol edilir ve API'ye post isteği ile token oluşturulur, ardından token ve cihaz kimliği AsyncStorage'a kaydedilir.

                DeviceInfo.getUniqueId().then((uniqueId) => {

                    runInAction(()=>{
                        this.deviceId=uniqueId
                    })

                    DeviceCountry.getCountryCode(TYPE_ANY)
                        .then(async (result) => {

                            // console.log(deviceLanguage); //en_US
                            // console.log();
                            const deviceState = await OneSignal.getDeviceState();
                            if(deviceState.userId){
                                axios.post(`${API_BASE}/check`, {
                                    deviceId:uniqueId,
                                    platform:Platform.OS,
                                    country:result.code.toLowerCase(),
                                    language:RNLocalize.getLocales()[0].languageCode,
                                    playerId:deviceState.userId
                                } ).then(data=>{
                                    this.updateInfo()

                                    runInAction(()=>{
                                        this.token=data.data.token

                                        AsyncStorage.setItem('tokens',JSON.stringify(this.token))
                                        AsyncStorage.setItem('deviceId',JSON.stringify(data.data.data.deviceId))

                                    })
                                }).catch(error => alert(error));
                            }else{
                                setTimeout(()=>{
                                    this.check()
                                },2500)
                            }
                            // // ülke
                            // alert(result.code)
                            // // telefon dili
                            // alert(RNLocalize.getLocales()[0].languageCode)



                        })
                        .catch((e) => {
                            console.log(e);
                        });

                });
            }
        })


    }


    getPlayerId=()=>{

        runInAction(()=>{
            AsyncStorage.getItem('playerId').then(async (data)=>{
                if(data){
                    runInAction(async ()=>{
                        console.log('playerid data',data)
                        if(data){
                            if(data.indexOf('"') > -1){

                                this.playerId=JSON.parse(data)

                            }else{
                                this.playerId=data
                            }
                            this.updatePlayerId()

                        }

                    })
                }else{
                    const deviceState = await OneSignal.getDeviceState();
                    this.setPlayerId(deviceState.userId)
                }


            })
        })
    }
    setPlayerId=(id)=>{
        runInAction(()=>{
            this.playerId=id
        })
        AsyncStorage.setItem('playerId',JSON.stringify(id)).then(data=>{
            this.updatePlayerId()
        })
    }
    updatePlayerId=async()=>{

        const deviceState = await OneSignal.getDeviceState();
        console.log('deviceStatse',deviceState.userId)
        if(deviceState.userId==this.playerId){
            if(this.playerId!=null){
                axios.post(`${API_BASE}/api/user/updatePlayerId?token=${this.token}&key=${key}`,{
                    playerId:this.playerId,
                    deviceId: this.deviceId,
                }).then(data=>{

                })
            }else{
                setTimeout(()=>{
                    this.getPlayerId()
                },250)
            }
        }else{
            this.setPlayerId(deviceState.userId)
        }

    }
    updateInfo(){
        DeviceCountry.getCountryCode(TYPE_ANY)
            .then((result) => {

                // console.log(deviceLanguage); //en_US
                // console.log();

                // // ülke
                // alert(result.code)
                // // telefon dili
                // alert(RNLocalize.getLocales()[0].languageCode)
                // alert(this.deviceId+' - '+Platform.OS+' - '+result.code.toLowerCase()+' - '+RNLocalize.getLocales()[0].languageCode)
                axios.post(`${API_BASE}/api/user/updateInfo?token=${this.token}&key=${key}`,{
                    deviceId: this.deviceId,
                    platform:Platform.OS,
                    country:result.code.toLowerCase(),
                    language:RNLocalize.getLocales()[0].languageCode
                }).then(data=>{
                    // let arr = Object(data.data)
                    // alert(JSON.stringify(arr))
                    if(data.data.status){

                        runInAction(()=>{
                            this.ratingActive=data.data.data.ratingActive
                            this.adActive = data.data.data.adActive
                            // alert(this.adActive)
                            this.dailyLimit=data.data.data.dailyLimit
                            // alert(this.dailyLimit+' - '+this.ratingActive)
                        })
                    }
                    // alert(data.data.status)
                })



            })
            .catch((e) => {
                console.log(e);
            });


    }

    getSyncPhotos(){
        AsyncStorage.getItem('sync').then(data=>{
            if(data){
                runInAction(()=>{
                    this.syncPhotos=JSON.parse(data)
                })
            }
        })

    }
    setSyncPhotos(sayi){
        runInAction(()=>{

            this.syncPhotos=this.syncPhotos+sayi
            AsyncStorage.setItem('sync',JSON.stringify(this.syncPhotos))
        })
    }

    getSimilar(){
        //Bu kodun amacı, benzer öğeleri almak, depolanmış benzer öğeleri AsyncStorage'den yükleyip işlemek ve toplam ve temizlenebilir öğe sayılarını güncellemektir.
        this.getSame()
        this.getEkrans()
        AsyncStorage.getItem('similars').then(data=>{
            if(data){
                runInAction(()=>{
                    let now = []
                    this.similars=JSON.parse(data)
                    this.similars.find(it=>{
                        this.similarsTotal+=it.images.length
                        this.cleanable+=it.images.length


                    })

                })
            }
        })

    }
    getSame(){

        AsyncStorage.getItem('same').then(data=>{
            if(data){
                runInAction(()=>{
                    this.same=JSON.parse(data)
                    let now = []

                    this.same.find(it=>{
                        this.sameTotal+=it.images.length
                        this.cleanable+=it.images.length



                    })
                })
            }
        })
    }
    getEkrans(){

        AsyncStorage.getItem('ekrans').then(data=>{
            if(data){
                runInAction(()=>{
                    this.ekrans=JSON.parse(data)
                    let now =[]
                    this.ekrans.find(it=>{
                        this.ekransTotal+=it.images.length
                        this.cleanable+=it.images.length

                    })
                })
            }
        })
    }
    getVideos(){

        CameraRoll.getPhotos({
            first:10000,
            assetType:'Videos'
        }).then(r=>{
            runInAction(async ()=>{
                this.allVideos=[]
                this.videosSize=0
                try{
                    runInAction(()=>{

                        this.allVideos= r.edges
                    })
                    this.allVideos.find((val)=>{
                        runInAction(()=>{
                            this.videosSize+=val.node.image.fileSize
                        })
                    })
                    this.videoFilterType=2
                    AsyncStorage.setItem('videos',JSON.stringify(this.allVideos))

                }catch (e) {

                }
            })
        })
        // AsyncStorage.getItem('videos').then(data=>{
        //     if(!data){
        //         runInAction(()=>{
        //             this.allVideos=JSON.parse(data)
        //         })
        //     }else{
        //
        //     }
        // })

    }
    premiumGate(){
        if(!this.premiumSync) this.changePremium()
    }
    changePremium(){
        runInAction(()=>{
            this.premiumSync=true
            if(this.premiumCount<3){
                this.premiumCount=this.premiumCount+1

            }else{
                this.premiumCount=1
            }

            setTimeout(()=>{this.changePremium()},1000)

        })

    }

    setPhotos(assets){
        //gizli kisima fotograflari koymak icin
        runInAction(()=>{
            this.photos=assets
            const appleId = this.photos[0].node.image.uri.substring(5, 41);
            const fileNameLength = this.photos[0].node.image.filename.length;
            const ext = this.photos[0].node.image.filename.substring(fileNameLength - 3);
            const uri = `assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`;
            this.videoLink=uri
            this.video=this.photos[0]
            // alert(JSON.stringify(this.photos[0].node.image.uri))
        })
    }
    // this.similars.map(x => x.image1).indexOf(it.image1) &&
    setSimilar(it){
        //benzer fotogrsf kismi
        if(it.image1 != it.image2){
            runInAction(async ()=>{

                // this.similars.push(it)
                try{
                    if(this.similars.length<1){
                        let obje = {
                            images:[it.image1,it.image2]
                        }
                        this.similars.push(obje)
                    }else{
                        this.similars.find((item,indis)=>{
                            if(item.images.indexOf(it.image1) != -1 && item.images.indexOf(it.image2) == -1){
                                if(this.similars[indis].images.indexOf(it.image2)==-1){
                                    runInAction(()=>{
                                        this.similars[indis].images.push(it.image2)
                                    })
                                    return true

                                }

                            }else if(item.images.indexOf(it.image2) != -1 && item.images.indexOf(it.image1) == -1){
                                if(this.similars[indis].images.indexOf(it.image1)==-1){
                                    runInAction(()=>{
                                        this.similars[indis].images.push(it.image1)
                                    })
                                    return true


                                }
                            }else if(item.images.indexOf(it.image2) != -1 && item.images.indexOf(it.image1) != -1){
                                return true
                            }else if(item.images.indexOf(it.image2) == -1 && item.images.indexOf(it.image1) == -1 && indis == this.similars.length-1){
                                if(it.image1 != it.image2){
                                    let obje = {
                                        images:[it.image1,it.image2]
                                    }
                                    runInAction(()=>{
                                        this.similars.push(obje)

                                    })


                                }

                            }

                        })

                    }
                    this.similarsTotal=0
                    this.countTotalDuplicated()
                    AsyncStorage.setItem('similars',JSON.stringify(this.similars))


                }catch (e) {

                }






            })

        }

    }
    setSame(it){
        if(it.image1 != it.image2){
            runInAction(async ()=>{

                // this.similars.push(it)
                try{
                    if(this.same.length<1){
                        let obje = {
                            images:[it.image1,it.image2]
                        }
                        this.same.push(obje)
                    }else{
                        this.same.find((item,indis)=>{
                            if(item.images.indexOf(it.image1)>-1 && item.images.indexOf(it.image2)<0){
                                if(this.same[indis].images.indexOf(it.image2)==-1){
                                    runInAction(()=>{
                                        this.same[indis].images.push(it.image2)

                                    })

                                    return true
                                }
                            }else if(item.images.indexOf(it.image2)>-1 && item.images.indexOf(it.image1)<0){
                                if(this.same[indis].images.indexOf(it.image1)==-1){
                                    runInAction(()=>{
                                        this.same[indis].images.push(it.image1)

                                    })

                                    return true
                                }
                            }else if(item.images.indexOf(it.image2)>-1 && item.images.indexOf(it.image1)>-1){
                                return true
                            }else if(item.images.indexOf(it.image2)<0 && item.images.indexOf(it.image1)<0 && indis == this.same.length-1){
                                if(it.image1 != it.image2){
                                    let obje = {
                                        images:[it.image1,it.image2]
                                    }
                                    runInAction(()=>{
                                        this.same.push(obje)

                                    })

                                }

                            }

                        })

                    }
                    this.sameTotal=0
                    this.countTotalSame()
                    AsyncStorage.setItem('same',JSON.stringify(this.same))


                }catch (e) {

                }





            })

        }

    }
    setScreenShot(it){
        if(it.image1 != it.image2){
            runInAction(async ()=>{

                // this.similars.push(it)
                try{
                    if(this.ekrans.length<1){
                        let obje = {
                            images:[it.image1,it.image2]
                        }
                        this.ekrans.push(obje)
                    }else{
                        this.ekrans.find((item,indis)=>{
                            if(item.images.indexOf(it.image1)>-1 && item.images.indexOf(it.image2)<0){
                                if(this.ekrans[indis].images.indexOf(it.image2)==-1){
                                    runInAction(()=>{
                                        this.ekrans[indis].images.push(it.image2)
                                    })
                                    return true
                                }
                            }else if(item.images.indexOf(it.image2)>-1 && item.images.indexOf(it.image1)<0){
                                if(this.ekrans[indis].images.indexOf(it.image1)==-1){
                                    runInAction(()=>{
                                        this.ekrans[indis].images.push(it.image1)
                                    })
                                    return true
                                }
                            }else if(item.images.indexOf(it.image2)>-1 && item.images.indexOf(it.image1)>-1){
                                return true
                            }else if(item.images.indexOf(it.image2)<0 && item.images.indexOf(it.image1)<0 && indis == this.ekrans.length-1){
                                if(it.image1 != it.image2){
                                    let obje = {
                                        images:[it.image1,it.image2]
                                    }
                                    runInAction(()=>{
                                        this.ekrans.push(obje)
                                    })
                                }


                            }

                        })

                    }
                    this.ekransTotal=0
                    this.countTotalEkrans()
                    AsyncStorage.setItem('ekrans',JSON.stringify(this.ekrans))


                }catch (e) {

                }





            })

        }

    }


    getSize=async (it)=>{
        return await MediaLibrary.getAssetInfoAsync(this.getAssetId(it)).then(res=>{
            // alert(JSON.stringify(res))
            stat(res.localUri).then(statResult=>{

                return statResult.size
                // alert(JSON.stringify(statResult))
                // console.log('file size: ' + statResult.size);

            })
        })
    }
    getPath=async (it)=>{
        let path = await MediaLibrary.getAssetInfoAsync(this.getAssetId(it)).then(res=>{
            // alert(JSON.stringify(res))
            return res.localUri
        })
        return path
    }
    async setSelected(it){

        // alert(this.selected.indexOf(it))
        runInAction(async()=>{
            // let arr = this.selected
            // console.log(arr,this.selected)
            //
            // if(arr.indexOf(it)){
            //     arr.splice(this.selected.indexOf(it), 1)
            // }else{
            //
            // }
            // arr.push(it)
            if(this.selected.indexOf(it)!= -1){
                // alert('var')
                this.selected.splice(this.selected.indexOf(it),1)
                MediaLibrary.getAssetInfoAsync(this.getAssetId(it)).then(res=>{
                    // alert(JSON.stringify(res))
                    stat(res.localUri).then(statResult=>{

                        this.similarTotalSize-= statResult.size
                        // alert(JSON.stringify(statResult))
                        // console.log('file size: ' + statResult.size);

                    })
                })

            }else{
                this.selected.push(it)
                MediaLibrary.getAssetInfoAsync(this.getAssetId(it)).then(res=>{
                    // alert(JSON.stringify(res))
                    stat(res.localUri).then(statResult=>{

                        this.similarTotalSize+= statResult.size
                        // alert(JSON.stringify(statResult))
                        // console.log('file size: ' + statResult.size);

                    })
                })

                // let filesize = this.wholeImages.find(sam=>sam.node.image.uri==it && Number(sam.node.image.fileSize))

                //


            }
            console.log(this.selected,this.similarTotalSize)
        })
    }
    async setSelectedOther(it){

        // alert(this.selected.indexOf(it))
        runInAction(()=>{
            // let arr = this.selected
            // console.log(arr,this.selected)
            //
            // if(arr.indexOf(it)){
            //     arr.splice(this.selected.indexOf(it), 1)
            // }else{
            //
            // }
            // arr.push(it)
            if(this.selectedOther.indexOf(it.node.image.uri)!= -1){
                // alert('var')
                this.otherTotalSize-=it.node.image.fileSize
                this.selectedOther.splice(this.selectedOther.indexOf(it.node.image.uri),1)

            }else{
                this.selectedOther.push(it.node.image.uri)
                this.otherTotalSize+=it.node.image.fileSize

            }
            console.log(this.selectedOther)
        })
    }

    setSelectedScreen(it){

        // alert(this.selected.indexOf(it))
        runInAction(()=>{
            // let arr = this.selected
            // console.log(arr,this.selected)
            //
            // if(arr.indexOf(it)){
            //     arr.splice(this.selected.indexOf(it), 1)
            // }else{
            //
            // }videoTotalSize
            // arr.push(it)
            if(this.screenSelected.indexOf(it)!= -1){
                // alert('var')
                this.screenSelected.splice(this.screenSelected.indexOf(it),1)
                this.checkedImages.find(its=>{
                    if(its.uri==it){
                        MediaLibrary.getAssetInfoAsync(its.id).then(res=>{
                            // alert(JSON.stringify(res))
                            stat(res.localUri).then(statResult=>{

                                this.screenTotalSize-= statResult.size
                                // alert(JSON.stringify(statResult))
                                // console.log('file size: ' + statResult.size);

                            })

                        })
                        return true

                    }

                })

            }else{
                this.screenSelected.push(it)
                MediaLibrary.getAssetInfoAsync(this.getAssetId(it)).then(res=>{
                    // alert(JSON.stringify(res))
                    stat(res.localUri).then(statResult=>{

                        this.screenTotalSize+= statResult.size
                        // alert(JSON.stringify(statResult))
                        // console.log('file size: ' + statResult.size);

                    })

                })
            }
            console.log(this.screenSelected)
        })
    }


    setSameSelected(it){

        //fotograflari secme ozelligi


        // Exif.getExif(this.changeLink(it)).then(exif=>{
        //     let ext = exif.originalUri.split('.')[1];
        //     alert(JSON.stringify(RNFS.stat(this.changeLink(it))))
        // })
        // this.wholeImages.find(sam=>{
        //     if(sam.node.image.uri==it){
        //         alert(sam.node.image.fileSize)
        //         return true
        //     }
        // })
        // const statResult = await stat(this.changeLink(it));
        // alert('file size: ' + statResult.size);

        // .catch(msg => console.warn('ERROR: ' + msg))
// ...
        // alert(this.selected.indexOf(it))
        runInAction( ()=>{
            // let arr = this.selected
            // console.log(arr,this.selected)
            //
            // if(arr.indexOf(it)){
            //     arr.splice(this.selected.indexOf(it), 1)
            // }else{
            //
            // }
            // arr.push(it)
            if(this.sameSelected.indexOf(it)!= -1){

                // alert('var')
                this.sameSelected.splice(this.sameSelected.indexOf(it),1)

                MediaLibrary.getAssetInfoAsync(this.getAssetId(it)).then(res=>{
                    // alert(JSON.stringify(res))
                    stat(res.localUri).then(statResult=>{
                        // alert(statResult.size)
                        runInAction(()=>{

                            this.sameTotalSize-= statResult.size
                        })

                        // alert(JSON.stringify(statResult))
                        // console.log('file size: ' + statResult.size);

                    })
                })

            }else{
                this.sameSelected.push(it)

                MediaLibrary.getAssetInfoAsync(this.getAssetId(it)).then(res=>{
                    // alert(JSON.stringify(res))
                    stat(res.localUri).then(statResult=>{
                        // alert(statResult.size)
                        runInAction(()=>{

                            this.sameTotalSize+= statResult.size
                        })

                        // alert(JSON.stringify(statResult))
                        // console.log('file size: ' + statResult.size);

                    })
                })
            }

            console.log('z,rr',this.sameSelected,this.sameTotalSize)
        })
    }
    async setSelectedKept(it){

        // alert(this.selected.indexOf(it))
        runInAction(()=>{
            // let arr = this.selected
            // console.log(arr,this.selected)
            //
            // if(arr.indexOf(it)){
            //     arr.splice(this.selected.indexOf(it), 1)
            // }else{
            //
            // }
            // arr.push(it)
            if(this.keptSelected.indexOf(it)!= -1){
                // alert('var')
                this.keptSelected.splice(this.keptSelected.indexOf(it),1)

            }else{
                this.keptSelected.push(it)

            }
            console.log(this.keptSelected)
        })
    }

    async setSelectedSecret(it){
        // alert(this.selected.indexOf(it))
        runInAction(()=>{
            // let arr = this.selected
            // console.log(arr,this.selected)
            //
            // if(arr.indexOf(it)){
            //     arr.splice(this.selected.indexOf(it), 1)
            // }else{
            //
            // }
            // arr.push(it)
            if(this.secretSelected.indexOf(it)!= -1){
                // alert('var')
                this.secretSelected.splice(this.secretSelected.indexOf(it),1)

            }else{
                this.secretSelected.push(it)

            }
            console.log(this.secretSelected)
        })
    }

    async setSelectedVideo(it){

        // alert(this.selected.indexOf(it))
        runInAction(()=>{
            // let arr = this.selected
            // console.log(arr,this.selected)
            //
            // if(arr.indexOf(it)){
            //     arr.splice(this.selected.indexOf(it), 1)
            // }else{
            //
            // }
            // arr.push(it)
            if(this.videoSelected.indexOf(it.node.image.uri)!= -1){
                // alert('var')
                this.videoTotal-=it.node.image.fileSize
                this.videoSelected.splice(this.videoSelected.indexOf(it.node.image.uri),1)

            }else{
                this.videoSelected.push(it.node.image.uri)
                this.videoTotal+=it.node.image.fileSize

            }
            console.log(this.videoSelected)
        })
    }
    setSelectedImage(it){

        // alert(this.selected.indexOf(it))
        runInAction(()=>{
            // let arr = this.selected
            // console.log(arr,this.selected)
            //
            // if(arr.indexOf(it)){
            //     arr.splice(this.selected.indexOf(it), 1)
            // }else{
            //
            // }
            // arr.push(it)
            if(it.node){
                if(this.selected.indexOf(it.node.image.uri)!= -1){
                    // alert('var')
                    this.screenTotalSize-=it.node.image.fileSize
                    this.screenSelected.splice(this.screenSelected.indexOf(it.node.image.uri),1)

                }else{
                    this.screenSelected.push(it.node.image.uri)
                    this.screenTotalSize+=it.node.image.fileSize

                }
            }else{
                this.allImages.find(value=>{
                    if(value.node.image.uri == it){
                        if(this.screenSelected.indexOf(value.node.image.uri)!= -1){
                            // alert('var')
                            this.screenTotalSize-=value.node.image.fileSize
                            this.screenSelected.splice(this.screenSelected.indexOf(value.node.image.uri),1)

                        }else{
                            this.screenSelected.push(value.node.image.uri)
                            this.screenTotalSize+=value.node.image.fileSize

                        }
                        return
                    }
                })

            }

            console.log(this.selected)
        })
    }

    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    increase(sayi){
        runInAction(()=>{
            this.syncPhotos=+sayi
        })
    }


    // similars optimize yap artık array olarak similars içinde similars ve id üret idleri silerken kullan
    analyze(assets){
        runInAction(async()=>{
            this.currentAnalyze=assets
            let say=0
            try{

            }catch (e) {

            }
            this.currentAnalyze.find( (it,index)=>{



                this.currentAnalyze.find((item,indis)=>{

                    nodejs.channel.send(it,item)





                })
                // this.currentAnalyze.splice(index,1)



            })
        })

    }

    setSameFilter(type){
        //filtreleme kismi fotolari
        runInAction(()=>{
            if(type=='newest'){
                this.sameFilterType=0
                AsyncStorage.getItem('same').then(data=>{
                    if(data){
                        this.same=JSON.parse(data)
                    }
                })


            }else if(type=='oldest'){
                this.sameFilterType=1
                AsyncStorage.getItem('same').then(data=>{
                    if(data){
                        let arr=JSON.parse(data)
                        this.same=arr.reverse()
                    }
                })

            }else if(type=='most'){
                this.sameFilterType=2

                this.same.sort((a,b)=>b.images.length-a.images.length);

            }
        })


    }
    setSimilarFilter(type){
        runInAction(()=>{
            if(type=='newest'){
                this.similarsFilterType=0
                AsyncStorage.getItem('similars').then(data=>{
                    if(data){
                        this.similars=JSON.parse(data)
                    }
                })


            }else if(type=='oldest'){
                this.similarsFilterType=1
                AsyncStorage.getItem('similars').then(data=>{
                    if(data){
                        let arr=JSON.parse(data)
                        this.similars=arr.reverse()
                    }
                })

            }else if(type=='most'){
                this.similarsFilterType=2

                this.similars.sort((a,b)=>b.images.length-a.images.length);

            }
        })


    }
    setEkransFilter(type){
        runInAction(()=>{
            if(type=='newest'){
                this.ekransFilterType=0
                AsyncStorage.getItem('ekrans').then(data=>{
                    if(data){
                        this.ekrans=JSON.parse(data)
                    }
                })


            }else if(type=='oldest'){
                this.ekransFilterType=1
                AsyncStorage.getItem('ekrans').then(data=>{
                    if(data){
                        let arr=JSON.parse(data)
                        this.ekrans=arr.reverse()
                    }
                })

            }else if(type=='most'){
                this.ekransFilterType=2
                this.ekrans.sort((a,b)=>b.images.length-a.images.length);

            }
        })


    }
    setVideoFilter(type){
        runInAction(()=>{
            if(type=='biggest'){
                this.allVideos.sort((a,b)=>b.node.image.fileSize-a.node.image.fileSize);
                this.videoFilterType=0

            }else if(type=='smallest'){
                this.videoFilterType=1

                this.allVideos.sort((a,b)=>a.node.image.fileSize-b.node.image.fileSize);
            }else if(type=='newest'){
                this.videoFilterType=2

                this.allVideos.sort((a,b)=>b.node.timestamp-a.node.timestamp);


            }else if(type=='oldest'){
                this.videoFilterType=3

                this.allVideos.sort((a,b)=>a.node.timestamp-b.node.timestamp);

            }
        })


    }
    setImageFilter(type){
        runInAction(()=>{
            if(type=='biggest'){
                this.wholeImages.sort((a,b)=>b.node.image.fileSize-a.node.image.fileSize);
                this.imageFilterType=0

            }else if(type=='smallest'){
                this.imageFilterType=1

                this.wholeImages.sort((a,b)=>a.node.image.fileSize-b.node.image.fileSize);
            }else if(type=='newest'){
                this.imageFilterType=2

                this.wholeImages.sort((a,b)=>b.node.timestamp-a.node.timestamp);


            }else if(type=='oldest'){
                this.imageFilterType=3

                this.wholeImages.sort((a,b)=>a.node.timestamp-b.node.timestamp);

            }
        })


    }
    setScreenshotFilter(type){
        runInAction(()=>{
            if(type=='biggest'){
                this.screenshots.sort((a,b)=>b.node.image.fileSize-a.node.image.fileSize);
                this.screenshotFilterType=0

            }else if(type=='smallest'){
                this.screenshotFilterType=1

                this.screenshots.sort((a,b)=>a.node.image.fileSize-b.node.image.fileSize);
            }else if(type=='newest'){
                this.screenshotFilterType=2

                this.screenshots.sort((a,b)=>b.node.timestamp-a.node.timestamp);


            }else if(type=='oldest'){
                this.screenshotFilterType=3

                this.screenshots.sort((a,b)=>a.node.timestamp-b.node.timestamp);

            }
        })


    }

    countTotalEkrans(){
        //sayma
        this.ekrans.find((it)=>{
            runInAction(()=>{
                this.ekransTotal+=it.images.length
            })
        })
    }
    countTotalDuplicated(){

        this.similars.find((it)=>{
            runInAction(()=>{
                this.similarsTotal+=it.images.length
            })
        })
    }
    countTotalSame(){

        this.same.find((it)=>{
            runInAction(()=>{
                this.sameTotal+=it.images.length
            })
        })
    }
    resetSelected(){
        runInAction(()=>{
            this.selected=[]
            this.imageTotal=0
            this.videoTotal=0
        })
    }

    keepAll(it){

    }

    changeLink(link){

        let appleId = link.substring(5, 41);
        const uri = `assets-library://asset/asset.?id=${appleId}&ext=`;
        return uri


    }
    convertLocalIdentifierToAssetLibrary = (localIdentifier, ext) => {
        const hash = localIdentifier.split('/')[0];
        return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
    };


    compareContactsName = ()=>{
        //rehber cekme
        // AsyncStorage.removeItem('sameNameContact')
        runInAction(()=>{
            this.contactsLoading=true

        })
        // if(this.contacts[0]['name']==undefined){
        //     this.contacts.find((it,indis)=>{
        //         runInAction(()=>{
        //             it['name']=null
        //             it.name=it.givenName+' '+it.familyName
        //         })
        //         if(indis==this.contacts.length-1){
        //
        //         }
        //     })
        // }

        const duplicateIds = this.contacts
            .map(v => v.givenName +' '+v.familyName)
            .filter((v, i, vIds) => vIds.indexOf(v) !== i)
        const duplicates = this.contacts
            .filter(obj => duplicateIds.includes(obj.givenName +' '+obj.familyName));

        // alert('duplicates '+duplicates.length)
        let arr = duplicates.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.givenName+' '+t.familyName === value.givenName+' '+value.familyName
                ))
        )
        // alert('arr '+arr.length)
        runInAction(()=>{
            this.mergeArr=duplicates
            this.duplicatedContactsName=arr
            this.duplicatedContactsName.sort((a, b) => a.givenName.localeCompare(b.givenName))

            this.contactsLoading=false
        })

        // AsyncStorage.getItem('sameNameContact').then(data=>{
        //     if(data){
        //         runInAction(()=>{
        //             this.duplicatedContactsName=JSON.parse(data)
        //             this.duplicatedContactsName.sort((a, b) => a.givenName.localeCompare(b.givenName))
        //             this.contactsLoading=false
        //             this.setMergeArr()
        //             // this.getContactDupList()
        //             // alert(this.duplicatedContactsName.length)
        //         })
        //     }else{
        //         // let arr = []
        //         //
        //         // this.contacts.find((it,indis)=>{
        //         //     if(arr.length>0){
        //         //         arr.find((val,sira)=>{
        //         //             if(val.name== it.givenName+' '+it.familyName){
        //         //                 arr[sira].count+=1
        //         //             }else if(sira==arr.length-1){
        //         //                 let obje = {
        //         //                     name:it.givenName+' '+it.familyName,
        //         //                     count:1
        //         //
        //         //                 }
        //         //                 arr.push(obje)
        //         //             }
        //         //         })
        //         //     }else{
        //         //         let obje = {
        //         //             name:it.givenName+' '+it.familyName,
        //         //             count:1
        //         //
        //         //         }
        //         //         arr.push(obje)
        //         //     }
        //         //     console.log('indis',indis)
        //         //
        //         //     if(indis== this.contacts.length-1){
        //         //         let arr2 = arr.map(val=>{
        //         //             if(val.count>1){
        //         //                 return val.name
        //         //             }
        //         //         })
        //         //         // alert(arr2.length)
        //         //
        //         //         let arr3 = []
        //         //         arr2.find((val,inx)=>{
        //         //             this.contacts.find((deger,sira)=>{
        //         //                 if(deger.givenName+' '+deger.familyName == val){
        //         //                     arr3.push(deger)
        //         //                     console.log('inx',inx,arr3.length)
        //         //
        //         //
        //         //
        //         //                     return true
        //         //                 }
        //         //
        //         //
        //         //             })
        //         //             if(inx == arr2.length-1){
        //         //                 // alert('bitti')
        //         //                 runInAction(()=>{
        //         //                     this.duplicatedContactsName=arr3
        //         //
        //         //                     this.contactsLoading=false
        //         //                                     this.setMergeArr()
        //         //
        //         //                                     AsyncStorage.setItem('sameNameContact',JSON.stringify(arr3))
        //         //                 })
        //         //
        //         //             }
        //         //
        //         //         })
        //         //
        //         //     }
        //         // })
        //
        //
        //
        //         // let uniqueList = [];
        //         // let dupList = [];
        //         // Array.prototype.contains = function(item){
        //         //     let filtered_item = this.filter((i) => {
        //         //         return i.givenName+' '+i.familyName === item.givenName+' '+i.familyName
        //         //     });
        //         //     return !!filtered_item.length;
        //         // }
        //         // function contains(list, item){
        //         //     let filtered_item = list.filter((i) => {
        //         //         return i.givenName+' '+i.familyName === item.givenName+' '+i.familyName
        //         //     });
        //         //     return !!filtered_item.length;
        //         // }
        //         // function pushToUniqueList(item){
        //         //     if(!uniqueList.contains(item)) uniqueList.push(item);
        //         // }
        //         //
        //         // function pushToDuplicateList(item){
        //         //     if(!dupList.contains(item)) dupList.push(item);
        //         // }
        //         //
        //         // for(let i = 0; i < this.contacts.length; i++){
        //         //     setTimeout(()=>{
        //         //         console.log(i)
        //         //         if(uniqueList.contains(this.contacts[i])){
        //         //             pushToDuplicateList(this.contacts[i]);
        //         //         } else {
        //         //             pushToUniqueList(this.contacts[i]);
        //         //
        //         //         }
        //         //         if(i==this.contacts.length-1){
        //         //             runInAction(()=>{
        //         //                 this.duplicatedContactsName=dupList
        //         //                 this.contactsLoading=false
        //         //                 this.setMergeArr()
        //         //
        //         //                 AsyncStorage.setItem('sameNameContact',JSON.stringify(dupList))
        //         //
        //         //             })
        //         //         }
        //         //     },i*9)
        //         //
        //         // }
        //         //
        //         // console.log('Duplicate list is ', dupList);
        //         // if(dupList.length>0){
        //         //
        //         //     AsyncStorage.setItem('sameNameContact',JSON.stringify(dupList))
        //         // }
        //         // console.log('Unique list is ', uniqueList);
        //     }
        // })

    }
    getAllContacts=()=>{
        // check(PERMISSIONS.IOS.CONTACTS).then((result) => {
        //     if(result == 'denied' || result == 'blocked'){
        //         request(PERMISSIONS.IOS.CONTACTS).then(data=>{
        //             if(data != 'denied' && data != 'blocked'){
        //                 return data
        //             }else{
        //
        //                 Alert.alert(I18n.t('permissionNeeded'),I18n.t('findDuplicates'))
        //             }
        //         }).then(data=>{
        //
        //             Contacts.getAll((err, contacts) => {
        //                 if (err) {
        //                     throw err;
        //                 }
        //
        //                 runInAction(()=>{
        //                     this.contacts=contacts
        //                     this.contacts.sort((a, b) => a.givenName.localeCompare(b.givenName))
        //
        //                     console.log(this.contacts[0])
        //                     if(!this.contactsLoading){
        //
        //                         this.compareContactsName()
        //                     }
        //                 })
        //                 // contacts returned
        //             })
        //         })
        //     }else{
        //
        //
        //     }
        // }).then(Contacts.getAll((err, contacts) => {
        //     if (err) {
        //         throw err;
        //     }
        //
        //     runInAction(()=>{
        //         this.contacts=contacts
        //         this.contacts.sort((a, b) => a.givenName.localeCompare(b.givenName))
        //
        //         console.log(this.contacts[0])
        //         if(!this.contactsLoading){
        //
        //             this.compareContactsName()
        //         }
        //     })
        //     // contacts returned
        // }))

        Contacts.getAll((err, contacts) => {
            if (err) {
                throw err;
            }

            runInAction(()=>{
                this.contacts=contacts
                this.contacts.sort((a, b) => a.givenName.localeCompare(b.givenName))

                console.log(this.contacts[0])
                if(!this.contactsLoading){

                    this.compareContactsName()
                }
            })
            // contacts returned
        })

    }

    async deleteOther(navigation){
        try{
            if(!this.premium){
                if(this.dailyOther<=this.dailyLimit && this.dailyLimit != 0){
                    this.setDailyLimit('others')
                    runInAction(()=>{
                        this.deleteLoading=true
                    })
                    let arr = this.selectedOther.filter(it=>{
                        return it
                    })
                    CameraRoll.deletePhotos(arr).then(data=>{
                        runInAction(()=>{
                            this.deleteLoading=false
                        })
                        if(data){
                            this.selectedOther.forEach((it,indis)=>{


                                this.wholeImages.find((item,index)=>{
                                    if(item){
                                        if(item.node.image.uri==it){
                                            runInAction(()=>{
                                                this.wholeImages.splice(index,1)


                                            })
                                        }





                                    }
                                    if(index==this.wholeImages.length-1){

                                        AsyncStorage.setItem('wholeImages',JSON.stringify(this.wholeImages))
                                        navigation.navigate('FlashCongrats',{total:this.otherTotalSize,deleted:this.selectedOther.length})
                                        setTimeout(()=>{
                                            runInAction(()=>{

                                                this.otherTotalSize=0
                                                this.selectedOther=[]
                                            })


                                        },1000)
                                    }

                                })

                                this.similars.find((sims,indx)=>{
                                    if(sims){
                                        sims.images.find((imgs,inx)=>{
                                            runInAction(()=>{

                                                if(imgs==it){
                                                    sims.images.splice(inx,1)
                                                    if(sims.images.length<2){
                                                        this.similars.splice(indx,1)
                                                    }

                                                }
                                            })
                                        })
                                    }
                                    if(indx==this.similars.length-1){
                                        AsyncStorage.setItem('similars',JSON.stringify(this.similars))




                                    }
                                })

                                this.same.find((sims,indx)=>{
                                    if(sims){
                                        sims.images.find((imgs,inx)=>{
                                            runInAction(()=>{

                                                if(imgs==it){
                                                    sims.images.splice(inx,1)
                                                    if(sims.images.length<2){
                                                        this.same.splice(indx,1)
                                                    }

                                                }
                                            })
                                        })
                                    }
                                    if(indx==this.same.length-1){
                                        AsyncStorage.setItem('same',JSON.stringify(this.same))




                                    }
                                })


                                this.ekrans.find((sims,indx)=>{
                                    if(sims){
                                        sims.images.find((imgs,inx)=>{
                                            runInAction(()=>{

                                                if(imgs==it){
                                                    sims.images.splice(inx,1)
                                                    if(sims.images.length<2){
                                                        this.ekrans.splice(indx,1)
                                                    }

                                                }
                                            })
                                        })
                                    }
                                    if(indx==this.ekrans.length-1){
                                        AsyncStorage.setItem('ekrans',JSON.stringify(this.ekrans))




                                    }
                                })




                            })
                        }else{

                        }
                    }).catch(e=>{
                        runInAction(()=>{
                            this.deleteLoading=false
                        })

                    })
                }else{
                    Alert.alert(I18n.t('alert'),I18n.t('noLimit'))

                    navigation.navigate('Premium')
                }
            }else{
                runInAction(()=>{
                    this.deleteLoading=true
                })
                let arr = this.selectedOther.filter(it=>{
                    return it
                })
                CameraRoll.deletePhotos(arr).then(data=>{
                    runInAction(()=>{
                        this.deleteLoading=false
                    })
                    if(data){
                        this.selectedOther.forEach((it,indis)=>{


                            this.wholeImages.find((item,index)=>{
                                if(item){
                                    if(item.node.image.uri==it){
                                        runInAction(()=>{
                                            this.wholeImages.splice(index,1)


                                        })
                                    }





                                }
                                if(index==this.wholeImages.length-1){

                                    AsyncStorage.setItem('wholeImages',JSON.stringify(this.wholeImages))
                                    navigation.navigate('FlashCongrats',{total:this.otherTotalSize,deleted:this.selectedOther.length})
                                    setTimeout(()=>{
                                        runInAction(()=>{

                                            this.otherTotalSize=0
                                            this.selectedOther=[]
                                        })


                                    },1000)
                                }

                            })

                            this.similars.find((sims,indx)=>{
                                if(sims){
                                    sims.images.find((imgs,inx)=>{
                                        runInAction(()=>{

                                            if(imgs==it){
                                                sims.images.splice(inx,1)
                                                if(sims.images.length<2){
                                                    this.similars.splice(indx,1)
                                                }

                                            }
                                        })
                                    })
                                }
                                if(indx==this.similars.length-1){
                                    AsyncStorage.setItem('similars',JSON.stringify(this.similars))




                                }
                            })

                            this.same.find((sims,indx)=>{
                                if(sims){
                                    sims.images.find((imgs,inx)=>{
                                        runInAction(()=>{

                                            if(imgs==it){
                                                sims.images.splice(inx,1)
                                                if(sims.images.length<2){
                                                    this.same.splice(indx,1)
                                                }

                                            }
                                        })
                                    })
                                }
                                if(indx==this.same.length-1){
                                    AsyncStorage.setItem('same',JSON.stringify(this.same))




                                }
                            })


                            this.ekrans.find((sims,indx)=>{
                                if(sims){
                                    sims.images.find((imgs,inx)=>{
                                        runInAction(()=>{

                                            if(imgs==it){
                                                sims.images.splice(inx,1)
                                                if(sims.images.length<2){
                                                    this.ekrans.splice(indx,1)
                                                }

                                            }
                                        })
                                    })
                                }
                                if(indx==this.ekrans.length-1){
                                    AsyncStorage.setItem('ekrans',JSON.stringify(this.ekrans))




                                }
                            })




                        })
                    }else{

                    }
                }).catch(e=>{
                    runInAction(()=>{
                        this.deleteLoading=false
                    })

                })
            }



        }catch (e) {
            alert(e)
        }

    }
    async deleteVideo(navigation){
        try{
            if(!this.premium){
                if(this.dailyVideo<=this.dailyLimit && this.dailyLimit != 0){
                    this.setDailyLimit('video')
                    runInAction(()=>{
                        this.deleteLoading=true
                    })
                    let arr = this.videoSelected.filter(it=>{
                        return it
                    })
                    CameraRoll.deletePhotos(arr).then(data=>{
                        runInAction(()=>{
                            this.deleteLoading=false
                        })
                        if(data){
                            this.videoSelected.forEach((it,indis)=>{


                                this.allVideos.find((item,index)=>{
                                    if(item){
                                        if(item.node.image.uri==it){
                                            runInAction(()=>{
                                                this.allVideos.splice(index,1)


                                            })
                                        }
                                    }
                                    if(index==this.allVideos.length-1){

                                        AsyncStorage.setItem('videos',JSON.stringify(this.allVideos))
                                        navigation.navigate('FlashCongrats',{total:this.videoTotal,deleted:this.videoSelected.length})
                                        setTimeout(()=>{

                                            this.videoTotal=0
                                            this.videoSelected=[]


                                        },1000)
                                    }

                                })
                            })
                        }else{
                            runInAction(()=>{
                                this.deleteLoading=false
                            })
                        }
                    }).catch(e=>{
                        runInAction(()=>{
                            this.deleteLoading=false
                        })

                    })
                }else{
                    Alert.alert(I18n.t('alert'),I18n.t('noLimit'))

                    navigation.navigate('Premium')
                }
            }else{
                runInAction(()=>{
                    this.deleteLoading=true
                })
                let arr = this.videoSelected.filter(it=>{
                    return it
                })
                CameraRoll.deletePhotos(arr).then(data=>{
                    runInAction(()=>{
                        this.deleteLoading=false
                    })
                    if(data){
                        this.videoSelected.forEach((it,indis)=>{


                            this.allVideos.find((item,index)=>{
                                if(item){
                                    if(item.node.image.uri==it){
                                        runInAction(()=>{
                                            this.allVideos.splice(index,1)


                                        })
                                    }
                                }
                                if(index==this.allVideos.length-1){

                                    AsyncStorage.setItem('videos',JSON.stringify(this.allVideos))
                                    navigation.navigate('FlashCongrats',{total:this.videoTotal,deleted:this.videoSelected.length})
                                    setTimeout(()=>{

                                        this.videoTotal=0
                                        this.videoSelected=[]


                                    },1000)
                                }

                            })
                        })
                    }else{
                        runInAction(()=>{
                            this.deleteLoading=false
                        })
                    }
                }).catch(e=>{
                    runInAction(()=>{
                        this.deleteLoading=false
                    })

                })
            }



        }catch (e) {
            alert(e)
        }

    }

    async deleteSame(navigation){
        try{

            if(!this.premium){
                if(this.dailySame<=this.dailyLimit && this.dailyLimit != 0){
                    this.setDailyLimit('same')
                    runInAction(()=>{
                        this.deleteLoading=true
                    })
                    let arr = this.sameSelected.filter(it=>{
                        return it
                    })
                    CameraRoll.deletePhotos(arr).then(data=>{
                        runInAction(()=>{
                            this.deleteLoading=false
                        })
                        if(data){
                            this.sameSelected.forEach((it,indis)=>{


                                this.same.find((sims,indx)=>{
                                    if(sims){
                                        sims.images.find((imgs,inx)=>{
                                            runInAction(()=>{

                                                if(imgs==it){
                                                    sims.images.splice(inx,1)
                                                    if(sims.images.length<2){
                                                        this.same.splice(indx,1)
                                                    }

                                                }
                                            })
                                        })
                                    }
                                    if(indx==this.same.length-1){

                                        AsyncStorage.setItem('same',JSON.stringify(this.same))
                                        navigation.navigate('FlashCongrats',{total:this.sameTotalSize,deleted:this.sameSelected.length})
                                        setTimeout(()=>{

                                            this.sameSelected=[]
                                            this.sameTotalSize=0
                                            this.countAgain()

                                        },1000)


                                    }

                                })
                                this.similars.find((sims,indx)=>{
                                    if(sims){
                                        sims.images.find((imgs,inx)=>{
                                            runInAction(()=>{

                                                if(imgs==it){
                                                    sims.images.splice(inx,1)
                                                    if(sims.images.length<2){
                                                        this.similars.splice(indx,1)
                                                    }

                                                }
                                            })
                                        })
                                    }
                                    if(indx==this.similars.length-1){
                                        AsyncStorage.setItem('similars',JSON.stringify(this.similars))




                                    }
                                })


                                this.wholeImages.find((all,indix)=>{
                                    if(all){
                                        if(all.node.image.uri==it){
                                            runInAction(()=>{
                                                this.wholeImages.splice(indix,1)

                                            })
                                        }
                                    }
                                    if(indix==this.wholeImages.length-1){
                                        AsyncStorage.setItem('wholeImages',JSON.stringify(this.wholeImages))

                                    }

                                })

                                this.checkedImages.find((all,indix)=>{
                                    if(all){
                                        if(all.uri==it){
                                            runInAction(()=>{
                                                this.checkedImages.splice(indix,1)
                                                AsyncStorage.setItem('checkedImages',JSON.stringify(this.checkedImages))
                                                return true
                                            })
                                        }
                                    }

                                })

                            })
                        }else{
                            runInAction(()=>{
                                this.deleteLoading=false
                            })
                        }
                    }).catch(e=>{
                        runInAction(()=>{
                            this.deleteLoading=false
                        })

                    })
                }else{
                    Alert.alert(I18n.t('alert'),I18n.t('noLimit'))

                    navigation.navigate('Premium')
                }}
            else{
                runInAction(()=>{
                    this.deleteLoading=true
                })
                let arr = this.sameSelected.filter(it=>{
                    return it
                })
                CameraRoll.deletePhotos(arr).then(data=>{
                    runInAction(()=>{
                        this.deleteLoading=false
                    })
                    if(data){
                        this.sameSelected.forEach((it,indis)=>{


                            this.same.find((sims,indx)=>{
                                if(sims){
                                    sims.images.find((imgs,inx)=>{
                                        runInAction(()=>{

                                            if(imgs==it){
                                                sims.images.splice(inx,1)
                                                if(sims.images.length<2){
                                                    this.same.splice(indx,1)
                                                }

                                            }
                                        })
                                    })
                                }
                                if(indx==this.same.length-1){

                                    AsyncStorage.setItem('same',JSON.stringify(this.same))
                                    navigation.navigate('FlashCongrats',{total:this.sameTotalSize,deleted:this.sameSelected.length})
                                    setTimeout(()=>{

                                        this.sameSelected=[]
                                        this.sameTotalSize=0
                                        this.countAgain()

                                    },1000)


                                }

                            })
                            this.similars.find((sims,indx)=>{
                                if(sims){
                                    sims.images.find((imgs,inx)=>{
                                        runInAction(()=>{

                                            if(imgs==it){
                                                sims.images.splice(inx,1)
                                                if(sims.images.length<2){
                                                    this.similars.splice(indx,1)
                                                }

                                            }
                                        })
                                    })
                                }
                                if(indx==this.similars.length-1){
                                    AsyncStorage.setItem('similars',JSON.stringify(this.similars))




                                }
                            })


                            this.wholeImages.find((all,indix)=>{
                                if(all){
                                    if(all.node.image.uri==it){
                                        runInAction(()=>{
                                            this.wholeImages.splice(indix,1)

                                        })
                                    }
                                }
                                if(indix==this.wholeImages.length-1){
                                    AsyncStorage.setItem('wholeImages',JSON.stringify(this.wholeImages))

                                }

                            })

                            this.checkedImages.find((all,indix)=>{
                                if(all){
                                    if(all.uri==it){
                                        runInAction(()=>{
                                            this.checkedImages.splice(indix,1)
                                            AsyncStorage.setItem('checkedImages',JSON.stringify(this.checkedImages))
                                            return true
                                        })
                                    }
                                }

                            })

                        })
                    }else{
                        runInAction(()=>{
                            this.deleteLoading=false
                        })
                    }
                }).catch(e=>{
                    runInAction(()=>{
                        this.deleteLoading=false
                    })

                })
            }



        }catch (e) {
            alert(e)
        }

    }
    async deleteSimilar(navigation){
        try{
            if(!this.premium){
                if(this.dailySimilar<=this.dailyLimit && this.dailyLimit != 0){
                    this.setDailyLimit('similar')
                    runInAction(()=>{
                        this.deleteLoading=true
                    })
                    let arr = this.selected.filter(it=>{
                        return it
                    })
                    CameraRoll.deletePhotos(arr).then(data=>{
                        runInAction(()=>{
                            this.deleteLoading=false
                        })
                        if(data){
                            this.selected.forEach((it,indis)=>{
                                this.ekrans.find((sims,indx)=>{
                                    if(sims){
                                        sims.images.find((imgs,inx)=>{
                                            runInAction(()=>{

                                                if(imgs==it){
                                                    sims.images.splice(inx,1)
                                                    if(sims.images.length<2){
                                                        this.ekrans.splice(indx,1)
                                                    }

                                                }
                                            })
                                        })
                                    }
                                    if(indx==this.ekrans.length-1){

                                        AsyncStorage.setItem('ekrans',JSON.stringify(this.ekrans))


                                    }else if(this.ekrans.length<1){
                                        AsyncStorage.setItem('ekrans',JSON.stringify(this.ekrans))

                                    }

                                })

                                this.same.find((sims,indx)=>{
                                    if(sims){
                                        sims.images.find((imgs,inx)=>{
                                            runInAction(()=>{

                                                if(imgs==it){
                                                    sims.images.splice(inx,1)
                                                    if(sims.images.length<2){
                                                        this.same.splice(indx,1)
                                                    }

                                                }
                                            })
                                        })
                                    }
                                    if(indx==this.same.length-1){

                                        AsyncStorage.setItem('same',JSON.stringify(this.same))



                                    }else if(this.same.length<1){
                                        AsyncStorage.setItem('same',JSON.stringify(this.same))

                                    }

                                })
                                this.similars.find((sims,indx)=>{
                                    if(sims){
                                        sims.images.find((imgs,inx)=>{
                                            runInAction(()=>{

                                                if(imgs==it){
                                                    sims.images.splice(inx,1)
                                                    if(sims.images.length<2){
                                                        this.similars.splice(indx,1)
                                                    }

                                                }
                                            })
                                        })
                                    }
                                    if(indx==this.similars.length-1){
                                        AsyncStorage.setItem('similars',JSON.stringify(this.similars))

                                        navigation.navigate('FlashCongrats',{total:this.similarTotalSize,deleted:this.selected.length})
                                        setTimeout(()=>{

                                            this.selected=[]
                                            this.similarTotalSize=0
                                            this.countAgain()

                                        },2500)


                                    }else if(this.similars.length<1){
                                        AsyncStorage.setItem('similars',JSON.stringify(this.similars))
                                        navigation.navigate('FlashCongrats',{total:this.similarTotalSize,deleted:this.selected.length})
                                        setTimeout(()=>{

                                            this.selected=[]
                                            this.similarTotalSize=0
                                            this.countAgain()

                                        },2500)
                                    }
                                })
                                this.allImages.find((all,indix)=>{
                                    if(all){
                                        if(all.node.image.uri==it){
                                            runInAction(()=>{
                                                this.allImages.splice(indix,1)

                                            })
                                        }
                                    }
                                    if(indix==this.allImages.length-1){
                                        AsyncStorage.setItem('photos',JSON.stringify(this.allImages))

                                    }

                                })

                                this.wholeImages.find((all,indix)=>{
                                    if(all){
                                        if(all.node.image.uri==it){
                                            runInAction(()=>{
                                                this.wholeImages.splice(indix,1)

                                            })
                                        }
                                    }
                                    if(indix==this.wholeImages.length-1){
                                        AsyncStorage.setItem('wholeImages',JSON.stringify(this.wholeImages))

                                    }

                                })

                                this.checkedImages.find((all,indix)=>{
                                    if(all){
                                        if(all.uri==it){
                                            runInAction(()=>{
                                                this.checkedImages.splice(indix,1)
                                                AsyncStorage.setItem('checkedImages',JSON.stringify(this.checkedImages))
                                                return true
                                            })
                                        }
                                    }

                                })

                            })
                        }
                    }).catch(e=>{
                        runInAction(()=>{
                            this.deleteLoading=false
                        })

                    })
                }else{

                    Alert.alert(I18n.t('alert'),I18n.t('noLimit'))

                    navigation.navigate('Premium')
                }
            }else{
                runInAction(()=>{
                    this.deleteLoading=true
                })
                let arr = this.selected.filter(it=>{
                    return it
                })
                CameraRoll.deletePhotos(arr).then(data=>{
                    runInAction(()=>{
                        this.deleteLoading=false
                    })
                    if(data){
                        this.selected.forEach((it,indis)=>{
                            this.ekrans.find((sims,indx)=>{
                                if(sims){
                                    sims.images.find((imgs,inx)=>{
                                        runInAction(()=>{

                                            if(imgs==it){
                                                sims.images.splice(inx,1)
                                                if(sims.images.length<2){
                                                    this.ekrans.splice(indx,1)
                                                }

                                            }
                                        })
                                    })
                                }
                                if(indx==this.ekrans.length-1){

                                    AsyncStorage.setItem('ekrans',JSON.stringify(this.ekrans))



                                }

                            })

                            this.same.find((sims,indx)=>{
                                if(sims){
                                    sims.images.find((imgs,inx)=>{
                                        runInAction(()=>{

                                            if(imgs==it){
                                                sims.images.splice(inx,1)
                                                if(sims.images.length<2){
                                                    this.same.splice(indx,1)
                                                }

                                            }
                                        })
                                    })
                                }
                                if(indx==this.same.length-1){

                                    AsyncStorage.setItem('same',JSON.stringify(this.same))



                                }

                            })
                            this.similars.find((sims,indx)=>{
                                if(sims){
                                    sims.images.find((imgs,inx)=>{
                                        runInAction(()=>{

                                            if(imgs==it){
                                                sims.images.splice(inx,1)
                                                if(sims.images.length<2){
                                                    this.similars.splice(indx,1)
                                                }

                                            }
                                        })
                                    })
                                }
                                if(indx==this.similars.length-1){
                                    AsyncStorage.setItem('similars',JSON.stringify(this.similars))

                                    navigation.navigate('FlashCongrats',{total:this.similarTotalSize,deleted:this.selected.length})
                                    setTimeout(()=>{

                                        this.selected=[]
                                        this.similarTotalSize=0
                                        this.countAgain()

                                    },2500)


                                }
                            })
                            this.allImages.find((all,indix)=>{
                                if(all){
                                    if(all.node.image.uri==it){
                                        runInAction(()=>{
                                            this.allImages.splice(indix,1)

                                        })
                                    }
                                }
                                if(indix==this.allImages.length-1){
                                    AsyncStorage.setItem('photos',JSON.stringify(this.allImages))

                                }

                            })

                            this.wholeImages.find((all,indix)=>{
                                if(all){
                                    if(all.node.image.uri==it){
                                        runInAction(()=>{
                                            this.wholeImages.splice(indix,1)

                                        })
                                    }
                                }
                                if(indix==this.wholeImages.length-1){
                                    AsyncStorage.setItem('wholeImages',JSON.stringify(this.wholeImages))

                                }

                            })

                            this.checkedImages.find((all,indix)=>{
                                if(all){
                                    if(all.uri==it){
                                        runInAction(()=>{
                                            this.checkedImages.splice(indix,1)
                                            AsyncStorage.setItem('checkedImages',JSON.stringify(this.checkedImages))
                                            return true
                                        })
                                    }
                                }

                            })

                        })
                    }
                }).catch(e=>{
                    runInAction(()=>{
                        this.deleteLoading=false
                    })

                })
            }



        }catch (e) {
            alert(e)
        }

    }

    async deleteScreenShot(navigation){
        try{
            if(this.ekrans.length<1){
                runInAction(()=>{
                    this.screenSelected=[]
                })
            }
            if(!this.premium){
                if(this.dailyEkrans<=this.dailyLimit && this.dailyLimit != 0){
                    this.setDailyLimit('ekrans')
                    runInAction(()=>{
                        this.deleteLoading=true
                    })
                    let arr = this.screenSelected.filter(it=>{
                        return it
                    })
                    CameraRoll.deletePhotos(arr).then(data=>{
                        runInAction(()=>{
                            this.deleteLoading=false
                        })
                        if(data){
                            this.screenSelected.forEach((it,indis)=>{

                                this.same.find((sims,indx)=>{
                                    if(sims){
                                        sims.images.find((imgs,inx)=>{
                                            runInAction(()=>{

                                                if(imgs==it){
                                                    sims.images.splice(inx,1)
                                                    if(sims.images.length<2){
                                                        this.same.splice(indx,1)
                                                    }

                                                }
                                            })
                                        })
                                    }
                                    if(indx==this.same.length-1){

                                        AsyncStorage.setItem('same',JSON.stringify(this.same))



                                    }else if(this.same.length<1){
                                        AsyncStorage.setItem('same',JSON.stringify(this.same))

                                    }

                                })

                                this.ekrans.find((sims,indx)=>{
                                    if(sims){
                                        sims.images.find((imgs,inx)=>{
                                            runInAction(()=>{

                                                if(imgs==it){
                                                    sims.images.splice(inx,1)
                                                    if(sims.images.length<2){
                                                        this.ekrans.splice(indx,1)
                                                    }

                                                }
                                            })
                                        })
                                    }
                                    if(indx==this.ekrans.length-1){

                                        AsyncStorage.setItem('ekrans',JSON.stringify(this.ekrans))
                                        navigation.navigate('FlashCongrats',{total:this.screenTotalSize,deleted:this.screenSelected.length})
                                        setTimeout(()=>{

                                            this.screenSelected=[]
                                            this.screenTotalSize=0
                                            this.countAgain()

                                        },2500)


                                    }else if(this.ekrans.length<1){
                                        AsyncStorage.setItem('ekrans',JSON.stringify(this.ekrans))
                                        navigation.navigate('FlashCongrats',{total:this.screenTotalSize,deleted:this.screenSelected.length})
                                        setTimeout(()=>{
                                            this.screenSelected=[]
                                            this.screenTotalSize=0
                                            this.countAgain()
                                        },2500)

                                    }

                                })
                                this.similars.find((sims,indx)=>{
                                    if(sims){
                                        sims.images.find((imgs,inx)=>{
                                            runInAction(()=>{

                                                if(imgs==it){
                                                    sims.images.splice(inx,1)
                                                    if(sims.images.length<2){
                                                        this.similars.splice(indx,1)
                                                    }

                                                }
                                            })
                                        })
                                    }
                                    if(indx==this.similars.length-1){
                                        AsyncStorage.setItem('similars',JSON.stringify(this.similars))




                                    }else if(this.similars.length<1){
                                        AsyncStorage.setItem('similars',JSON.stringify(this.similars))

                                    }
                                })
                                this.wholeImages.find((all,indix)=>{
                                    if(all){
                                        if(all.node.image.uri==it){
                                            runInAction(()=>{
                                                this.allImages.splice(indix,1)
                                                AsyncStorage.setItem('photos',JSON.stringify(this.allImages))
                                                return true
                                            })
                                        }
                                    }

                                })

                                this.checkedImages.find((all,indix)=>{
                                    if(all){
                                        if(all.uri==it){
                                            runInAction(()=>{
                                                this.checkedImages.splice(indix,1)
                                                AsyncStorage.setItem('checkedImages',JSON.stringify(this.checkedImages))
                                                return true

                                            })
                                        }
                                    }

                                })

                            })
                        }
                    }).catch(e=>{
                        runInAction(()=>{
                            this.deleteLoading=false
                        })
                    })
                }else{
                    Alert.alert(I18n.t('alert'),I18n.t('noLimit'))
                    navigation.navigate('Premium')
                }
            }else{
                runInAction(()=>{
                    this.deleteLoading=true
                })
                let arr = this.screenSelected.filter(it=>{
                    return it
                })
                CameraRoll.deletePhotos(arr).then(data=>{
                    runInAction(()=>{
                        this.deleteLoading=false
                    })
                    if(data){
                        this.screenSelected.forEach((it,indis)=>{

                            this.same.find((sims,indx)=>{
                                if(sims){
                                    sims.images.find((imgs,inx)=>{
                                        runInAction(()=>{

                                            if(imgs==it){
                                                sims.images.splice(inx,1)
                                                if(sims.images.length<2){
                                                    this.same.splice(indx,1)
                                                }

                                            }
                                        })
                                    })
                                }
                                if(indx==this.same.length-1){

                                    AsyncStorage.setItem('same',JSON.stringify(this.same))



                                }

                            })

                            this.ekrans.find((sims,indx)=>{
                                if(sims){
                                    sims.images.find((imgs,inx)=>{
                                        runInAction(()=>{

                                            if(imgs==it){
                                                sims.images.splice(inx,1)
                                                if(sims.images.length<2){
                                                    this.ekrans.splice(indx,1)
                                                }

                                            }
                                        })
                                    })
                                }
                                if(indx==this.ekrans.length-1){

                                    AsyncStorage.setItem('ekrans',JSON.stringify(this.ekrans))
                                    navigation.navigate('FlashCongrats',{total:this.screenTotalSize,deleted:this.screenSelected.length})
                                    setTimeout(()=>{

                                        this.screenSelected=[]
                                        this.screenTotalSize=0
                                        this.countAgain()

                                    },1000)


                                }

                            })
                            this.similars.find((sims,indx)=>{
                                if(sims){
                                    sims.images.find((imgs,inx)=>{
                                        runInAction(()=>{

                                            if(imgs==it){
                                                sims.images.splice(inx,1)
                                                if(sims.images.length<2){
                                                    this.similars.splice(indx,1)
                                                }

                                            }
                                        })
                                    })
                                }
                                if(indx==this.similars.length-1){
                                    AsyncStorage.setItem('similars',JSON.stringify(this.similars))
                                }
                            })
                            this.wholeImages.find((all,indix)=>{
                                if(all){
                                    if(all.node.image.uri==it){
                                        runInAction(()=>{
                                            this.allImages.splice(indix,1)
                                            AsyncStorage.setItem('photos',JSON.stringify(this.allImages))
                                        })
                                    }
                                }

                            })
                            this.checkedImages.find((all,indix)=>{
                                if(all){
                                    if(all.uri==it){
                                        runInAction(()=>{
                                            this.checkedImages.splice(indix,1)
                                            AsyncStorage.setItem('checkedImages',JSON.stringify(this.checkedImages))
                                        })
                                    }
                                }

                            })

                        })
                    }
                }).catch(e=>{
                    runInAction(()=>{
                        this.deleteLoading=false
                    })

                })
            }



        }catch (e) {
            alert(e)
        }

    }


    getCleanableTotal=()=>{
        //temizlenebilir alan
        runInAction(()=>{
            this.totalCleanable=0
        })

        if(this.wholeImages.length>0 && this.similars && this.same && this.ekrans){
            let now = []
            this.similars.find(it=>{
                it.images.find(async img=>{
                    let varmi = await this.wholeImages.map(x => x.node.image.uri).indexOf(img)
                    if(varmi){
                        runInAction(()=>{
                            let item = this.wholeImages[varmi]
                            if(now.indexOf(item.node.image.uri)==-1){
                                now.push(item.node.image.uri)
                                this.totalCleanable+=item.node.image.fileSize

                            }
                        })
                    }

                    // this.wholeImages.find(item=>{
                    //     if(item){
                    //         if(item.node.image.uri==img){
                    //
                    //         }
                    //     }
                    // })
                })

            })
            this.same.find(it=>{
                it.images.find(async img=>{
                    let varmi = await this.wholeImages.map(x => x.node.image.uri).indexOf(img)
                    if(varmi){
                        runInAction(()=>{
                            let item = this.wholeImages[varmi]
                            if(now.indexOf(item.node.image.uri)==-1){
                                now.push(item.node.image.uri)
                                this.totalCleanable+=item.node.image.fileSize

                            }
                        })
                    }

                    // this.wholeImages.find(item=>{
                    //     if(item){
                    //         if(item.node.image.uri==img){
                    //
                    //         }
                    //     }
                    // })
                })

            })

            // this.same.find(it=>{
            //     it.images.find(img=>{
            //         this.wholeImages.find(item=>{
            //             if(item){
            //                 if(item.node.image.uri==img){
            //                     runInAction(()=>{
            //                         if(now.indexOf(item.node.image.uri)==-1){
            //                             now.push(item.node.image.uri)
            //                             this.totalCleanable+=item.node.image.fileSize
            //                             console.log('this.totalCleanable',this.totalCleanable)
            //
            //                         }                                })
            //                 }
            //             }
            //         })
            //     })
            //
            // })
            // this.ekrans.find(it=>{
            //     it.images.find(img=>{
            //         this.wholeImages.find(item=>{
            //             if(item){
            //                 if(item.node.image.uri==img){
            //                     runInAction(()=>{
            //                         if(now.indexOf(item.node.image.uri)==-1){
            //                             now.push(item.node.image.uri)
            //                             this.totalCleanable+=item.node.image.fileSize
            //                             console.log('this.totalCleanable',this.totalCleanable)
            //
            //                         }                                })
            //                 }
            //             }
            //         })
            //     })
            //
            // })


            this.ekrans.find(it=>{
                it.images.find(async img=>{
                    let varmi = await this.wholeImages.map(x => x.node.image.uri).indexOf(img)
                    if(varmi){
                        runInAction(()=>{
                            let item = this.wholeImages[varmi]
                            if(now.indexOf(item.node.image.uri)==-1){
                                now.push(item.node.image.uri)
                                this.totalCleanable+=item.node.image.fileSize

                            }
                        })
                    }

                    // this.wholeImages.find(item=>{
                    //     if(item){
                    //         if(item.node.image.uri==img){
                    //
                    //         }
                    //     }
                    // })
                })

            })
        }else{
            setTimeout(()=>{
                console.log('geldim')
                this.getCleanableTotal()
            },1000)
        }
    }
    setPassword(pw){
        runInAction(()=>{
            this.password=pw
            AsyncStorage.setItem('pw',JSON.stringify(pw))
        })
    }
    changePwActive(active){
        runInAction(()=>{
            this.passwordActive=active

            AsyncStorage.setItem('pwactive',JSON.stringify(active))
        })
    }

    getPassword(){
        AsyncStorage.getItem('pwactive').then(value=>{
            if(value){
                this.passwordActive=JSON.parse(value)
            }
        })
        // Bu sayede uygulama, daha önce kaydedilmiş olan şifre bilgilerini ve şifrenin etkin olup olmadığını yeniden kullanabilir.
        AsyncStorage.getItem('pw').then(data=>{
            if(data){
                this.password=JSON.parse(data)
            }
        })

    }
    getKept(){
        // AsyncStorage.removeItem('kept')
        AsyncStorage.getItem('kept').then(data=>{
            if(data){
                runInAction(()=>{
                    this.kept=JSON.parse(data)


                })
            }
        })

    }
    keepIt(ph,index,indis){
        runInAction(()=>{
            this.kept.push(ph)
            this.similars[index].images.splice(indis,1)
            AsyncStorage.setItem('similars',JSON.stringify(this.similars))
            AsyncStorage.setItem('kept',JSON.stringify(this.kept))
        })
    }
    keepItArray(phs,index){

        runInAction(()=>{
            phs.forEach((it,indis)=>{
                if(this.kept.indexOf(it)==-1){

                    this.kept.push(it)
                }
                if(indis==phs.length-1){
                    this.similars.splice(index,1)
                    AsyncStorage.setItem('similars',JSON.stringify(this.similars))
                    AsyncStorage.setItem('kept',JSON.stringify(this.kept))
                }

            })


        })
    }
    keepItArraySame(phs,index){

        runInAction(()=>{
            phs.forEach((it,indis)=>{
                if(this.kept.indexOf(it)==-1){

                    this.kept.push(it)
                }
                if(indis==phs.length-1){
                    this.same.splice(index,1)
                    AsyncStorage.setItem('same',JSON.stringify(this.same))
                    AsyncStorage.setItem('kept',JSON.stringify(this.kept))
                    this.countAgain()
                }

            })


        })
    }

    countAgain(){
        runInAction(()=>{
            this.sameTotal=0
            this.similarsTotal=0
            this.ekransTotal=0
            this.cleanable=0
        })
        runInAction(()=>{
            this.same.find(it=>{
                this.sameTotal+=it.images.length
                this.cleanable+=it.images.length
            })
        })
        runInAction(()=>{
            this.similars.find(it=>{
                this.similarsTotal+=it.images.length
                this.cleanable+=it.images.length

            })
        })
        runInAction(()=>{
            this.ekrans.find(it=>{
                this.ekransTotal+=it.images.length
                this.cleanable+=it.images.length

            })
        })

    }


    setSelectedContacts(it){
        runInAction(()=>{
            // let arr = this.selected
            // console.log(arr,this.selected)
            //
            // if(arr.indexOf(it)){
            //     arr.splice(this.selected.indexOf(it), 1)
            // }else{
            //
            // }videoTotalSize
            // arr.push(it)
            if(this.selectedContacts.indexOf(it)!= -1){
                // alert('var')
                this.selectedContacts.splice(this.selectedContacts.indexOf(it),1)
            }else{
                this.selectedContacts.push(it)
            }
            console.log(this.selectedContacts)
        })
    }


    getContactByName(name){
        runInAction(()=>{
            this.activeDuplicated=[]
        })
        this.contacts.find((it,indis)=>{
            if(it.givenName+' '+it.familyName == name){
                runInAction(()=>{
                    this.activeDuplicated.push(it)
                    // alert(this.activeDuplicated.length)
                })
            }
        })
    }

    getContactByNameArr(name){
        let arr =  this.contacts.map((it,indis)=>{
            if(it.givenName+' '+it.familyName == name){
                runInAction(()=>{
                    return it
                    // alert(this.activeDuplicated.length)
                })
            }
        })
        return arr
    }

    setSelectedDuplicated(it){
        //secme fonksiyonu
        runInAction(()=>{
            // let arr = this.selected
            // console.log(arr,this.selected)
            //
            // if(arr.indexOf(it)){
            //     arr.splice(this.selected.indexOf(it), 1)
            // }else{
            //
            // }videoTotalSize
            // arr.push(it)
            if(this.selectedDuplicated.indexOf(it)!= -1){
                // alert('var')
                this.selectedDuplicated.splice(this.selectedDuplicated.indexOf(it),1)
            }else{
                this.selectedDuplicated.push(it)
            }
            console.log(this.selectedDuplicated)
        })
    }
    resetDuplicatedContacts(){
        runInAction(()=>{
            this.selectedDuplicated=[]
        })
    }
    deleteContacts(){

        // const { data } = await Contact.getContactsAsync({
        //     fields: [Contact.Fields.ID],
        // });
        // data.find(is=>{
        //     console.log(is)
        //
        // })


        this.selectedContacts.find( (it,index)=>{
            if(it){

                Contact.removeContactAsync(it).then(data=>{
                    if(index == this.selectedContacts.length-1){
                        this.getAllContacts()
                        runInAction(()=>{
                            this.selectedContacts=[]
                            AsyncStorage.setItem('sameNameContact',JSON.stringify(this.duplicatedContactsName))
                            this.compareContactsName()
                        })
                        // Contact.removeContactAsync()
                    }

                })



                this.duplicatedContactsName.find((item,indes)=>{
                    if(item != undefined && item.recordID != undefined){

                        if(item.recordID == it){
                            runInAction(()=>{
                                // alert('önceki'+this.duplicatedContactsName.length)
                                this.duplicatedContactsName.splice(indes,1)
                                // alert('sonraki'+this.duplicatedContactsName.length)

                            })

                        }
                    }
                })
            }





        })


    }
    deleteContactsDup(){

        // const { data } = await Contact.getContactsAsync({
        //     fields: [Contact.Fields.ID],
        // });
        // data.find(is=>{
        //     console.log(is)
        //
        // })


        this.selectedContacts.find( (it,index)=>{
            if(it){

                Contact.removeContactAsync(it).then(data=>{
                    if(index == this.selectedContacts.length-1){
                        this.getAllContacts()
                        runInAction(()=>{
                            this.selectedContacts=[]

                        })
                        // Contact.removeContactAsync()
                    }

                })



            }





        })


    }


    selectDupContacts(name){
        // let arr = this.contacts
        //
        //  groupArray(arr, 'givenName');
        //  console.log(arr)

        // console.log(JSON.stringify(groupByCategory));

        // let arr =  []
        //     this.contacts.find((it,indis)=>{
        //     if(it.givenName+' '+it.familyName == item.givenName+' '+item.familyName){
        //         runInAction(()=>{
        //             arr.push(it)
        //             if(indis==this.contacts.length-1){
        //                 alert(arr.length)
        //
        //             }
        //             // alert(this.activeDuplicated.length)
        //         })
        //     }
        // })

        if(this.willMergeContacts.length>0){
            this.willMergeContacts.find((it,index)=>{
                if(it[0].givenName+' '+it[0].familyName == name){
                    runInAction(()=>{
                        this.willMergeContacts.splice(index,1)
                        this.willMergeNames.splice(this.willMergeNames.indexOf(name),1)
                    })

                }else if(index==this.willMergeContacts.length-1){
                    runInAction(()=>{
                        this.willMergeNames.push(name)
                        this.willMergeContacts[index+1]=[]
                        // alert(this.activeDuplicated.length)
                    })
                    this.contacts.find((it,indis)=>{
                        if(it.givenName+' '+it.familyName == name){
                            runInAction(()=>{

                                this.willMergeContacts[index+1].push(it)

                                console.log(this.willMergeContacts)
                                // this.setSelectedContacts(it.recordID)
                                // alert(this.activeDuplicated.length)
                            })
                        }
                    })

                }

            })
        }else{
            runInAction(()=>{
                this.willMergeNames.push(name)

                this.willMergeContacts[0]=[]
                // alert(this.activeDuplicated.length)
            })
            this.contacts.find((it,indis)=>{
                if(it.givenName+' '+it.familyName == name){
                    runInAction(()=>{
                        this.willMergeContacts[0].push(it)
                        console.log(this.willMergeContacts)

                        // this.setSelectedContacts(it.recordID)
                        // alert(this.activeDuplicated.length)
                    })
                }
            })
        }


    }
    deleteContactsDup(){

        // const { data } = await Contact.getContactsAsync({
        //     fields: [Contact.Fields.ID],
        // });
        // data.find(is=>{
        //     console.log(is)
        //
        // })


        this.selectedContacts.find( (it,index)=>{

            Contact.removeContactAsync(it).then(data=>{
                if(index == this.selectedContacts.length-1){

                    this.getAllContacts()

                    runInAction(()=>{
                        this.selectedContacts=[]
                    })
                    // Contact.removeContactAsync()
                }
            })







        })


    }

    selectAllSimilar(){
        runInAction(()=>{
            this.selected=[]
            this.selectedAll=true
        })
        this.similars.find((it,index)=>{
            runInAction(()=>{
                this.selected=this.selected.concat(it.images.slice(1,it.images.length))
            })
            if(index==this.similars.length-1){
                this.similars.find((similar,indix)=>{
                    if(this.selected.indexOf(similar.images[0])!=-1){
                        runInAction(()=>{
                            this.selected.splice(this.selected.indexOf(similar.images[0]),1)

                        })
                    }
                    if(indix==this.similars.length-1){
                        if(this.similars.length<30){
                            this.selected.find((is,indis)=>{
                                setTimeout(()=>{
                                    MediaLibrary.getAssetInfoAsync(this.getAssetId(is)).then(res=>{
                                        console.log(res.localUri)
                                        // alert(JSON.stringify(res))
                                        stat(res.localUri).then(statResult=>{
                                            runInAction(()=>{
                                                this.similarTotalSize+= statResult.size
                                            })
                                            // alert(JSON.stringify(statResult))
                                            console.log('file size: ' + statResult.size);
                                        }).catch(e=>{
                                            runInAction(()=>{
                                                this.selected.splice(indis,1)
                                                if(this.selected.length<1){
                                                    this.selected=[]
                                                    this.selectedAll=false
                                                    this.similarTotalSize=0

                                                }
                                            })

                                        })

                                    })
                                },indis*50)

                            })
                        }else{
                            runInAction(()=>{
                                this.similarTotalSize= this.selected.length*1.4*1400000
                            })
                        }


                    }

                })






            }
        })
    }
    deselectAllSimilar(){
        runInAction(()=>{
            this.selected=[]
            this.selectedAll=false
            this.similarTotalSize=0
        })

    }
    selectAllSame(){
        //tumunu sec
        runInAction(()=>{
            this.sameSelected=[]
            this.selectedAllSame=true
        })
        this.same.find((it,index)=>{
            runInAction(()=>{
                this.sameSelected=this.sameSelected.concat(it.images.slice(1,it.images.length))
            })
            if(index==this.same.length-1){

                this.same.find((similar,indix)=>{
                    if(this.sameSelected.indexOf(similar.images[0])!=-1){
                        runInAction(()=>{
                            this.sameSelected.splice(this.sameSelected.indexOf(similar.images[0]),1)
                        })
                    }
                    if(indix==this.same.length-1){

                        if(this.same.length<30){
                            this.sameSelected.find((is,indis)=>{
                                setTimeout(()=>{
                                    MediaLibrary.getAssetInfoAsync(this.getAssetId(is)).then(res=>{
                                        console.log(res.localUri)
                                        // alert(JSON.stringify(res))
                                        stat(res.localUri).then(statResult=>{
                                            runInAction(()=>{
                                                this.sameTotalSize+= statResult.size
                                            })
                                            // alert(JSON.stringify(statResult))
                                            console.log('file size: ' + statResult.size);
                                        }).catch(e=>{
                                            runInAction(()=>{
                                                this.sameSelected.splice(indis,1)
                                                if(this.sameSelected.length<1){
                                                    this.sameSelected=[]
                                                    this.selectedAllSame=false
                                                    this.sameTotalSize=0

                                                }
                                            })

                                        })
                                    },indis*25)

                                })
                            })
                        }else{
                            runInAction(()=>{
                                this.sameTotalSize= this.sameSelected.length*1.4*1400000
                            })
                        }

                    }
                })








            }
        })
    }
    deselectAllSame(){
        runInAction(()=>{
            this.sameSelected=[]
            this.selectedAllSame=false
            this.sameTotalSize=0
        })

    }

    selectAllEkrans(){
        runInAction(()=>{
            this.screenSelected=[]
            this.selectedAllEkrans=true
        })
        this.ekrans.find((it,index)=>{
            runInAction(()=>{
                this.screenSelected=this.screenSelected.concat(it.images.slice(1,it.images.length))
            })
            if(index==this.ekrans.length-1){


                this.ekrans.find((similar,indix)=>{
                    if(this.screenSelected.indexOf(similar.images[0])!=-1){
                        runInAction(()=>{
                            this.screenSelected.splice(this.screenSelected.indexOf(similar.images[0]),1)
                        })
                    }
                    if(indix==this.ekrans.length-1){


                        if(this.ekrans.length<30){
                            this.screenSelected.find((is,sira)=>{
                                if(is)
                                MediaLibrary.getAssetInfoAsync(this.getAssetId(is)).then(res=>{
                                    console.log(res.localUri)
                                    // alert(JSON.stringify(res))
                                    stat(res.localUri).then(statResult=>{
                                        runInAction(()=>{

                                            this.screenTotalSize+= statResult.size
                                        })
                                        // alert(JSON.stringify(statResult))
                                        console.log('file size: ' + statResult.size);
                                    }).catch(e=>{
                                        runInAction(()=>{
                                            this.screenSelected.splice(sira,1)
                                            if(this.screenSelected.length<1){
                                                this.screenSelected=[]
                                                this.selectedAllEkrans=false
                                                this.screenTotalSize=0
                                            }
                                        })
                                    })

                                })
                            })
                        }else{
                            runInAction(()=>{
                                this.screenTotalSize= this.screenSelected.length*1.4*1600000
                            })
                        }

                    }
                })








            }
        })

    }
    deselectAllEkrans(){

        runInAction(()=>{
            this.screenSelected=[]
            this.selectedAllEkrans=false
            this.screenTotalSize=0
        })


    }


    getAssetId=(id)=>{
        let newid = id.split('ph://')[1]
        return newid+'/L0/001'
    }

    checkPremium(){
        if(this.deviceId && this.token){
            axios.post(`${API_BASE}/api/user/checkPremium?token=${this.token}&key=${key}`, {
                deviceId:this.deviceId,
            } ).then(data=>{


                runInAction(()=>{
                    this.premium=data.data.premium
                    // alert('premium durumu: '+this.premium)
                })
            }).catch(error => alert(error));

        }else{
            setTimeout(()=>{
                this.checkPremium()
            },500)
        }


    }
    setPremium(){
        runInAction(()=>{
            this.premium=true
        })
    }
    getFirst(){
        AsyncStorage.getItem('first').then(data=>{
            if(data){
                runInAction(()=>{
                    this.start()
                    this.getPlayerId()
                    this.first=false
                })
            }else{
                runInAction(()=>{
                    this.first=true
                })
                AppEventsLogger.logEvent(AppEventsLogger.AppEvents.CompletedRegistration, {
                    [AppEventsLogger.AppEventParams.RegistrationMethod]: "email",
                });
            }
        })
    }
    setFirst(){
        runInAction(()=>{
            this.first=false
        })
    }

    setImageLoaded=()=>{
        runInAction(()=>{
            this.imageLoaded=!this.imageLoaded
        })
    }
    setLastSlider=()=>{
        // alert(this.lastSlider)
        runInAction(()=>{
            this.lastSlider=true
            // alert(this.lastSlider)

        })
    }
    mergeContacts(navigation){
        //rehber birlestirme

        this.activeMergeList.find((it,sira)=>{
            if(it.length>1){

                let first = null
                let phones = []

                Contact.getContactByIdAsync(it[0].recordID).then(data=>{
                    // alert('first '+JSON.stringify(data))
                    first=data
                    if(data.phoneNumbers != undefined)
                        phones.push(data.phoneNumbers[0].number.split(' ').join(''))


                }).catch(e=>{
                    console.error(e)
                })


                // it.find((vale,inx)=>{
                //     phones.push(vale.phoneNumbers[0].number)
                //     if(inx==it.length-1){
                //
                //     }
                // })
                it.find((val,index)=>{
                    if(index!=0)
                        Contact.getContactByIdAsync(val.recordID).then(data=>{
                            // alert(JSON.stringify(data))

                            if(data.phoneNumbers != undefined){
                                if(phones.indexOf(data.phoneNumbers[0].number.split(' ').join(''))==-1){
                                    if(first.phoneNumbers){
                                        first.phoneNumbers.push(data.phoneNumbers[0])
                                        phones.push(data.phoneNumbers[0].number.split(' ').join(''))
                                    }else{
                                        first['phoneNumbers']=[]
                                        first.phoneNumbers.push(data.phoneNumbers[0])
                                        phones.push(data.phoneNumbers[0].number.split(' ').join(''))
                                    }

                                    // alert(JSON.stringify(first.phoneNumbers))
                                    // .replace(/\s/g, '')
                                }

                            }else{

                            }
                            if(index==it.length-1){
                                // alert(JSON.stringify(first))
                                console.log('first',JSON.stringify(first))
                                Contact.updateContactAsync(first).then(dat=>{
                                    // alert(dat)
                                    it.find((son,line)=>{
                                        if(line!=0)
                                            this.setSelectedContacts(son.recordID)
                                        if(line==it.length-1){
                                            this.mergeArr.find((val,inx)=>{
                                                if(val)
                                                    if(val.recordID==first.recordID){
                                                        runInAction(()=>{
                                                            this.mergeArr.splice(inx,1)
                                                            AsyncStorage.setItem('mergeArr',JSON.stringify(this.mergeArr))
                                                        })
                                                    }
                                            })
                                            this.duplicatedContactsName.find((val,inx)=>{
                                                if(val)
                                                    if(val.recordID==first.recordID){
                                                        runInAction(()=>{
                                                            this.duplicatedContactsName.splice(inx,1)
                                                            AsyncStorage.setItem('duplicatedContactsName',JSON.stringify(this.duplicatedContactsName))
                                                        })
                                                    }
                                            })
                                        }
                                    })
                                    if(sira==this.activeMergeList.length-1){
                                        setTimeout(()=>{
                                            this.deleteContacts()
                                            runInAction(()=>{

                                                this.activeMergeList=[]
                                                this.activeMergeLength=0
                                                this.activeMergeListLength=0

                                            })
                                        },1500)
                                    }
                                }).catch(e=>{
                                    // alert(e)

                                })
                                // Contacts.updateContact(first, (err) => {
                                //     if (err) throw err;
                                //     // record updated
                                //     alert('updated')
                                // })

                            }




                        })



                })



            }
        })
    }


    setDarkTheme=(value)=>{
        runInAction(()=>{
            this.isDarkTheme=value
            AsyncStorage.setItem('isDarkTheme',JSON.stringify(value))
            if(value){
                runInAction(()=>{
                    this.theme = 'dark'
                    AsyncStorage.setItem('theme',JSON.stringify("dark"))

                    this.activeTheme=this.darkTheme
                })

            }else{
                runInAction(()=>{
                    this.theme = 'light'
                    AsyncStorage.setItem('theme',JSON.stringify("light"))

                    this.activeTheme=this.ligthTheme
                })
                // this.theme='light'
                // AsyncStorage.setItem('theme',JSON.stringify('light'))
                // this.getTheme()
                // this.activeTheme=this.ligthTheme

            }

        })
    }

    setColors =  (colors)=>{
        // alert(JSON.stringify(colors))
        runInAction(()=>{
            this.colors=colors
        })

    }

    getSecret(){
        runInAction(()=>{
            this.secretVideos=[]
        })
        // AsyncStorage.removeItem('secretItems')
        AsyncStorage.getItem('secretItems').then(data=>{
            if(data) {
                runInAction(() => {
                    this.secretItems=JSON.parse(data)
                    this.secretItems.find(it=>{
                        // alert(it.mime)
                        if(it.mime.indexOf('video') != -1){
                            runInAction(()=>{
                                this.secretVideos.push(it)
                            })
                        }
                    })
                })
            }

        })



    }
    setSecret(image){
        //gizli alan


        if(this.secretItems.length>0){
            let obje = {
                sourceURL:image.path,
                mime:image.mime
            }

            let arr = this.secretItems
            arr.reverse()
            arr.push(obje)
            arr.reverse()
            runInAction(()=>{
                this.secretItems=arr
                AsyncStorage.setItem('secretItems',JSON.stringify(this.secretItems))

            })


        }else{
            let obje = {
                sourceURL:image.path,
                mime:image.mime
            }

            let arr = []
            arr.push(obje)

            runInAction(()=>{
                this.secretItems=arr
                AsyncStorage.setItem('secretItems',JSON.stringify(this.secretItems))

            })
        }
        this.getSecret()
    }
    setSecretPicker(arr){
        runInAction(()=>{
            if(this.deleteAfter){


                let zirr = arr.map(it=>{
                    console.log('it.filename','ph://'+it.localIdentifier)
                    return 'ph://'+it.localIdentifier
                })
                CameraRoll.deletePhotos(zirr).then(data=>{

                })
            }

            this.secretItems=arr.concat(this.secretItems)
            AsyncStorage.setItem('secretItems',JSON.stringify(this.secretItems))
            this.getSecret()
        })
    }

    deleteKept(){
        this.keptSelected.find((it,indis)=>{
            runInAction(()=>{
                this.kept.splice(this.kept.indexOf(it),1)
            })
            if(indis==this.keptSelected.length-1){
                runInAction(()=>{
                    this.keptSelected=[]
                    AsyncStorage.setItem('kept',JSON.stringify(this.kept))
                })
            }
        })

    }
    deleteSecret(){
        this.secretSelected.find((it,indis)=>{
            console.log('ittt',it)
            this.secretItems.find((item,index)=>{
                if(item){
                    console.log('itemitem',item)
                    if(item.sourceURL.substr(it.length-20,it.length-1)==it.substr(it.length-20,it.length-1)){
                        runInAction(()=>{
                            this.secretItems.splice(index,1)
                        })
                    }
                    // if(item.sourceURL.indexOf('file://')!=-1){
                    //
                    // }else{
                    //     if(item.sourceURL==it){
                    //         runInAction(()=>{
                    //             this.secretItems.splice(index,1)
                    //         })
                    //     }
                    // }
                }
                // if(item.sourceURL.split('file://')[1]==it){
                //     runInAction(()=>{
                //         this.secretItems.splice(index,1)
                //     })
                // }
            })
            if(indis==this.secretSelected.length-1){
                runInAction(()=>{
                    this.secretSelected=[]
                    this.getSecret()

                    AsyncStorage.setItem('secretItems',JSON.stringify(this.secretItems))
                })
            }
        })

    }


    shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    getFastClean = () => {
        // Eğer hem tüm resimler hem de tüm videolar mevcutsa
        if (this.wholeImages.length > 0 && this.allVideos.length > 0) {
            // Tüm resimler ve tüm videoları birleştir ve boyuta göre sırala
            runInAction(() => {
                this.fastClean = this.wholeImages.concat(this.allVideos); // Tüm resimler ve tüm videoları birleştir
                this.fastClean.sort((a, b) => b.node.image.fileSize - a.node.image.fileSize); // Boyuta göre sırala
            });
        } else {
            // Eğer tüm resimler ve tüm videolar henüz yüklenmediyse
            setTimeout(() => {
                // 500 milisaniye sonra tekrar dene
                this.getFastClean();
            }, 500);
        }
    }
    


    startBackgroundJob(){
        // if(!BackgroundService.isRunning()){
        //     const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
        //
        //     const veryIntensiveTask = async (taskDataArguments) => {
        //         // Example of an infinite loop task
        //         const { delay } = taskDataArguments;
        //         await new Promise( async (resolve) => {
        //
        //             for (let i = 0; BackgroundService.isRunning(); i++) {
        //
        //
        //
        //                 console.log(i);
        //                 await sleep(delay);
        //             }
        //         });
        //     };
        //
        //     const options = {
        //         taskName: 'Images Analyzing',
        //         taskTitle: 'CleanerLab',
        //         taskDesc: 'Active',
        //         taskIcon: {
        //             name: 'ic_launcher',
        //             type: 'mipmap',
        //         },
        //         color: '#ff00ff',
        //         linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
        //         parameters: {
        //             delay: 10000,
        //         },
        //     };
        //
        //     BackgroundService.start(veryIntensiveTask,options)
        // }



    }

    fastCleanDelete=(item)=>{
        //hizli silme islemi

        runInAction(()=>{
            this.fastCleanTrash.push(item.node.image.uri)
            this.fastCleanTotalSize+=item.node.image.fileSize
        })
    }

    resetTrash(){
        runInAction(()=>{
            this.fastCleanTrash = []
            this.fastCleanTotalSize = 0
        })
    }
    async emptyTrash(navigation){
        try{
            runInAction(()=>{
                this.deleteLoading=true
            })
            let arr = this.fastCleanTrash.filter(it=>{
                return it
            })
            CameraRoll.deletePhotos(arr).then(data=>{
                runInAction(()=>{
                    this.deleteLoading=false
                })
                if(data){
                    this.fastCleanTrash.forEach((it,indis)=>{


                        this.wholeImages.find((item,index)=>{
                            if(item){
                                if(item.node.image.uri==it){
                                    runInAction(()=>{
                                        this.wholeImages.splice(index,1)


                                    })
                                }





                            }
                            if(index==this.wholeImages.length-1){

                                AsyncStorage.setItem('wholeImages',JSON.stringify(this.wholeImages))
                                navigation.navigate('FlashCongrats',{total:this.fastCleanTotalSize,deleted:this.fastCleanTrash.length})
                                setTimeout(()=>{
                                    runInAction(()=>{

                                        this.fastCleanTotalSize=0
                                        this.fastCleanTrash=[]
                                    })


                                },1000)
                            }

                        })

                        this.similars.find((sims,indx)=>{
                            if(sims){
                                sims.images.find((imgs,inx)=>{
                                    runInAction(()=>{

                                        if(imgs==it){
                                            sims.images.splice(inx,1)
                                            if(sims.images.length<2){
                                                this.similars.splice(indx,1)
                                            }

                                        }
                                    })
                                })
                            }
                            if(indx==this.similars.length-1){
                                AsyncStorage.setItem('similars',JSON.stringify(this.similars))




                            }
                        })

                        this.same.find((sims,indx)=>{
                            if(sims){
                                sims.images.find((imgs,inx)=>{
                                    runInAction(()=>{

                                        if(imgs==it){
                                            sims.images.splice(inx,1)
                                            if(sims.images.length<2){
                                                this.same.splice(indx,1)
                                            }

                                        }
                                    })
                                })
                            }
                            if(indx==this.same.length-1){
                                AsyncStorage.setItem('same',JSON.stringify(this.same))




                            }
                        })


                        this.ekrans.find((sims,indx)=>{
                            if(sims){
                                sims.images.find((imgs,inx)=>{
                                    runInAction(()=>{

                                        if(imgs==it){
                                            sims.images.splice(inx,1)
                                            if(sims.images.length<2){
                                                this.ekrans.splice(indx,1)
                                            }

                                        }
                                    })
                                })
                            }
                            if(indx==this.ekrans.length-1){
                                AsyncStorage.setItem('ekrans',JSON.stringify(this.ekrans))




                            }
                        })




                    })
                }else{

                }
            }).catch(e=>{
                runInAction(()=>{
                    this.deleteLoading=false
                })

            })


        }catch (e) {
            alert(e)
        }

    }

    undoTrash(index){
        //geri alma silmeyi
        // alert(index)
        this.fastCleanTrash.find((it,indis)=>{
            if(it==this.fastClean[index].node.image.uri){
                runInAction(()=>{
                    this.fastCleanTrash.splice(indis,1)
                    this.fastCleanTotalSize-=this.fastClean[index].node.image.fileSize
                })
            }
        })
        // runInAction(())
    }
    setCardIndex = (index)=>{
        runInAction(()=>{
            this.cardIndex=index
        })
    }


    checkNews(){
        //galeride yeni fotograf varmi
        if(!this.newscomparingStarted){
            runInAction(()=>{
                this.newscomparingStarted=true
            })

            // alert(JSON.stringify(this.checkedImages[0]))
            MediaLibrary.getAssetsAsync({createdAfter:this.checkedImages[0].creationTime,sortBy:['creationTime']}).then(res=>{
                // alert('ascending '+res.assets[0].uri)
                // alert(res.assets.length)
                if(res.assets.length>0){
                    CameraRoll.getPhotos({
                        first:res.assets.length,
                        assetType:'Photos'
                    }).then(r=>{
                        runInAction(async ()=>{
                            try{

                                this.wholeImages= r.edges.concat(this.wholeImages)
                                // .sort((a,b)=>b.node.image.fileSize-a.node.image.fileSize);
                                AsyncStorage.setItem('wholeImages',JSON.stringify(this.wholeImages))

                            }catch (e) {

                            }
                        })
                    })
                }
                this.compressNews(res.assets)
            })

        }



    }



    compressNews(assets){
        assets.find((it,index)=>{
            ImageResizer.createResizedImage(this.changeLink(it.uri), 16, 16,'JPEG',1,0)
                .then( response => {
                    runInAction(()=>{

                        it['resizedImage']=response.path
                        console.log('NEW IMAGESS',it.resizedImage)
                        if(index == assets.length-1){
                            this.comparePhotosNew(assets.reverse())
                        }

                    })


                })
        })
    }



    setSimilarNew(it){
        if(it.image1 != it.image2){
            runInAction(async ()=>{

                // this.similars.push(it)
                try{
                    if(this.similars.length<1){
                        let obje = {
                            images:[it.image1,it.image2]
                        }
                        this.similars.push(obje)
                    }else{
                        this.similars.find((item,indis)=>{
                            if(item.images.indexOf(it.image1) != -1 && item.images.indexOf(it.image2) == -1){
                                if(this.similars[indis].images.indexOf(it.image2)==-1){
                                    runInAction(()=>{
                                        this.similars[indis].images.push(it.image2)
                                    })
                                    return true

                                }

                            }else if(item.images.indexOf(it.image2)>-1 && item.images.indexOf(it.image1)<0){
                                if(this.similars[indis].images.indexOf(it.image2)==-1){
                                    runInAction(()=>{
                                        this.similars[indis].images.push(it.image2)
                                    })
                                    return true


                                }
                            }else if(item.images.indexOf(it.image2) != -1 && item.images.indexOf(it.image1) != -1){
                                return true
                            }

                            if(item.images.indexOf(it.image2) == -1 && item.images.indexOf(it.image1) == -1 && indis == this.similars.length-1){
                                if(it.image1 != it.image2){
                                    let obje = {
                                        images:[it.image1,it.image2]
                                    }
                                    runInAction(()=>{
                                        let arr = this.similars
                                        arr.reverse()
                                        arr.push(obje)
                                        arr.reverse()
                                        this.similars=arr

                                    })


                                }

                            }

                        })

                    }
                    this.similarsTotal=0
                    this.countTotalDuplicated()
                    AsyncStorage.setItem('similars',JSON.stringify(this.similars))


                }catch (e) {

                }






            })

        }

    }
    setSameNew(it){
        if(it.image1 != it.image2){
            runInAction(async ()=>{

                // this.similars.push(it)
                try{
                    if(this.same.length<1){
                        let obje = {
                            images:[it.image1,it.image2]
                        }
                        this.same.push(obje)
                    }else{
                        this.same.find((item,indis)=>{
                            if(item.images.indexOf(it.image1)>-1 && item.images.indexOf(it.image2)<0){
                                if(this.same[indis].images.indexOf(it.image2)==-1){
                                    runInAction(()=>{
                                        this.same[indis].images.push(it.image2)

                                    })

                                    return true
                                }
                            }else if(item.images.indexOf(it.image2)>-1 && item.images.indexOf(it.image1)<0){
                                if(this.same[indis].images.indexOf(it.image2)==-1){
                                    runInAction(()=>{
                                        this.same[indis].images.push(it.image2)

                                    })

                                    return true
                                }
                            }else if(item.images.indexOf(it.image2)>-1 && item.images.indexOf(it.image1)>-1){
                                return true
                            }

                            if(item.images.indexOf(it.image2)<0 && item.images.indexOf(it.image1)<0 && indis == this.same.length-1){
                                if(it.image1 != it.image2){
                                    let obje = {
                                        images:[it.image1,it.image2]
                                    }

                                    runInAction(()=>{
                                        let arr = this.same
                                        arr.reverse()
                                        arr.push(obje)
                                        arr.reverse()
                                        this.same=arr

                                    })

                                }

                            }

                        })

                    }
                    this.sameTotal=0
                    this.countTotalSame()
                    AsyncStorage.setItem('same',JSON.stringify(this.same))


                }catch (e) {

                }





            })

        }

    }
    setScreenShotNew(it){
        if(it.image1 != it.image2){
            runInAction(async ()=>{

                // this.similars.push(it)
                try{
                    if(this.ekrans.length<1){
                        let obje = {
                            images:[it.image1,it.image2]
                        }
                        this.ekrans.push(obje)
                    }else{
                        this.ekrans.find((item,indis)=>{
                            if(item.images.indexOf(it.image1)>-1 && item.images.indexOf(it.image2)<0){
                                if(this.ekrans[indis].images.indexOf(it.image2)==-1){
                                    runInAction(()=>{
                                        this.ekrans[indis].images.push(it.image2)
                                    })
                                    return true
                                }
                            }else if(item.images.indexOf(it.image2)>-1 && item.images.indexOf(it.image1)<0){
                                if(this.ekrans[indis].images.indexOf(it.image2)==-1){
                                    runInAction(()=>{
                                        this.ekrans[indis].images.push(it.image2)
                                    })
                                    return true
                                }
                            }else if(item.images.indexOf(it.image2)>-1 && item.images.indexOf(it.image1)>-1){
                                return true
                            }

                            if(item.images.indexOf(it.image2)<0 && item.images.indexOf(it.image1)<0 && indis == this.ekrans.length-1){
                                if(it.image1 != it.image2){
                                    let obje = {
                                        images:[it.image1,it.image2]
                                    }

                                    runInAction(()=>{
                                        let arr = this.ekrans
                                        arr.reverse()
                                        arr.push(obje)
                                        arr.reverse()
                                        this.ekrans=arr

                                    })
                                }


                            }

                        })

                    }
                    this.ekransTotal=0
                    this.countTotalEkrans()
                    AsyncStorage.setItem('ekrans',JSON.stringify(this.ekrans))


                }catch (e) {

                }





            })

        }

    }


    comparePhotosNew(assets){
        // alert('calistim')
        // console.log(this.wholeImages[7],this.wholeImages[8])
        // nodejs.channel.send(this.wholeImages[13],this.wholeImages[14])
        let chunkSize = 15;
        if(!this.comparingStarted){
            runInAction(()=>{
                this.startBackgroundJob()
                this.comparingStarted=true
                this.finished = false

            })

            for (let i = 0; i < assets.length; i += chunkSize) {
                let chunk = assets.slice(i, i + chunkSize);
                // do whatever
                // console.log(i,'i')

                setTimeout(()=>{
                    // alert(JSON.stringify(chunk))

                    chunk.map((it,index)=>{
                        console.log('varmivarmivarmi',it.resizedImage,i)
                        chunk.map((item,indis)=>{

                            if(index != indis){
                                // console.log(i,indis*index,it.node.image.uri,item.node.image.uri)
                                nodejs.channel.send(it,item,true)
                                // console.log(it,item,true)

                            }
                            if(i+15>assets.length && indis==(assets.length%15)-1 && index==(assets.length%15)-1){
                                runInAction(()=>{
                                    // alert('bitti')
                                    setTimeout(()=>{
                                        this.finished=true
                                        this.comparingStarted=false
                                    },2000)
                                })
                            }
                            // if(indis==14 && index==14){
                            //     runInAction(()=>{
                            //
                            //         this.photoOptimized=i
                            //         // console.log('this.photoOptimizedthis.photoOptimizedthis.photoOptimized',this.photoOptimized,this.checkedImages.length)
                            //
                            //     })
                            //     setTimeout(()=>{
                            //
                            //         AsyncStorage.setItem('lastChunk',JSON.stringify(i))
                            //
                            //     },15000)
                            // }
                        })

                    })

                },100*i)



            }


            // AsyncStorage.getItem('lastChunkNew').then(lastChunk=>{
            //     if(lastChunk){
            //
            //         let x = JSON.parse(lastChunk)
            //
            //         if(x < assets.length){
            //             let son = 0
            //             let son2 = 0
            //             let son2indis = 0
            //             for (let i = x; i < assets.length; i += chunkSize) {
            //                 const chunk = assets.slice(i, i + chunkSize);
            //                 son+=chunkSize
            //                 // alert(lastChunk+' - '+this.wholeImages.length)
            //
            //                 // do whatever
            //                 setTimeout(()=>{
            //                     // alert(JSON.stringify(chunk))
            //
            //                     chunk.map((it,index)=>{
            //                         console.log('varmivarmivarmi',it.resizedImage,i)
            //
            //                         chunk.map((item,indis)=>{
            //
            //                             if(index != indis){
            //
            //                                 nodejs.channel.send(it,item,true)
            //
            //                             }
            //                             if(i + 15 > this.checkedImages.length && indis==(this.checkedImages.length%15)-1 && index==(this.checkedImages.length%15)-1){
            //                                 setTimeout(()=>{
            //                                     runInAction(()=>{
            //                                         this.comparingStarted=false
            //
            //                                         this.finished=true
            //
            //
            //                                     })
            //                                 },2000)
            //                             }
            //                             if(indis==14 && index==14){
            //                                 runInAction(()=>{
            //
            //                                     this.photoOptimized=i
            //                                     // console.log('this.photoOptimizedthis.photoOptimizedthis.photoOptimized',this.photoOptimized,this.checkedImages.length)
            //                                 })
            //                                 setTimeout(()=>{
            //
            //                                     AsyncStorage.setItem('lastChunk',JSON.stringify(i))
            //
            //                                 },15000)
            //                             }
            //
            //                         })
            //                     })
            //                 },100*son)
            //
            //
            //             }
            //         }else{
            //             // alert('chunk bitti')
            //             runInAction(()=>{
            //                 this.comparePhotosFast()
            //
            //                 this.finished=true
            //             })
            //         }
            //
            //     }else{
            //
            //         for (let i = 0; i < assets.length; i += chunkSize) {
            //             let chunk = assets.slice(i, i + chunkSize);
            //             // do whatever
            //             // console.log(i,'i')
            //
            //             setTimeout(()=>{
            //                 // alert(JSON.stringify(chunk))
            //
            //                 chunk.map((it,index)=>{
            //                     console.log('varmivarmivarmi',it.resizedImage,i)
            //                     chunk.map((item,indis)=>{
            //
            //                         if(index != indis){
            //                             // console.log(i,indis*index,it.node.image.uri,item.node.image.uri)
            //                             // nodejs.channel.send(it,item,true)
            //                             console.log(it,item,true)
            //
            //                         }
            //                         if(indis==(assets.length%15)-1 && index==(assets.length%15)-1){
            //                             runInAction(()=>{
            //                                 setTimeout(()=>{
            //
            //                                     this.finished=true
            //                                     this.comparingStarted=false
            //
            //                                 },2000)
            //                             })
            //                         }
            //                         if(indis==14 && index==14){
            //                             runInAction(()=>{
            //
            //                                 this.photoOptimized=i
            //                                 // console.log('this.photoOptimizedthis.photoOptimizedthis.photoOptimized',this.photoOptimized,this.checkedImages.length)
            //
            //                             })
            //                             setTimeout(()=>{
            //
            //                                 AsyncStorage.setItem('lastChunk',JSON.stringify(i))
            //
            //                             },15000)
            //                         }
            //                     })
            //
            //                 })
            //                 if(i+50>this.checkedImages.length){
            //                     runInAction(()=>{
            //                         this.finished=true
            //                     })
            //                 }
            //             },150*i)
            //
            //
            //
            //         }
            //     }
            // })



        }

        // this.wholeImages.slice(0,100).map((it,index)=>{
        //
        //     this.wholeImages.slice(0,100).map((item,indis)=>{
        //
        //         if(index != indis){
        //             nodejs.channel.send(it,item)
        //
        //
        //         }
        //     })
        // })


    }



    async saveUserDataToSharedStorage(data) {
        try {

            const randomColor = Math.floor(Math.random()*16777215).toString(16);
            const randomColor2 = Math.floor(Math.random()*16777215).toString(16);
            const appGroupIdentifier = 'group.com.battery.ReactNativeWidget';
            const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
            const randomByte = () => randomNumber(0, 255)
            const randomPercent = () => (randomNumber(50, 100) * 0.01).toFixed(2)
            const randomCssRgba = () => `rgba(${[randomByte(), randomByte(), randomByte(), randomPercent()].join(',')})`
            // let myAppData = {
            //     c_name: "Regina Phalange",
            //     c_age: 24,
            //     c_email: "rphalange@gmail.com"
            // };
            // alert(randomCssRgba())
            let myAppData = {
                c_name: "#"+randomColor,
                c_age: 24,
                c_email: "#"+randomColor2

            };
            await SharedGroupPreferences.setItem("myAppData", myAppData, appGroupIdentifier)
            await reloadAllTimelines();

        } catch(errorCode) {
            console.log(errorCode)
        }
    }

    setCards(indis){
        //kaydirma ozelligi
        runInAction(()=>{
            this.fastClean=[]
        })
        setTimeout(()=>{

            runInAction(()=>{
                this.fastClean=this.wholeImages.slice(indis,this.wholeImages.length)

            })
        },2000)
    }

    setDeletePopup=(value)=>{
        runInAction(()=>{

                this.deletePopup=value

        })
    }

    setDeletePage=(page)=>{
        runInAction(()=>{
            this.deletePage=page

        })
    }

    setWillMerge(){

    }

    getContactDupList() {
        // alert('sss')
        this.duplicatedContactsName.find((it, index) => {
            setTimeout(()=>{
                this.contacts.find((item, indis) => {
                    if (it.givenName + ' ' + it.familyName == item.givenName + ' ' + item.familyName) {
                        runInAction(() => {
                            if (typeof this.duplicatedContactsName[index] != 'object') {
                                this.duplicatedContactsName[index].push(item)
                                console.log('bakız buraya', 'length', this.duplicatedContactsName[index].length, this.duplicatedContactsName[index])
                            } else {
                                this.duplicatedContactsName[index] = [it, item]
                            }
                        })
                    }
                    if (index == this.duplicatedContactsName.length - 1) {
                        AsyncStorage.setItem('duplicatedContactsName', JSON.stringify(this.duplicatedContactsName))
                    }
                })
            },index*100)


        })
    }

    setMergedList(it,whole){
        //bir tanesi disinda herseyi silme
        if(this.activeMergeList.length>0){
            this.activeMergeList.find((value,indis)=>{
                if(value)
                    if(value[0].givenName+' '+value[0].familyName == it.givenName+' '+it.familyName){
                        let varmi = value.indexOf(it)
                        if(varmi==-1){
                            runInAction(()=>{

                                this.activeMergeList[indis].push(it)
                            })

                        }else{
                            runInAction(()=>{
                                this.activeMergeList[indis].splice(varmi,1)
                                if(this.activeMergeList[indis].length<1){
                                    this.activeMergeList.splice(indis,1)
                                }
                            })

                        }

                    }else if(indis==this.activeMergeList.length-1){
                        runInAction(()=>{
                            this.activeMergeList.push([it])
                        })
                    }
            })
        }else{
            runInAction(()=>{
                this.activeMergeList.push([it])
            })
        }
        if(whole == undefined)
            this.countMerge()


    }

    countMerge(){
        runInAction(()=>{
            this.activeMergeListLength=0
            this.activeMergeLength=0
        })
        this.activeMergeList.find(value=>{
            if(value.length>1){
                console.log('birleştir',value)
            }
        })
        this.activeMergeList.find(it=>{
            if(it.length>1){
                it.find(item=>{
                    runInAction(()=>{
                        this.activeMergeLength+=1
                        // alert(this.activeMergeListLength)
                    })
                })

            }
            it.find(item=>{
                runInAction(()=>{
                    this.activeMergeListLength+=1
                    // alert(this.activeMergeListLength)
                })
            })

        })
    }


    setSelectedMerges(it){
        runInAction(()=>{
            // let arr = this.selected
            // console.log(arr,this.selected)
            //
            // if(arr.indexOf(it)){
            //     arr.splice(this.selected.indexOf(it), 1)
            // }else{
            //
            // }videoTotalSize
            // arr.push(it)
            if(this.selectedMerges.indexOf(it)!= -1){
                // alert('var')
                this.selectedMerges.splice(this.selectedMerges.indexOf(it),1)
            }else{
                this.selectedMerges.push(it)
            }
            console.log(this.selectedMerges)
        })
    }
    selectAllDupContacts(){
        runInAction(()=>{
            this.mergesLoading=true
        })
        setTimeout(()=>{
            if(this.mergesSelected){
                runInAction(()=>{
                    this.mergesLoading=false

                    this.mergesSelected=false
                    this.willMergeContacts=[]
                    this.willMergeNames=[]
                    this.activeMergeList=[]
                    this.activeMergeListLength=0
                    this.activeMergeLength=0
                    this.selectedMerges=[]
                })
            }else{
                runInAction(()=>{

                    this.mergesSelected=true

                    let dizi = this.mergeArr.map(it=>{
                        return it.recordID
                    })
                    runInAction(()=>{
                        this.selectedMerges=dizi

                    })

                    let adim = 0
                    // this.mergeArr.slice(0,100).find((it,indis)=>{
                    //     this.setMergedList(it)
                    //
                    //     // this.setSelectedMerges(it.recordID)
                    // })
                    let i = 0
                    while(i<this.mergeArr.length){
                        try{
                            this.mergeArr.slice(i,i+250).find((it,indis)=>{
                                this.setMergedList(it,true)

                                if(indis%249==0){
                                    this.countMerge()

                                }
                                if(i+250 >this.mergeArr.length && indis == (this.mergeArr.length%250)-1){
                                    this.mergesLoading=false
                                }
                                // console.log('i',i)
                                // this.setSelectedMerges(it.recordID)
                            })
                            i+=250
                        }catch (e) {

                        }

                    }


                    // const chunkSize = 100;
                    // for (let i = 0; i < 100; i += chunkSize) {
                    //     const chunk = this.mergeArr.slice(i, i + chunkSize);
                    //
                    //     setTimeout(()=>{
                    //         chunk.find((it,indis)=>{
                    //             this.setMergedList(it)
                    //
                    //         })
                    //     },i*10)
                    //
                    // }
                    // for(let i = 0;i<=this.mergeArr.length;i+=chunkSize){
                    //
                    //     setTimeout(()=>{
                    //         this.mergeArr.slice(i,i+chunkSize).find((it,indis)=>{
                    //             this.setMergedList(it)
                    //
                    //             // this.setSelectedMerges(it.recordID)
                    //         })
                    //     },adim*5000)
                    //     adim++
                    //
                    // }

                    // this.contacts.find((it,indis)=>{
                    //         this.setMergedList(it)
                    //         this.setSelectedMerges(it.recordID)
                    // })
                    // userStore.setMergedList(val)
                    // userStore.setSelectedMerges(val.recordID)
                })
            }
        },500)

    }

    setMergeArr(){
        //rehber ayni seyleri birlestirme

        AsyncStorage.getItem('mergeArr').then(data=>{
            if(data){
                runInAction(()=>{
                    this.mergeArr=JSON.parse(data)
                })
            }else{
                this.duplicatedContactsName.find((item,index)=>{
                    setTimeout(()=>{
                        this.contacts.find((it,indis)=>{
                            if(item.givenName+' '+item.familyName == it.givenName+' '+it.familyName){
                                runInAction(()=>{
                                    this.mergeArr.push(it)
                                    console.log(this.mergeArr.length)
                                })

                            }
                            if(index==this.duplicatedContactsName.length-1){
                                AsyncStorage.setItem('mergeArr',JSON.stringify(this.mergeArr))
                            }
                        })
                    },index*5)

                })

            }
        })


    }

    deleteDupName(it){
        runInAction(()=>{

            this.duplicatedContactsName.splice(this.duplicatedContactsName.indexOf(it),1)
            AsyncStorage.setItem('duplicatedContactsName',JSON.stringify(this.duplicatedContactsName))
        })
    }


    catchBlanks(it){
        this.checkedImages.find((item,index)=>{
            if(item)
                if(item.uri==it){
                    runInAction(()=>{
                        this.checkedImages.splice(index,1)
                    })
                }
            if(index==this.checkedImages.length-1){
                AsyncStorage.setItem('checkedImages',JSON.stringify(this.checkedImages))
            }
        })
        this.wholeImages.find((item,index)=>{
            if(item)
                if(item.node.image.uri==it){
                    runInAction(()=>{
                        this.wholeImages.splice(index,1)
                    })
                }
            if(index==this.wholeImages.length-1){
                AsyncStorage.setItem('wholeImages',JSON.stringify(this.wholeImages))
            }
        })

        this.fastClean.find((item,index)=>{
            if(item)
                if(item.node.image.uri==it){
                    runInAction(()=>{
                        this.fastClean.splice(index,1)
                    })
                }

        })

        this.allVideos.find((item,index)=>{
            if(item)
                if(item.node.image.uri==it){
                    runInAction(()=>{
                        this.allVideos.splice(index,1)
                    })
                }

        })
        this.ekrans.find((sims,indx)=>{
            if(sims){
                sims.images.find((imgs,inx)=>{
                    runInAction(()=>{
                        if(imgs==it){
                            sims.images.splice(inx,1)
                            if(sims.images.length<2){
                                this.ekrans.splice(indx,1)
                            }

                        }
                    })
                })
            }
            if(indx==this.ekrans.length-1){

                AsyncStorage.setItem('ekrans',JSON.stringify(this.ekrans))


            }else if(this.ekrans.length<1){
                AsyncStorage.setItem('ekrans',JSON.stringify(this.ekrans))

            }

        })

        this.same.find((sims,indx)=>{
            if(sims){
                sims.images.find((imgs,inx)=>{
                    runInAction(()=>{

                        if(imgs==it){
                            sims.images.splice(inx,1)
                            if(sims.images.length<2){
                                this.same.splice(indx,1)
                            }

                        }
                    })
                })
            }
            if(indx==this.same.length-1){

                AsyncStorage.setItem('same',JSON.stringify(this.same))



            }else if(this.same.length<1){
                AsyncStorage.setItem('same',JSON.stringify(this.same))

            }

        })
        this.similars.find((sims,indx)=>{
            if(sims){
                sims.images.find((imgs,inx)=>{
                    runInAction(()=>{

                        if(imgs==it){
                            sims.images.splice(inx,1)
                            if(sims.images.length<2){
                                this.similars.splice(indx,1)
                            }

                        }
                    })
                })
            }
            if(indx==this.similars.length-1){
                AsyncStorage.setItem('similars',JSON.stringify(this.similars))
                this.countAgain()



            }else if(this.similars.length<1){
                AsyncStorage.setItem('similars',JSON.stringify(this.similars))

            }
        })


    }
}


export default new userStore();
