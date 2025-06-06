import userStore from "../src/store/userStore";
import DeviceInfo from "react-native-device-info";
import {observer} from "mobx-react";


export default observer({
  //popup
  title1:'CleanerLab',
  description1:"Quickly scan Storage! Clear similar and duplicates photos and keep the best ones!",
  title2:'Contacts',
  description2:"Merge contacts saved twice on iPhone and get rid of the mess!",
  title3:"Welcome to CleanerLab",
  description3:"CleanerLab ",
  used:"{{total}}% is used.",
  popupInfo:"CleanerLab is here to free up storage space. We aim to offer transparency and protect privacy. By continuing, you agree to our Terms of Use and Privacy Policy.",
  termsOfUse:"Term of Use",

  //home
  alert:"Alert",
  needPermission:'You need to give gallery access permission.',
  homeTitle:`My Media Archive`,
  pro:"Pro",
  cleanableStorage:"Cleanable Area",
  permissionTitle:"Access permission is required for photos to be scanned.",
  permissionDesc:"In order to start cleaning with CleanerLab, you need to grant access to all photos.",
  allow:"Allow",
  file:"File",
  similar:"Similar",
  photo:"Photo",
  photos:"Photos",

  duplicated:"Duplicated",
  videos:"Videos",
  video:"Video",
  loading:"Loading, Please wait...",
  screenshots:"Screenshots",
  other:"Other",
  secretPlace:"Secret Place",
  contacts:"Contacts",
  charge:"Charge",
  clean:"Clean",
  noPhoto:"No Photos to Clean",
  noVideo:"No Video to Clean",
  noLimit:"You have reached the daily photo deletion limit in this area. You can clean photos and videos from other areas.",
  tooManyAds:"You've watched too many ads. Try again after a while to delete.",

  //media
  see:"Check",
  bestResult:"Best Result",
  best:"Best Result",
  review:"Review",
  letsStart:"Let's Start",
  similarPhotos:"Similar Photos",
  similarPhotosDesc:"Bringing together similar photos and we recommend " +
      "the best results. Safely review and " +
      "select the ones you want to move to the trash.",
  samePhotos:"Duplicated Photos",
  duplicatedContacts:"Duplicated Contacts",
  samePhotosDesc:"Here are the duplicate photos that are " +
      "exactly the same as each other. Delete all duplicates at once and " +
      "keep the originals.",
  screenshotDesc:"Similar screen for faster review " +
      "We group your photos! Send them safely and select the ones " +
      "you want to move to the trash.",
  others:"Others",
  otherDesc:"Here are the photos that do not belong to " +
      "any category. Sort these photos by size or date. " +
      "Say goodbye to the unnecessary.",
  videosDesc:"Check out all your videos. Sort your videos " +
      "by size or date. See the ones that take up the most space.",

  keepAll:"Keep All",
  selectAll:"Select All",
  deselectAll:"Deselect All",
  selectedAll:"Selected All",
  similarsTotal:"{{total}} Photos",
  similarSelected:"{{total}} Selected",
  newest:"Newest",
  oldest:"Oldest",
  most:"The Most",
  biggest:"Biggest",
  smallest:"Smallest",
  deleteSimilar:"Delete {{total}} Similar",
  deleteSame:"Delete {{total}}  Duplicate",
  deleteVideo:"Delete {{total}} Video",
  deleteEkrans:"Delete {{total}} Screenshot",
  deleteOther:"Delete {{total}} Photo",

  keptSuccessfuly:'The photos have been successfully stored.',
  sameLine:"{{total}} Duplicated",
  similarLine:"{{total}} Similar",
  ekranLine:"{{total}} Screenshot",

  //settings
  settings:"Settings",
  premiumTitleSettings:"Unlock Unlimited Access",
  premiumDescSettings:"Enjoy unlimited access to all CleanerLab features.",

  //premium

  //secret

  secret:'Secret Library',
  share:"Share",
  delete:"Delete",
  sure:"Files will be deleted from your hidden library.",
  cancel:"Cancel",
  import:"Import photo or video",
  noSecret:"No Hidden Files",
  noSecretDesc:"Tap add to add hidden photo or video.",
  addMedia:"Add Media",

  // settings
  keptList:"Stored List",
  clues:"Tips",
  usePin:"Use PIN",
  deleteAfter:"Remove After Import",
  tools:"Tools",
  faq:"FAQ",
  emailSupport:"Email Support",
  takeAgain:"Restore",
  aboutUs:"About us",
  privacy:"Privacy Policy",
  reviewApp:"Rate us",
  shareApp:"Share",
  moreInfo:"More info",
  changePin:"Change PIN",
  createPin:"Create PIN",
  fail:'Fail',
  notMatch:'The password you entered does not match.',

  //contacts
  permissionNeeded:'Permission Required',
  findDuplicates:'Allow CleanLab to find duplicates in its Contacts.',
  allContacts:"All Contacts",
  deleteContacts:"Delete {{total}} Contacts",
  duplicatedContact:"Duplicate Contacts",
  willMerge:"Contacts to Merge",
  merged:"Merged Version",
  mergeContacts:"Merge {{total}} Contacts",
  noNumber:"No number",
  noBack:'This deletion cannot be undone.\n Do you want to continue?',

  // components


  //charge

  chargeAnimation:"Charging Animation",
  setAnimation:"Set Animation",


  // fastClean
  fastClean:"Quick Clear",
  keep:"KEEP",
  cleanClue:"Swipe up to delete, down to keep.",
  inTrash:"Media in\n trash",
  emptyTrash:"Empty the Trash",
  deleteBig:"DELETE",


  // faq
  faqSections:[
    {
      title: 'Does CleanerLab guarantee that my photos will not be uploaded anywhere ?',
      content: 'CleanerLab does not require an internet connection to work so it doesn’t upload your photos anywhere and scans & analyzes your photos on your phone locally. The app also does not send reports about your photos, the only reports are anonymous technical logs such as app crashes and glitches. To scan and analyze your photo library, CleanerLab will need your permission to access your library and may use information of photos in order to consider if a photo is changed, edited or favorited and refer to face detection data.',
    },
    {
      title: 'How does CleanerLab choose the best photos ?',
      content: 'CleanerLab has its own detection and comparison techniques that involves face recognition, comparison of similar photos and considers the changed, edited or favorited photos in the process. Finally, CleanerLab marks a photo out of a set as the Best Result according to the results of its algorithm, however, you should always review the app’s suggestions to verify that they are in line with your choices.',
    },
    {
      title: 'Why don’t I have free space on my phone after the cleaning process?',
      content: 'CleanerLab’s cleaning process is in line with the cleaning process of the iOS Photos app: meaning all deleted photos/videos will be moved to the Recently Deleted album in your library for 30 days. So, they will still take up space on your phone, in order to free up this space, open the Photos app on your iPhone and go to the Recently Deleted album.'+
              'Choose all the photos/videos you want to delete from your phone and then tap on Delete.'+
              '**Don’t forget to keep in mind that deleting files from the Recently Deleted album will completely remove them from your phone.**',
    },
    {
      title: 'How do I recover deleted photos/videos?',
      content: 'In case you unintentionally deleted a photo/video, there’s no need to worry. CleanerLab’s cleaning process is in line with the cleaning process of the iOS Photos app: meaning all deleted photos/videos will be moved to the Recently Deleted album in your library for 30 days. So, you will still be able to recover deleted photos or videos for 30 days if you make a mistake. iOS’ Photos app automatically erases photos from your iPhone after 30 days.' +
          ' To recover a photo or a video that was deleted less than 30 days go, follow these steps:'+
              +'Open the Photos app on your phone and tap on the Recently Deleted album.'+
              +'Tap on Select at the upper-right corner.'+
              +'Choose, then tap on the files you want to undelete, then tap Recover.'+
              +'In case you need to recover everything in the Recently Deleted album, you can do so by tapping Select and then Recover All. Keep in mind that this album includes both manually deleted photos and the ones that are removed by CleanerLab.',
    },
    {
      title: 'How can I cancel my subscription ?',
      content: ' You can cancel your subscription to CleanerLab like any other App Store subscription:\n' +
          'Go to Settings on your iPhone.\n' +
          'Find View Apple ID in the iTunes & App Stores > your Apple ID name page.\n' +
          'Then, tap Subscriptions > CleanerLab.\n' +
          'All there is left to do is to click on the Cancel Subscription button right at the end of your screen.',
    },
    {
      title: 'How do I scan the photos in my Photos library?',
      content: 'The first time you start CleanerLab, the app will automatically start scanning and analyzing your library. Bear in mind that especially if you have a bigger collection of photos, this process will be extensive and will require a considerable amount of resources to be used. So, when you open CleanerLab for the first time, please be patient and wait till your scan and analysis results are in. This scan will only take long for your first use and CleanerLab will use the readily available scan results and only scan the most recent changes in your photo library, so it will be much faster and easier.',
    },
    {
      title: 'How do I use the swiping feature?',
      content: 'CleanerLab offers a practical, popular and fun way to go through the Videos and Other categories. To use the swiping feature, swipe down to mark a photo for removal, and up to add them to your Keep List.',
    },
    {
      title: 'Is CleanerLab safe? How can I trust CleanerLab?',
      content: 'CleanerLab’s selection algorithms are designed to make the cleaning process easier and faster for you, but it will not delete anything without your approval. The app suggests you photos to keep or delete, though you will always have the last decision.',
    },
    {
      title: 'How does CleanerLab categorize photos?',
      content: 'CleanerLab categorizes all your photos into 4 categories: Similar, Duplicates, Screenshots, Other',
    },
    {
      title: 'Similar',
      content: 'This category will include almost identical photos which are usually taken at the same time period and include the same objects/people on the same background even if the photos are taken from a different angle. CleanerLab will automatically separate a set of similar photos, mark one of them as the Best Result using its comparison and detection techniques and select the rest for you to delete.',
    },
    {
      title: 'Duplicated',
      content: 'This category will include the photos which are exactly the same as each other. You can delete all duplicates at once and keep the originals.',
    },
    {
      title: 'SecrenShoots',
      content: 'This category will include the screenshots in your library and the app will automatically mark all for removal but as always, leave the final decision for you. So, if you have screenshots that you want to keep, be sure to add them to your Keep List.',
    },
    {
      title: 'Others',
      content: "This is the category in which the photos that don't fit into the other categories will be sorted. CleanerLab groups them together to make it easier for you to review, swipe and clean your library",
    },
    {
      title: 'How can I remove unwanted photos?',
      content: 'CleanerLab will automatically suggest you some photos for removal and mark them with a red checkmark icon using its detection and comparison techniques. Select the photo/photos you want to delete and then tap on the Delete button. All selected photos will be deleted so don’t forget to move the ones you want to keep to your Keep List. \n' +
          'Open the Similar category. Choose a set you want to check and decide what you’d like to keep or remove. If you agree with what the app chose for removal and marked as Best Result, tap on the Move to Trash button on the screen under the set. If you don’t agree with what the app suggested, unmark all the photos you want to keep or add them to your Keep List and mark the ones you want to delete. Once you are done, you can just simply tap on the trash bin and then tap on Delete to complete the process.',
    },
    {
      title: 'Can I use CleanerLab on all my other devices?',
      content: 'You can only use CleanerLab on an iPhone using iOS 12 or higher for now. How many devices you can use with your subscription or license is in line with the subscription terms and conditions of the App Store.',
    },

  ],
  emailSection:[
    {
      title: 'How can I recover deleted photos or videos?',
      content: "No need to worry if you accidentally deleted a photo/video. CleanerLab's cleaning process is compatible with the iOS Photos app's cleaning process: that is, all deleted photos/videos will be moved to the Recently Deleted album in your library for 30 days. So even if you make a mistake, you can recover deleted photos or videos within 30 days. iOS' Photos app automatically deletes photos from your iPhone after 30 days.\n" +
          "\n" +
          " • To recover a photo or video deleted less than 30 days ago, follow these steps:\n" +
          " • Open the Photos app on your phone and tap the Recently Deleted album.\n" +
          " • Tap Select in the upper right corner.\n" +
          " • Select the files you want to recover and then tap Recover.\n" +
          "\n" +
          "To recover everything in the Recently Deleted album, first\n" +
          "\n" +
          "Select and then\n" +
          "Tap recover all.\n" +
          "Note that this album contains photos that were both manually deleted and removed by CleanerLab.\n",
    },
    {
      title: 'Why is there no free space on my phone after cleaning?',
      content: 'CleanerLab\'s is compatible with the cleaning process of the iOS Photos app: ie all deleted photos/videos in your library for 30 days:\n' +
          '\n' +
          'Recently Deleted\n' +
          '\n' +
          'Moved to album. iOS\' Photos app automatically deletes photos from your iPhone after 30 days.\n' +
          '\n' +
          'Follow these steps to free up storage space:\n' +
          '\n' +
          ' • Open the Photos app on your iPhone, scroll down and tap the Recently Deleted album.\n' +
          ' • Delete All\n' +
          '\n' +
          'Note that this album contains photos that were both manually deleted and removed by CleanerLab.',
    },
    {
      title: 'How can I cancel my subscription?',
      content: 'To cancel your subscription, you can follow these steps:\n' +
          'https://support.apple.com/en-us/HT202039',
    },
    {
      title: 'Why can\'t I allow CleanerLab to access my photos?',
      content: 'If you don\'t see Allow photo access option in settings, you can follow these steps:\n' +
          '\n' +
          '1. Launch the Settings app\n' +
          '2. Scroll down and press Screen Time\n' +
          '3. Select Content and Privacy Restrictions\n' +
          '4. Find and tap Photos\n' +
          '5. Make sure to check the Allow Changes option.\n' +
          '6. Then close CleanerLab completely and open it again.',
    },



  ],
  anotherTitle:'Another thing',
  anotherContent:'Device Code: \n'+"{{deviceId}}"+
      '\n' +
      '\nContact us with your device code. \n'+
      'support@cleanerlabapp.com',

  aboutUsPage:{title:'About us',content:'We develop mobile applications for the needs of users. We do our job with passion and we know that we are open to continuous learning.\n' +
        'We work to develop applications that our users need and enjoy using. We design and implement easy-to-use, understandable and transparent applications.\n' +
        '\n' +
        'With our team, we learn new things every day and improve ourselves. While doing this, it is very important for us that our working environment is pleasant and peaceful.\n' +
        '\n' +
        'You can reach us whenever you want about anything you want. We will be looking forward to feedback from you.\n' +
        '\n' +
        'support@cleanerlabapp.com'},
  privacyPage:{
    title:'Privacy Policy',
    content:"I. INTRODUCTION\n" +
        "Mobiledo Yazilim Hizmetleri Limited Sirketi (“we,” “us” or “our”) takes your privacy seriously. This Privacy policy (“Privacy policy”) explains our data protection policy and describes the types of information we may process when you install and/or use software application for mobile devices (the “App”, “our App”) and explains how we and some of the companies we cooperate while processing that information.\n" +
        "When we refer to personal data (or personal information), we mean any information of any kind relating to a natural person who can be identified, directly or indirectly, in particular by reference to such data.\n" +
        "It is a natural person who can be identified directly or indirectly, in particular by reference to an identification number or to one or more factors specific to his or her physical, physiological, mental, economic, cultural or social status.\n" +
        "Our Privacy policy applies to all users, and others who access the App (“Users”).\n" +
        "For the purposes of the GDPR, we are the data controller, unless otherwise stated.\n" +
        "PLEASE READ THE FOLLOWING PRIVACY POLICY, FOR INFORMATION REGARDING THE WAYS YOUR PERSONAL INFORMATION MAY BE PROCESSED, CAREFULLY. WHEN YOU USE THE APP YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS.\n" +
        "\n" +
        "II. INFORMATION WE PROCESS\n" +
        "There are two general categories of information we can process.\n" +
        "II.1 Information that you submit\n" +
        "We process the following personal information about you when you use the App. This information is necessary for the adequate performance of the contract between you and us. Without such information, it is impossible to provide complete functionality of the App and perform the requested services.\n" +
        "Other Information directly related to your use of the App, such as photos and documents you upload to the App. Upon your consent, we also may have access to your camera roll.\n" +
        "II.2 Information That Is Processed Automatically\n" +
        "When you use the App, some information about your device and your user behavior may be processed automatically. This information is generally non-personal, i.e. it does not, on its own, permit direct association with any specific individual, and we may access it only in aggregated form. We process this information on the ground of our legitimate interest in improving our App and giving our users the best experience. If we do not access such data, we may not be able to provide you with all the requested services and features of the App.\n" +
        "We use third-party automatic data processing technologies to analyze certain information sent by your device or our App. Automatic data processing technologies (advertising or analytics tools) provide us with the data described below. We do not control, supervise or respond for how the third parties process your personal data, that might be collected by their own means (not through our App). Due to the fact that some of our third parties declare themselves controllers for the purposes of the GDPR, any information request regarding your personal data should be directed to such third parties.\n" +
        "Log file information. Log file information is automatically reported each time you make a request to access the App. It can also be provided when the App is installed on your device. When you use our App, analytics tools automatically record certain log file information, including time and date when you start and stop using the App, and how you interact with the App. The App may use automated processing of your personal data, including profiling, which means any form of automated processing of personal data used to evaluate certain personal aspects relating to you, in particular to analyze or predict aspects concerning your personal preferences, interests, behavior, location or movements. Processing information through automatic data processing technologies starts automatically when you start using the App.\n" +
        "Cookies and similar technologies. When you use the App, we may use cookies and similar technologies like pixels, web beacons, scripts to process information about how you use our App and provide features to you. A cookie is a text file containing small amounts of information, which is downloaded to your device when you access the App. The text file is then sent back to our server each time you use the App. This enables us to operate the App more effectively. We use this aggregated information to understand and optimize how our App is used, improve our marketing efforts, and provide content and features that are of interest to you. We may ask advertisers or other partners to serve ads or services to the App, which may use cookies or similar technologies.\n" +
        "\n" +
        "III. THE PURPOSES OF PROCESSING YOUR PERSONAL DATA\n" +
        "Our mission is to constantly improve our App and provide you with new experiences. As part of this mission, we use your information for the following purposes:\n" +
        "(a) To make our service available. We use information that you submit and information that is processed automatically to provide you with all requested services.\n" +
        "(b) To improve, test and monitor the effectiveness of our App. We use information that is processed automatically to better understand user behavior and trends, detect potential outages and technical issues, to operate, protect, improve, and optimize our App.\n" +
        "(c) To provide you with interest-based (behavioral) advertising or other targeted content. We may use information that is processed automatically for marketing purposes (to show ads that may be of interest to you based on your preferences). We provide personalized content and information to you, which can include online ads or other forms of marketing.\n" +
        "(d) To communicate with you. We use the information we have to communicate with you through newsletters, i.e. to send you marketing notifications, receive your feedback about our App experience, and let you know about our policies and terms. We also use your information to respond to you when you contact us.\n" +
        "(e) To prevent fraud and spam, to enforce the law. We really want our App to be free of spam and fraudulent content so that you feel safe and free. We may use your information to prevent, detect, and investigate fraud, security breaches, potentially prohibited or illegal activities, protect our trademarks and enforce our Terms of Use.\n" +
        "If any new purposes for processing your personal data arise, we will let you know we start to process information on that other purpose by introducing the corresponding changes to this Privacy policy.\n" +
        "\n" +
        "IV. SHARING OF YOUR INFORMATION\n" +
        "We will not rent or sell your personal data to any third parties, but we may share your information from tools like cookies, log files, and device identifiers and location data, with third-party organizations that provide automatic data processing technologies for the App. We do not control or influence these third parties’ tracking technologies or how they may be used.\n" +
        "We may also share certain information such as cookie data with third-party advertising partners. This information allows third-party ad networks, inter alia, to deliver targeted advertisements that they believe will be of most interest to you.\n" +
        "We may engage the following third parties in order to provide us with necessary infrastructure for delivery and improvement of our services.\n" +
        "Our App may contain links to third-party websites / services or you may access the App from a third-party site. We are not responsible for the privacy practices of these third-party sites or services linked to or from our App, including the information or content contained within them.\n" +
        "We may disclose your personal information if it is needed for objective reasons, due to the public interest or in other unforeseen circumstances:\n" +
        "as required by law;\n" +
        "when we believe, in good faith, that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request;\n" +
        "if we are involved in a merger, acquisition, or sale of all or a portion of our assets, you will be notified via email and/or a prominent notice in our App of any change in ownership or your personal information usage, as well as any choices you may have regarding your personal information.\n" +
        "\n" +
        "V. INTERNATIONAL DATA TRANSFERS\n" +
        "We work in the cross-border area and provide our App to our Users around the world.\n" +
        "We and third-party organizations that provide automatic data processing technologies for the App or our third-party advertising partners may transfer the automatically processed information across borders and from your country or jurisdiction to other countries or jurisdictions around the world.\n" +
        "If you are located in the European Union or other regions with laws governing data processing that may differ from U.S. law, please note that we may transfer information, including personal information, to a country and jurisdiction that does not have the same data protection laws as in your jurisdiction.\n" +
        "This means that your personal information can be transferred to a third country, a territory or one or more specified sectors within that third country, or to the international organization where data protection and confidentiality regulations may not provide the same level of protection of personal data as your country does.\n" +
        "We try to make sure that the recipient of any personal data provides a proper protection of the personal data received, in accordance with the current legislation on the protection of such information. By using the App, you agree that we may transfer your personal data to any third country, a territory or one or more specified sectors within that third country, or to the international organization.\n" +
        "\n" +
        "VI. HOW LONG WE USE YOUR PERSONAL DATA\n" +
        "We generally retain your personal information for as long as is necessary for performing the functional service of the App and to comply with our legal obligations. If you no longer want us to use your information that we physically access and store, you can request that we erase your personal information and close your account.\n" +
        "However, some data may still be stored for a certain time period (but no longer than the storage purpose requires) if information is necessary to comply with legal obligation (taxation, accounting, audit) or in order to maintain safety and data backup settings, prevent fraud or other malicious acts.\n" +
        "\n" +
        "VII. EXERCISING YOUR RIGHTS\n" +
        "For the personal data we store and access, you are entitled to address us regarding the following issues:\n" +
        "Data Access and Portability. You can request copies of your personal information held by us.\n" +
        "Change or Correct Data. Where you cannot update data by yourself through your account, you have the right to ask us to correct change, update or rectify your data.\n" +
        "Data Retention and Deletion. We generally retain data for as long as your account is in existence or as it is needed to provide services of the App. However, specific retention times can vary based on the context of the processing we perform and on our legal obligations. You have the right to ask us to delete all or some of the personal data we hold about you. If you have an account, you can also delete your account at any time. We may need to retain some of your personal data even after you have closed your account if reasonably necessary to comply with our legal obligations, or where we have a legitimate interest in doing so (e.g. to prevent fraud and abuse and maintain and enhance security).\n" +
        "Restriction of Processing. Under certain circumstances, you may have the right to limit the ways in which we use your personal information.\n" +
        "Please bear in mind that we ensure the above-mentioned rights only with respect to the information that you submit.\n" +
        "When your personal information that is processed automatically you may object to such processing in some circumstances. Where your personal information is processed for direct marketing purposes, you may ask to cease processing your data for these direct marketing purposes. In order to exercise your right please contact the third party services listed in Section IV of this Privacy Policy to learn how you can object to processing your data. Most of them have clear instructions on their privacy pages, functional API or other options.\n" +
        "Please note that you can opt-out of marketing tracking by choosing:\n" +
        "option \"Limit Ad Tracking\" on your iOS device in Settings/ Privacy/ Advertising, please find additional information here: https://support.apple.com/en-us/HT202074;\n" +
        "Please mind when you opt out of certain interest-based advertising, you may continue to receive contextual ads based on other non-personal information, such as ads related to the content of other digital products you are using.\n" +
        "\n" +
        "VIII. SECURITY\n" +
        "The security of your personal information is highly important to us. We follow generally accepted industry standards to protect the personal information submitted to us, both during transmission and once we receive it.\n" +
        "We take reasonable and appropriate measures to protect personal information from loss, misuse and unauthorized access, disclosure, alteration and destruction, taking into account the risks involved in the processing and the nature of the personal information.\n" +
        "We implement appropriate technical and organizational measures, which are designed to implement data-protection principles, such as data minimization, in an effective manner and to integrate the necessary safeguards into the processing. We seek your personal data to be encrypted with proper and strong encryption algorithms, including hashing where possible.\n" +
        "Unfortunately, no method of transmission over the Internet, or method of electronic storage, is 100% secure. We do our best to protect your personal data; nevertheless, we cannot guarantee its absolute security. In the event that your personal information is compromised as a breach of security, we will promptly notify you in compliance with applicable law.\n" +
        "If you have any questions about the security of our App, you can contact us at through email or contact form displayed below.  support@cleanerlabapp.com\n" +
        "\n" +
        "IX. CHILDREN’S PRIVACY\n" +
        "Our App is not intended for children under the age of 18. Therefore, we do not knowingly collect or solicit any personal information from children under 18. No one under age 18 may provide any personal information to the App. If you are under 18, do not use or provide any information on this App or through any of its features. Do not provide any information about yourself, including your email address. If we learn that we have collected personal information from a child under age 18 without verification of parental consent, we will erase that information as quickly as possible. If you believe that we might have any information from or about a child under 18, please contact us.\n" +
        "\n" +
        "X. CHANGES TO THE PRIVACY POLICY\n" +
        "This Privacy policy will be regularly updated.\n" +
        "Whenever we change this Privacy policy, we will post those changes to this Privacy policy and other places that we consider appropriate. Additional forms of notice of modifications or updates as appropriate under the circumstances may be provided to you.\n"},

  deleteSelected:"Delete Selected",

  months:[
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],

  //premiums
  howWorksFreeTrial:'How Your Free Trial Works',
  accessUnlimited:'Unlock Unlimited Access',
  getToday:"Today: Get Unlimited Access",
  getTodayDesc:'Clean your photos an unlimited number of times with CleanerLab Pro.',
  remindTomorrow:'2nd Day: Trial Reminder',
  remindTomorrowDesc:'Get reminders about when your Free Trial will expire.',
  trialEnd:'3rd Day: Trial Ends',
  trialEndDesc:"Your subscription will start on {{date}}.",
  autoRenew:"auto renewable",
  startTrial:"START FREE TRIAL",


      //paris
  equalCoffee:"{{price}} with a cup of coffee" +
      "you can buy -  or you can upgrade " +
      "your phone for a month.",
  unlimitedDelete:"Unlimited delete and merge", //Unlimited deletions and compressions
  orGoWithPremium:"or continue with limited access", //or continue with limited access
  trialEnabled:"START FREE TRIAL",
  notSureYet:"Not sure yet?",
  enableTrial:"Use Trial",
  getFullAccess:"GET UNLIMITED ACCESS",
  try3Days:"3 DAYS FREE TRIAL",
  week:"week",
  month:"month",
  year:"year",
  autoRenewable:"It renews automatically. Cancel anytime \n " +
      "{{price}}/{{period}}",
  autoRenewableShort:"{{price}}/{{period}},",
  autoRenewableUltraShort:"{{price}}/{{period}}",

  //berlin
  today:"Today",
  getUnlimited:"Get Unlimited Access", // Get Unlimited Access
  deleteUnlimited:"Clean your photos an unlimited number of times with CleanerLab.", // Clean your photos an unlimited number of times with CleanerLab.
  trialReminder:"Trial Reminder",   // Trial Reminder
  getReminder:"Get reminders about when your Free Trial will expire.",  // Get reminders about when your Free Trial will expire.
  trialEnds:"Trial Version Ending.",
  daysFree:"3-DAYS FREE TRIAL",  // 3-DAYS FREE TRIAL
  subsWillStart:"Your subscription {{day}} {{month}} will start on.",
  startMembership:"Start Membership", //Start Membership
  subsRequirements:"Subscription Terms",
  reBuy:"Restore Purchase",
  secondDay:"Day 2",
  thirdDay:"Day 3",



  //tokyo
  percent:"50%",
  earn:"Earn", // Maks 6 Karakter
  scanSimilars:"Instantly Detect Similar Photos",
  noAdNoLimit:"Ad-Free and Unlimited",
  takeTime:"Save Storage and Time",
  freeDays:"DAY FREE TRIAL",
  popular:"POPULAR",
  save60:"60% Earn",
  save80:"80% Earn",

  // london
  londonComments:[
    {
      text: "This amazing app speeded up my phone 🔋",
    },
    {
      text: "I'm glad I downloaded the app, space is open immediately 🥰",
    },
    {
      text: "My phone doesn't piss me off anymore 🥳",
    },

  ],
  autoRenewCancel:"auto-renews, cancel anytime", // auto renew, cancel anytime
  yourePremium:"Premium membership defined to your account 🎉",
  congrats:"Congratulations!",




  //Components
  success:"Success!",
  deletedObjects:"Deleted Items",
  totalGained:"Total Gained Space",
  dontForget:"Don't forget to delete photos from Recently Deleted section!",
  continue:"Continue",
  preparing:"Preparing",
  pleaseWait:"Please wait",
  changePassword:"Change Password",
  newPassword:"New Password",
  setPassword:"Set Password",
  oldPassword:"Old Password",
  save:"Save",
  passwordChanged:"Password Changed Successfully",
  enterPassword:"Enter Password",
  yousetpassword:"You've set password before.",
  enter:"Enter",


  saveTime:"Save time by getting rid of ads.",
  deleteUnecessary:"Delete unnecessary videos",
  deleteVideoDesc:"Clean up unnecessary videos that take up space.",
  deleteExcess:"Clean your phone of excess media.",
  cleanDuplicate:"Clean duplicate photos",
  fastFind:"Fast find similar photos",
  cleanStorage:"Free up storage",
  cancelAnyTimeLong:"*Cancel anytime during 3-day free trial. Will automatically extend to a subscription for {{price}}/{{period}}.",
  cancelAnyTimeShort:"Will automatically extend to a subscription for {{price}}/{{period}}.",
  weekly:"Weekly",
  monthly:"Monthly",
  yearly:"Yearly",
  pricePaid:"{{period}}/{{price}}",
  priceTrial:"{{period}}/{{price}}, After 3 Days Free Trial",


  ankaracomments:[
    {
      text: "Clean up your device with one tap",
    },
    {
      text: "Remove duplicate photos/videos",
    },
    {
      text: "Merge duplicate contacts",
    },

  ],
  noKept:"Gallery is empty.",
  addKept:"Add some photos & videos.",
  analyzing:"Analyzing..."
});
