//
//  SharedStorage.m
//  xCleaner
//
//  Created by Burak Aydın on 3.10.2022.
//

#import "SharedStorage.h"
#import "React/RCTLog.h"

@implementation SharedStorage

RCT_EXPORT_MODULE();

// We can send back a promise to our JavaScript environment :)
RCT_EXPORT_METHOD(set:(NSString *)data
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try{
    //CHANGE THE GROUP HERE
    NSUserDefaults *shared = [[NSUserDefaults alloc]initWithSuiteName:@"group.com.battery.ReactNativeWidget"];
    [shared setObject:data forKey:@"data"];
    [shared synchronize];
    resolve(@"true");
  }@catch(NSException *exception){
    reject(@"get_error",exception.reason, nil);
  }

}

@end
